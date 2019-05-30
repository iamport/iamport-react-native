
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { 
  StyleSheet, 
  requireNativeComponent, 
  DeviceEventEmitter 
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import ErrorOnParams from '../ErrorOnParams';

import { validateProps } from '../../utils';
import { PG, PAY_METHOD, CURRENCY } from '../../constants';

const IamportWebView = requireNativeComponent('IamportWebView', null);

class Payment extends React.Component {
  static propTypes = {
    userCode: PropTypes.string.isRequired,
    data: PropTypes.shape({
      pg: PropTypes.oneOf(PG),
      pay_method: PropTypes.oneOf(PAY_METHOD),
      currency: PropTypes.oneOf(CURRENCY),
      notice_url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      display: PropTypes.shape({
        card_quota: PropTypes.arrayOf(PropTypes.number)
      }),
      merchant_uid: PropTypes.string.isRequired,
      amoung: PropTypes.oneOfType([
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
      digital: PropTypes.bool,
    }),
    callback: PropTypes.func.isRequired,
    loading: PropTypes.shape({
      message: PropTypes.string,
      image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    })
  };

  componentDidMount() {
    // add event listener
    DeviceEventEmitter.addListener('message', this.onMessage);
  }

  componentWillUnmount() {
    // remove event listener
    DeviceEventEmitter.removeAllListeners('message');
  }

  onMessage = (callbackUrl) => {
    const { callback } = this.props;
    const { url, query } = queryString.parseUrl(callbackUrl);
    
    /* 신한/현대 앱카드 대비 */
    const queryKeys = Object.keys(query);
    if (queryKeys.indexOf('success') === -1 && queryKeys.indexOf('imp_success') === -1) {
      query['success'] = !(url.indexOf('success') === -1);
    }
    
    if (typeof callback === 'function') {
      callback(query);
    }
  }

  getCustomLoading() {
    const { loading } = this.props;
    if (typeof loading === 'undefined') {
      return {
        message: '잠시만 기다려주세요...',
        image: '../img/iamport-logo.png',
      };
    }
    
    return {
      message: this.getCustomLoadingMessage(),
      image: this.getCustomLoadingImage(),
    };
  }

  getCustomLoadingMessage() {
    const { loading } = this.props;
    const { message } = loading;
    if (typeof message === 'string') {
      return message;
    }
    return '잠시만 기다려주세요...';
  }

  getCustomLoadingImage() {
    const { loading } = this.props;
    const { image } = loading;

    if (typeof image === 'number') {
      return resolveAssetSource(image).uri;
    }

    if (typeof image === 'string') {
      return image;
    }

    return '../img/iamport-logo.png';
  }

  triggerCallback = (response) => { // 콜백을 지원하는 PG사의 경우, 결제 시도 종료 후 해당 함수가 트리거된다
    const { success, imp_uid, merchant_uid } = response;
    const BASE_URL = 'https://service.iamport.kr/payments';
    let path = '';
    let query = `success=${success}&imp_uid=${imp_uid}&merchant_uid=${merchant_uid}`;
    if (success) {
      path = 'success';
    } else {
      const { error_msg } = response;
      path = 'fail'
      query += `&error_msg=${error_msg}`;
    }

    location.href = `${BASE_URL}/${path}?${query}`;
  }

  render() {
    const { webView } = styles;
    const { userCode, data, callback, loading } = this.props;

    const { validate, message } = validateProps(userCode, data);
    if (validate) {
      return (
        <IamportWebView
          param={{ 
            userCode, 
            data, 
            callback: String(callback),
            triggerCallback: String(this.triggerCallback),
            loading: this.getCustomLoading(),
          }}
          style={webView} 
        />
      );
    }
    
    return <ErrorOnParams message={message} />;
  }
}

const styles = StyleSheet.create({ 
  webView: {
    flex: 1, // or gets white screen
  }
});

export default Payment;
