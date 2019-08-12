import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '../Loading';
import ErrorOnParams from '../ErrorOnParams';

import Validation from '../../utils/Validation';
import { WEBVIEW_SOURCE_HTML, CARRIERS } from '../../constants';

export function Certification({ userCode, data, loading, callback }) {
  function onLoadEnd() {
    this.xdm.injectJavaScript(`
      IMP.init("${userCode}");
      IMP.certification(${JSON.stringify(data)}, function(response) {
        window.ReactNativeWebView.postMessage(JSON.stringify(response));
      });
    `);
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

  const validation = new Validation(userCode, loading);
  if (validation.getIsValid()) {
    return (
      <WebView
        ref={(xdm) => this.xdm = xdm}
        useWebKit
        source={{ html: WEBVIEW_SOURCE_HTML }}
        onLoadEnd={onLoadEnd}
        onMessage={onMessage}
        startInLoadingState
        renderLoading={() => loading || <Loading />}
        originWhitelist={['*']} // https://github.com/facebook/react-native/issues/19986
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    );
  }

  return <ErrorOnParams message={validation.getMessage()} />;
}

Certification.propTypes = {
  userCode: PropTypes.string.isRequired,
  data: PropTypes.shape({
    merchant_uid: PropTypes.string,
    company: PropTypes.string,
    carrier: PropTypes.oneOf(CARRIERS),
    name: PropTypes.string,
    phone: PropTypes.string,
    min_age: PropTypes.string,
  }),
  callback: PropTypes.func.isRequired,
  loading: PropTypes.object,
};

export default Certification;
