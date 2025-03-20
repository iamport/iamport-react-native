import React, { createRef, useEffect, useRef, useState } from 'react';
import type { IMPData } from 'iamport-react-native';
import ValidationForPayment from '../../utils/ValidationForPayment';
import ErrorOnParams from '../ErrorOnParams';
import { Linking, Platform, View } from 'react-native';
import { IMPConst } from '../../constants';
import IamportUrl from '../../utils/IamportUrl';
import WebView from 'react-native-webview';
import viewStyles from '../../styles';
import Loading from '../Loading';
import type { WebViewSource } from 'react-native-webview/lib/WebViewTypes';

type Props = {
  userCode: string;
  tierCode?: string;
  data: IMPData.PaymentData;
  loading?: any;
  callback: (response: any) => any;
};

function Payment({ userCode, tierCode, data, loading, callback }: Props) {
  const [webviewSource, setWebviewSource] = useState<WebViewSource>({
    html: IMPConst.WEBVIEW_SOURCE_HTML,
  });
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const webview = createRef<WebView>();
  const smilepayRef = useRef(false);
  let redirectUrl = IMPConst.M_REDIRECT_URL;
  if (data.m_redirect_url !== undefined && data.m_redirect_url.trim() !== '') {
    redirectUrl = data.m_redirect_url;
  } else {
    data.m_redirect_url = redirectUrl;
  }

  useEffect(() => {
    const { pg } = data;
    if (
      pg.startsWith('smilepay') &&
      Platform.OS === 'ios' &&
      !smilepayRef.current
    ) {
      /**
       * [feature/smilepay] IOS - 스마일페이 대비 코드 작성
       * 스마일페이 결제창을 iframe 방식으로 띄우기 때문에 WKWebView에서 서드 파티 쿠키가 허용되지 않아
       * WKWebView의 baseUrl을 강제로 스마일페이 URL로 적용
       */
      setWebviewSource({
        ...webviewSource,
        baseUrl: IMPConst.SMILEPAY_BASE_URL,
      });
      smilepayRef.current = true;
    }
  }, [data, webviewSource]);

  useEffect(() => {
    const handleOpenURL = (event: { url: string }) => {
      const { pg, pay_method } = data;
      if (pay_method === 'trans') {
        const iamportUrl = new IamportUrl(event.url);

        /* 나이스 - 실시간 계좌이체 대비 */
        if (pg.startsWith('nice')) {
          const queryParameters = iamportUrl.getQuery();
          const scheme = iamportUrl.scheme;
          let niceTransRedirectionUrl;
          if (data.app_scheme?.split('://')[0].toLowerCase() === scheme) {
            if (queryParameters.callbackparam1 != null) {
              niceTransRedirectionUrl = queryParameters.callbackparam1;
            }
          }
          webview.current?.injectJavaScript(`
            window.location.href = "${niceTransRedirectionUrl}?${iamportUrl.getStringifiedQuery()}";
          `);
        }
      }
    };
    const subscription = Linking.addEventListener('url', handleOpenURL);
    return function cleanup() {
      subscription.remove();
    };
  }, [data, redirectUrl, webview]);

  const removeLoadingNeeded = () => {
    if (showLoading && Platform.OS === 'android') {
      // 로딩상태. 안드로이드 플랫폼
      if (isWebViewLoaded) {
        // 웹뷰 로드 끝. 리디렉션 방식
        return true;
      }
      return isIframeWayPayment();
    }
    // IOS
    return false;
  };

  const isIframeWayPayment = () => {
    const { pg, pay_method, customer_uid } = data;
    if (pg.startsWith('html5_inicis') && customer_uid) {
      // 이니시스 빌링결제
      return true;
    }
    if (pg.startsWith('mobilians') && pay_method === 'phone') {
      // 모빌리언스 휴대폰 소액결제
      return true;
    }
    return (
      pg.startsWith('danal') ||
      pg.startsWith('danal_tpay') ||
      pg.startsWith('smilepay') ||
      pg.startsWith('payco') ||
      pg.startsWith('bluewalnut') ||
      pg.startsWith('settle_acc')
    );
  };

  const validation = new ValidationForPayment(
    userCode,
    loading,
    callback,
    data
  );
  if (validation.getIsValid()) {
    const { loadingContainer, webViewContainer } = viewStyles;
    return (
      <>
        <WebView
          containerStyle={webViewContainer}
          ref={webview}
          source={webviewSource}
          mixedContentMode={'always'}
          onLoadEnd={() => {
            if (!isWebViewLoaded) {
              if (data.pg.startsWith('eximbay')) {
                data.popup = false;
              }

              if (tierCode) {
                webview.current?.injectJavaScript(`
                    setTimeout(function() { IMP.agency("${userCode}", "${tierCode}"); });
                  `);
              } else {
                webview.current?.injectJavaScript(`
                    setTimeout(function() { IMP.init("${userCode}"); });
                  `);
              }
              webview.current?.injectJavaScript(`
                  setTimeout(function() {
                    IMP.request_pay(${JSON.stringify(
                      data
                    )}, function(response) {
                      window.ReactNativeWebView.postMessage(JSON.stringify(response));
                    });
                  });
                `);
              setIsWebViewLoaded(true);
            }

            // only for Android
            if (removeLoadingNeeded()) {
              setShowLoading(false);
            }
          }}
          /* PG사가 callback을 지원하는 경우, 결제결과를 받아 callback을 실행한다 */
          onMessage={(e) => {
            /**
             * [v1.6.0] 다날의 경우 response에 주문명(name)이 포함되어 있는데
             * 주문명에 %가 들어갈 경우, decodeURIComponent시 URI malformed 에러가 발생하는 것 대비해
             * 우선 encodeURIComponent를 한 후, decodeURIComponent가 끝나면
             * 최종적으로 decodeURIComponent를 한 번 더 한다
             */
            const encoded = encodeURIComponent(e.nativeEvent.data);
            const decoded = decodeURIComponent(encoded);
            const response = JSON.parse(decoded);
            if (typeof callback === 'function') {
              callback(response);
            }
          }}
          originWhitelist={['*']} // https://github.com/facebook/react-native/issues/19986
          sharedCookiesEnabled={true}
          onShouldStartLoadWithRequest={(request) => {
            const { url } = request;
            // console.log(`url: ${url}`);
            const iamportUrl = new IamportUrl(url);

            if (iamportUrl.isPaymentOver(redirectUrl, data)) {
              if (typeof callback === 'function') {
                if (
                  data.pg.startsWith('html5_inicis') &&
                  data.pay_method === 'trans' &&
                  Platform.OS === 'ios'
                ) {
                  callback(iamportUrl.getInicisTransQuery(redirectUrl));
                } else {
                  callback(iamportUrl.getQuery());
                }
              }
              return false;
            }

            if (iamportUrl.isAppUrl()) {
              /* 3rd-party 앱 오픈 */
              iamportUrl.launchApp().catch((e) => {
                const { code, message } = e;
                callback({
                  imp_success: false,
                  error_code: code,
                  error_msg: message,
                });
              });

              return false;
            }
            if (isWebViewLoaded && showLoading && iamportUrl.isIframeLoaded()) {
              /**
               * only for IOS
               * iframe이 load되면(url이 about:blank 또는 https://service.iamport.kr이 아니면)
               * webview의 loading 상태를 해제한다
               */
              setShowLoading(false);
            }
            return true;
          }}
        />
        {showLoading && (
          <View style={loadingContainer}>{loading || <Loading />}</View>
        )}
      </>
    );
  }

  return <ErrorOnParams message={validation.getMessage()} />;
}

export default Payment;
