import React, { useState, useEffect } from 'react';
import WebView from 'react-native-webview';
import queryString from 'query-string';

function Home({ navigation }) {
  const [uri, setUri] = useState('http://192.168.0.15:3000');

  useEffect(() => {
    const response = navigation.getParam('response');
    if (response) {
      const query = queryString.stringify(response);
      const { type } = query;
      if (type === 'payment') {
        setUri(`http://192.168.0.15:3000/payment/result.html?${query}`);    
      } else {
        setUri(`http://192.168.0.15:3000/certification/result.html?${query}`);
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