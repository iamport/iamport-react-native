
import React from 'react';
import { Linking } from 'react-native';

import PaymentWebView from './PaymentWebView';

export function Payment({ userCode, tierCode, data, loading, callback }) {

  function open3rdPartyApp(iamportUrl) {
    // 앱 오픈
    Linking.openURL(iamportUrl.getAppUrl())
    .catch(() => {
      // 앱 미설치 경우, 마켓 URL로 연결
      Linking.openURL(iamportUrl.getMarketUrl());
    });
  }

  return (
    <PaymentWebView
      userCode={userCode}
      tierCode={tierCode}
      data={data}
      loading={loading}
      callback={callback}
      open3rdPartyApp={open3rdPartyApp}
    />
  );
}

export default Payment;
