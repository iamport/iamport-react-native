
import React from 'react';
import { Linking } from 'react-native';

import PaymentWebView from './PaymentWebView';

import IamportUrl from '../../utils/IamportUrl.js';

export function Payment({ userCode, data, loading, callback }) {
  function handleInicisTrans(event) {
    const { url } = event;
    const iamportUrl = new IamportUrl(url);
    /* 웹 표준 이니시스 - 실시간 계좌이체 대비 */
    const { pg } = data;
    if (pg === 'html5_inicis') {
      const { m_redirect_url, imp_uid, merchant_uid } = iamportUrl.getQuery();
      if (m_redirect_url.includes(IamportUrl.M_REDIRECT_URL)) {
        const query = {
          imp_uid,
          merchant_uid: typeof merchant_uid === 'object' ? merchant_uid[0] : merchant_uid,
        };
        callback(query);
      }
    }
  }

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
      data={data}
      loading={loading}
      callback={callback}
      handleInicisTrans={handleInicisTrans}
      open3rdPartyApp={open3rdPartyApp}
    />
  );
}

export default Payment;
