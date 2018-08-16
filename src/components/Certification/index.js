
import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native';

import ErrorOnParams from '../ErrorOnParams';

import { validateProps } from '../../utils';

const source = require('../../html/certification.html');

class Certification extends React.Component {
  static propTypes = {
    userCode: PropTypes.string.isRequired,
    data: PropTypes.shape({
      merchant_uid: PropTypes.string,
      min_age: PropTypes.string,
    }),
    callback: PropTypes.func.isRequired,
  };

  state = {
    status: 'ready',
  }

  onLoad = () => {
    const { status } = this.state;
    if (status === 'ready') { // 포스트 메시지를 한번만 보내도록(무한루프 방지)
      const { userCode, data } = this.props;
      const { m_redirect_url } = data;

      const params = JSON.stringify({ userCode, data });
      this.xdm.postMessage(params);
      this.setState({ status: 'sent' });
    }
  }

  onMessage = (e) => { // 본인인증 결과를 받아 callback을 실행한다 
    const { callback } = this.props;
    const response = JSON.parse(e.nativeEvent.data);

    callback(response);
  }

  getInjectedJavascript() { // 웹뷰 onMessage override 방지 코드
    const patchPostMessageFunction = function() {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) { 
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function() { 
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
      };

      window.postMessage = patchedPostMessage;
    };

    return `(${String(patchPostMessageFunction)})();`;
  }

  // onNavigationStateChange = (e) => {
  //   const { status } = this.state;
  //   if (status === 'sent') {
  //     console.log(e.url);
  //   } 
  // }

  render() {
    const { userCode } = this.props;
    if (userCode) {
      return (
        <WebView
          ref={(xdm) => this.xdm = xdm}
          source={source}
          onLoad={this.onLoad}
          onMessage={this.onMessage}
          originWhitelist={['*']} // https://github.com/facebook/react-native/issues/19986
          injectedJavaScript={this.getInjectedJavascript()} // https://github.com/facebook/react-native/issues/10865
          // onNavigationStateChange={this.onNavigationStateChange}
        />
      );
    }

    return <ErrorOnParams message={'가맹점 식별코드는 필수입력입니다.'} />;
  }
}

export default Certification;

