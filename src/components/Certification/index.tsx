import React, { useRef, useState } from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '../Loading';
import ErrorOnParams from '../ErrorOnParams';

import { IMPData, Validation } from '../../utils/Validation';
import { IMPConst } from '../../constants';

type Props = {
  userCode: string;
  tierCode?: string;
  data: IMPData.CertificationData;
  loading: any;
  callback: (response: any) => any;
};

function Certification({ userCode, tierCode, data, loading, callback }: Props) {
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const webview = useRef<WebView>();

  const validation = new Validation(userCode, loading);
  if (validation.getIsValid()) {
    return (
      <WebView
        ref={(ref) => {
          if (ref !== null) {
            webview.current = ref;
          }
        }}
        useWebKit
        source={{ html: IMPConst.WEBVIEW_SOURCE_HTML }}
        onLoadEnd={() => {
          if (!isWebViewLoaded) {
            // html이 load되고 최초 한번만 inject javascript
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
        renderLoading={() => loading || <Loading />}
        originWhitelist={['*']} // https://github.com/facebook/react-native/issues/19986
        onShouldStartLoadWithRequest={(request) => {
          const { url } = request;
          if (url.startsWith('https://itunes.apple.com')) {
            Linking.openURL(url);
            return false;
          }
          if (url.startsWith('market://details')) {
            Linking.openURL(url);
            return false;
          }
          return true;
        }}
      />
    );
  }

  return <ErrorOnParams message={validation.getMessage()} />;
}

export default Certification;
