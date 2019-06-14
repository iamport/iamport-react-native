import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import ErrorOnParams from '../ErrorOnParams';

export function Certification({ userCode, data, loading, callback }) {
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

  function onLoad() {
    if (!isWebViewLoaded) { // 포스트 메시지를 한번만 보내도록(무한루프 방지)
      const params = JSON.stringify({ 
        userCode, 
        data, 
        loading: getCustomLoading(),
      });
      this.xdm.postMessage(params);

      setIsWebViewLoaded(true);
    }
  }

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
  
  function onMessage(e) { // 본인인증 결과를 받아 callback을 실행한다 
    const { data } = e.nativeEvent;
    let response = data;
    while(decodeURIComponent(response) !== response) {
      response = decodeURIComponent(response);
    }
    response = JSON.parse(response);

    if (typeof callback === 'function') {
      callback(response);
    }
  }

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

    return `(${String(patchPostMessageFunction)})(); `;
  }

  function onShouldStartLoadWithRequest(request) {
    const { url } = request;
    if (url.startsWith('https://itunes.apple.com')) { // IOS
      Linking.openURL(url);
      return false;
    }
    if (url.startsWith('market://details')) { // Android
      Linking.openURL(url);
      return false;
    }
    return true;
  }

  const source =
    Platform.OS === 'android' ?
    { uri: 'file:///android_asset/html/certification.html' } :
    require('../../html/certification.html'); // https://github.com/facebook/react-native/issues/505

  if (userCode) {
    return (
      <WebView
        ref={(xdm) => this.xdm = xdm}
        useWebKit
        source={source}
        onLoad={onLoad}
        onMessage={onMessage}
        originWhitelist={['*']} // https://github.com/facebook/react-native/issues/19986
        injectedJavaScript={getInjectedJavascript()} // https://github.com/facebook/react-native/issues/10865
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    );
  }

  return <ErrorOnParams message={'가맹점 식별코드는 필수입력입니다.'} />;
}

Certification.propTypes = {
  userCode: PropTypes.string.isRequired,
  data: PropTypes.shape({
    merchant_uid: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    min_age: PropTypes.string,
  }),
  callback: PropTypes.func.isRequired,
  loading: PropTypes.shape({
    message: PropTypes.string,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

export default Certification;
