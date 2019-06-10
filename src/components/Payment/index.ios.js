
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import ErrorOnParams from '../ErrorOnParams';
import {
  validateProps,
  isUrlMatchingWithIamportUrl,
  isUrlStartsWithAppScheme,
} from '../../utils';
import { 
  PG,
  PAY_METHOD, 
  CURRENCY, 
  MARKET_URL,
  CALLBACK_AVAILABLE_PG,
} from '../../constants';

const source = require('../../html/payment.html');
export function Payment({ userCode, data, loading, callback }) {
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

  function onLoad () {
    if (!isWebViewLoaded) { // 포스트 메시지를 한번만 보내도록(무한루프 방지)
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
      const splittedScheme = url.split('://');
      const scheme = splittedScheme[0];
      const marketUrl = scheme === 'itmss' ? `https://${splittedScheme[1]}` :  url;
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
    const { pg } = data;
    if (isUrlMatchingWithIamportUrl(url) && CALLBACK_AVAILABLE_PG.indexOf(pg) === -1) { // 결제 종료 후, 콜백 실행
      const { query } = queryString.parseUrl(url);
      if (typeof callback === 'function') {
        callback(query);
      }
      setIsWebViewLoaded(false);
    }
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
