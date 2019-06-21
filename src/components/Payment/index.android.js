
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { 
  StyleSheet, 
  requireNativeComponent, 
  DeviceEventEmitter,
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import ErrorOnParams from '../ErrorOnParams';

import { validateProps } from '../../utils';
import { PG, PAY_METHOD, CURRENCY, DEFAULT_M_REDIRECT_URL } from '../../constants';

const IamportWebView = requireNativeComponent('IamportWebView', null);

export function Payment({ userCode, data, loading, callback }) {
  useEffect(() => {
    function onMessage(callbackUrl) {
      const { query } = queryString.parseUrl(callbackUrl);
      if (typeof callback === 'function') {
        callback(query);
      }
    }

    // add event listener
    DeviceEventEmitter.addListener('message', onMessage);

    return function cleanup() {
      // remove event listener
      DeviceEventEmitter.removeAllListeners('message');
    }
  });

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

  function triggerCallback(response) { // 콜백을 지원하는 PG사의 경우, 결제 시도 종료 후 해당 함수가 트리거된다
    const query = [];
    Object.keys(response).forEach(key => {
      query.push(`${key}=${response[key]}`);
    });

    location.href = `http://localhost/iamport?${query.join('&')}`;
  }

  const { webView } = styles;
  const { validate, message } = validateProps(userCode, data);
  /* [v1.1.2] 콜백에 merchant_uid 전달을 위해 m_redirect_url을 dummy url로 지정 */
  data.m_redirect_url = DEFAULT_M_REDIRECT_URL;
  if (validate) {
    return (
      <IamportWebView
        param={{ 
          userCode, 
          data, 
          callback: String(callback),
          triggerCallback: String(triggerCallback),
          loading: getCustomLoading(),
        }}
        style={webView} 
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
    digital: PropTypes.bool,
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

const styles = StyleSheet.create({ 
  webView: {
    flex: 1, // or gets white screen
  },
});

export default Payment;
