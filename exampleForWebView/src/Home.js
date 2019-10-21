import React, { useState, useEffect } from 'react';
import WebView from 'react-native-webview';
import queryString from 'query-string';

function Home({ navigation }) {
  const domain = 'http://192.168.0.25:3000';
  const [uri, setUri] = useState(domain);

  useEffect(() => {
    const type = navigation.getParam('type');
    const response = navigation.getParam('response');
    if (response) {
      const query = queryString.stringify(response);
      if (type === 'payment') {
        setUri(`${domain}/payment/result?${query}`);    
      } else {
        setUri(`${domain}/certification/result?${query}`);
      }
    }
  }, [navigation]);

  function onMessage(e) {
    try {
      const { userCode, data, type } = JSON.parse(e.nativeEvent.data);
      const params = { userCode, data };
      navigation.push(type === 'payment' ? 'Payment' : 'Certification', params);
    } catch (e) {}
  }

  return (
    <WebView
      source={{ uri }} 
      onMessage={onMessage}
      style={{ flex: 1 }}
      injectedJavascript={`(function() {
        window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data);
        };
      })()`}
    />
  );
}

export default Home;