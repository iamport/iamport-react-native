
import React from 'react';
import { Linking, NativeModules } from 'react-native';

import PaymentWebView from './PaymentWebView';

const { Iamport } = NativeModules;

export function Payment({ userCode, data, loading, callback }) {
  async function open3rdPartyApp(iamportUrl) {
    const url = iamportUrl.getUrl();
    try {
      /* 3rd-party 앱 오픈 */
      const appUrl = await Iamport.getAppUrl(url);
      Linking.openURL(appUrl)
      .catch(async () => {
        /* 앱 미설치시 마켓 오픈 */
        try {
          const marketUrl = await Iamport.getMarketUrl(url);
          Linking.openURL(marketUrl);
        } catch (e) {
          handleOpen3rdPartyAppError(e);
        }
      });
    } catch (e) {
      handleOpen3rdPartyAppError(e);
    }
  }

  function handleOpen3rdPartyAppError(e) {
    const { code, message } = e;
    callback({
      imp_success: false,
      error_code: code,
      error_msg: message,
    });
  }

  return (
    <PaymentWebView
      userCode={userCode}
      data={data}
      loading={loading}
      callback={callback}
      open3rdPartyApp={open3rdPartyApp}
    />
  );
}

export default Payment;
