
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { Linking, Platform } from 'react-native';

import Loading from '../Loading';
import ErrorOnParams from '../ErrorOnParams';

import IamportUrl from '../../utils/IamportUrl.js';
import ValidationForPayment from '../../utils/ValidationForPayment.js';
import {
  PG,
  PAY_METHOD,
  CURRENCY,
  WEBVIEW_SOURCE_HTML,
} from '../../constants';

export function PaymentWebView({
  userCode,
  data,
  loading,
  callback,
  handleInicisTrans,
  open3rdPartyApp,
}) {
  useEffect(() => {
    function handleOpenURL(event) {
      const { pg, pay_method } = data;
      if (pay_method === 'trans') {
        /* [IOS] 웹 표준 이니시스 - 실시간 계좌이체 대비 */
        if (Platform.OS === 'ios') {
          handleInicisTrans(event);
        }

        const { url } = event;
        const iamportUrl = new IamportUrl(url);
        /* 나이스 - 실시간 계좌이체 대비 */
        if (pg === 'nice') {
          this.xdm.injectJavaScript(`
            window.location.href = "${IamportUrl.NICE_TRANS_URL}?${iamportUrl.getStringifiedQuery()}";
          `);
        }
      }
    }
    Linking.addEventListener('url', handleOpenURL);
    
    return function cleanup() {
      Linking.removeEventListener('url', handleOpenURL);
    }
  });

  function onLoadEnd() {
    data.m_redirect_url = IamportUrl.M_REDIRECT_URL;

    this.xdm.injectJavaScript(`
      setTimeout(() => {
        IMP.init("${userCode}");
        IMP.request_pay(${JSON.stringify(data)}, function(response) {
          window.ReactNativeWebView.postMessage(JSON.stringify(response));
        });
      });
    `);
  }
  
  /* PG사가 callback을 지원하는 경우, 결제결과를 받아 callback을 실행한다 */
  function onMessage(e) {
    const { data } = e.nativeEvent;
    let response = data;
    while(decodeURIComponent(response) !== response) {
      response = decodeURIComponent(response);
    }
    response = JSON.parse(response);
    callback(response);
  }

  function onShouldStartLoadWithRequest(request) {
    const { url } = request;
    const iamportUrl = new IamportUrl(url);
    if (iamportUrl.isAppUrl()) {
      /* 3rd-party 앱 오픈 */
      open3rdPartyApp(iamportUrl);
      return false;
    }
    if (iamportUrl.isPaymentOver()) {
      callback(iamportUrl.getQuery());
      return false;
    }
    return true;
  }

  const validation = new ValidationForPayment(userCode, loading, callback, data);
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

PaymentWebView.propTypes = {
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
  handleInicisTrans: PropTypes.func,
  open3rdPartyApp: PropTypes.func.isRequired,
};

export default PaymentWebView;
