
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { 
  StyleSheet, 
  requireNativeComponent, 
  DeviceEventEmitter 
} from 'react-native';

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
      m_redirect_url: PropTypes.string,
      popup: PropTypes.bool,
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

  onMessage = (url) => {
    const { callback } = this.props;
    const { query } = queryString.parseUrl(url);
    
    const newQuery = { ...query, success: false };
    callback(newQuery);
  }

  render() {
    const { webView, container, text, button } = styles;
    const { userCode, data, callback } = this.props;

    const { validate, message } = validateProps(userCode, data);
    if (validate) {
      const isCallbackDefined = typeof callback === 'function' ? true : false;
      return (
        <IamportWebView
          param={{ 
            userCode, 
            data, 
            isCallbackDefined,
          }}
          style={webView} 
        />
      );
    }
    
    const { app_scheme } = data;
    return <ErrorOnParams appScheme={app_scheme} message={message} />;
  }
}

const styles = StyleSheet.create({ 
  webView: {
    flex: 1, // or gets white screen
  }
});

export default Payment;
