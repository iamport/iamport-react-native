import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '../Loading';
import ErrorOnParams from '../ErrorOnParams';

import { IMPData, Validation } from '../../utils/Validation';
import { IMPConst } from '../../constants';

import viewStyles from '../../styles';
import IamportUrl from '../../utils/IamportUrl';

type Props = {
  userCode: string;
  tierCode?: string;
  data: IMPData.CertificationData;
  loading?: any;
  callback: (response: any) => any;
};

function Certification({ userCode, tierCode, data, loading, callback }: Props) {
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const webview = createRef<WebView>();
  const validation = new Validation(userCode, loading);

  if (validation.getIsValid()) {
    const { loadingContainer, webViewContainer } = viewStyles;
    return (
      <>
        <WebView
          containerStyle={webViewContainer}
          ref={webview}
          source={{ html: IMPConst.WEBVIEW_SOURCE_HTML }}
          onLoadEnd={() => {
            if (!isWebViewLoaded) {
              // html이 load되고 최초 한번만 inject javascript
              if (tierCode) {
                webview.current?.injectJavaScript(`
          setTimeout(function() {
            IMP.certification(${JSON.stringify(data)}, function(response) {
              window.ReactNativeWebView.postMessage(JSON.stringify(response));
            });
          });
        `);
                setIsWebViewLoaded(true);
              }
            }}
            onMessage={(e) => {
              const { data } = e.nativeEvent;
              let response = data;
              while (decodeURIComponent(response) !== response) {
                response = decodeURIComponent(response);
              }
              response = JSON.parse(response);

              if (typeof callback === 'function') {
                callback(response);
              }
            }}
            startInLoadingState
            renderLoading={() => (
              <View style={loadingContainer}>{loading || <Loading />}</View>
            )}
            originWhitelist={['*']} // https://github.com/facebook/react-native/issues/19986
            onShouldStartLoadWithRequest={(request) => {
              const { url } = request;
              // console.log('url: ' + url);
              const iamportUrl = new IamportUrl(url);
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
              if (iamportUrl.isPaymentOver()) {
                callback(iamportUrl.getQuery());
                return false;
              }

              return true;
            }}
          />
        </View>
      </View>
    );
  }

  return <ErrorOnParams message={validation.getMessage()} />;
}

export default Certification;
