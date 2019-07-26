
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import ErrorOnParams from '../ErrorOnParams';
import {
  validateProps,
  isUrlStartsWithAppScheme,
  isCallbackSupported,
} from '../../utils';
import { 
  PG,
  PAY_METHOD, 
  CURRENCY, 
  MARKET_URL,
  DEFAULT_M_REDIRECT_URL,
} from '../../constants';

const DEFAULT_SOURCE = require('../../html/payment.html');
const HTML5_INICIS_TRANS = 'HTML5_INICIS_TRANS';
const NICE_TRANS_URL = 'https://web.nicepay.co.kr/smart/bank/payTrans.jsp';

export function Payment({ userCode, data, loading, callback }) {
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const [source, setSource] = useState(DEFAULT_SOURCE);

  useEffect(() => {
    function handleOpenURL(event) {
      const { pg, pay_method } = data;
      const { url } = event;
      const decodedUrl = decodeURIComponent(url);
      const extractedQuery = queryString.extract(decodedUrl);
      if (pg === 'html5_inicis' && pay_method === 'trans' && typeof callback === 'function') {
        // 웹 표준 이니시스 & 실시간 계좌이체 대비
        const { m_redirect_url, imp_uid, merchant_uid } = queryString.parse(extractedQuery);
        if (m_redirect_url.includes(HTML5_INICIS_TRANS)) {
          const query = {
            imp_uid,
            merchant_uid: typeof merchant_uid === 'object' ? merchant_uid[0] : merchant_uid,
          };
          callback(query);
        }
      }

      if (pg === 'nice' && pay_method === 'trans') {
        // 나이스 & 실시간 계좌이체 대비
        const uri = `${NICE_TRANS_URL}?${extractedQuery}`;
        setSource({ uri });
      }
    }
    Linking.addEventListener('url', handleOpenURL);
    
    return function cleanup() {
      Linking.removeEventListener('url', handleOpenURL);
    }
  });

  function onLoad () {
    if (!isWebViewLoaded) { // 포스트 메시지를 한번만 보내도록(무한루프 방지)
      const { pg, pay_method } = data;
      /* [v1.1.2] 콜백에 merchant_uid 전달을 위해 m_redirect_url을 dummy url로 지정 */
      /* 웹 표준 이니시스 & 실시간 계좌이체 대비 */
      data.m_redirect_url =
        pg === 'html5_inicis' && pay_method === 'trans' ? HTML5_INICIS_TRANS : DEFAULT_M_REDIRECT_URL;

      const params = JSON.stringify({ 
        userCode, 
        data, 
        loading: getCustomLoading(),
      });
      this.xdm.postMessage(params);

      setIsWebViewLoaded(true);
    }
  };

  function getCustomLoading() {
    if (typeof loading === 'undefined') {
      return {
        message: '잠시만 기다려주세요...',
        image: '../img/iamport-logo.png',
      };
    }
    
    return {
      message: getCustomLoadingMessage(),
      image: getCustomLoadingImage(),
    };
  }

  function getCustomLoadingMessage() {
    const { message } = loading;
    if (typeof message === 'string') {
      return message;
    }
    return '잠시만 기다려주세요...';
  }

  function getCustomLoadingImage() {
    const { image } = loading;

    if (typeof image === 'number') {
      return resolveAssetSource(image).uri;
    }

    if (typeof image === 'string') {
      return image;
    }

    return '../img/iamport-logo.png';
  }

  function onError() {
    // 앱 설치후, 다시 원래 화면으로 복귀
    // 웹뷰 로드가 실패한 경우이므로, post 메시지로 처리 불가
    this.xdm.injectJavaScript(`
      window.stop(); 
      window.history.back();
    `);
  };

  function onMessage(e) { // PG사가 callback을 지원하는 경우, 결제결과를 받아 callback을 실행한다 
    const { data } = e.nativeEvent;
    let response = data;
    while(decodeURIComponent(response) !== response) {
      response = decodeURIComponent(response);
    }
    response = JSON.parse(response);

    if (typeof callback === 'function') {
      callback(response);
    }
  };

  function getInjectedJavascript() { // 웹뷰 onMessage override 방지 코드
    const patchPostMessageFunction = function() {
      var originalPostMessage = window.ReactNativeWebView.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) { 
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function() { 
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
      };

      window.ReactNativeWebView.postMessage = patchedPostMessage;
    };

    return `(${String(patchPostMessageFunction)})();`;
  }

  function onShouldStartLoadWithRequest(request) {
    const { url } = request;
    if (isUrlStartsWithAppScheme(url)) {
      const splittedUrl = url.split('://');
      const scheme = splittedUrl[0];
      const marketUrl = scheme === 'itmss' ? `https://${splittedUrl[1]}` :  url;
      // 앱 오픈
      Linking.openURL(marketUrl).catch(() => {
        // 앱 미설치 경우, 마켓 URL로 연결
        Linking.openURL(MARKET_URL[scheme]);
        // 앱 설치후, 다시 원래 화면으로 복귀
        // 웹뷰 로드가 실패한 경우이므로, post 메시지로 처리 불가
        this.xdm.injectJavaScript(`
          window.stop(); 
          window.history.back();
        `);
      });
      setIsWebViewLoaded(false);
      return false;
    }

    return true;
  }

  function onNavigationStateChange(e) {
    const { url } = e;
    const { pg, pay_method } = data;
    if (isPaymentOver(url) && !isCallbackSupported(pg, pay_method)) { // 결제 종료 후, 콜백 실행
      const { query } = queryString.parseUrl(url);
      if (typeof callback === 'function') {
        callback(query);
      }
      setIsWebViewLoaded(false);
    }
  }

  function isPaymentOver(url) {
    /* 결제 완료 */
    if (url.includes(DEFAULT_M_REDIRECT_URL)) return true;

    /* 웹 표준 이니시스 & 실시간 계좌이체 결제 중단 */
    const { pg, pay_method } = data;
    if (
      pg === 'html5_inicis' &&
      pay_method === 'trans' &&
      url.includes(HTML5_INICIS_TRANS.toLocaleLowerCase())
    ) {
      return true;
    }

    return false;
  }
  
  const { validate, message } = validateProps(userCode, data);
  if (validate) {
    return (
      <WebView
        ref={(xdm) => this.xdm = xdm}
        useWebKit
        javaScriptEnabled
        source={source}
        onLoad={onLoad}
        onError={onError}
        onMessage={onMessage}
        originWhitelist={['*']} // https://github.com/facebook/react-native/issues/19986
        injectedJavaScript={getInjectedJavascript()} // https://github.com/facebook/react-native/issues/10865
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={onNavigationStateChange}
      />
    );
  }

  return <ErrorOnParams message={message} />;
}

Payment.propTypes = {
  userCode: PropTypes.string.isRequired,
  data: PropTypes.shape({
    pg: PropTypes.oneOf(PG),
    pay_method: PropTypes.oneOf(PAY_METHOD),
    currency: PropTypes.oneOf(CURRENCY),
    notice_url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    display: PropTypes.shape({
      card_quota: PropTypes.arrayOf(PropTypes.number),
    }),
    merchant_uid: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    buyer_tel: PropTypes.string.isRequired,
    app_scheme: PropTypes.string.isRequired,
    escrow: PropTypes.bool,
    name: PropTypes.string,
    tax_free: PropTypes.number,
    buyer_name: PropTypes.string,
    buyer_email: PropTypes.string,
    buyer_addr: PropTypes.string,
    buyer_postcode: PropTypes.string,
    custom_data: PropTypes.object,
    vbank_due: PropTypes.string,
    popup: PropTypes.bool,
  }).isRequired,
  callback: PropTypes.func.isRequired,
  loading: PropTypes.shape({
    message: PropTypes.string,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

export default Payment;
