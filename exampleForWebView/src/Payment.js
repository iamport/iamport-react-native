import React from 'react';
import IMP from 'iamport-react-native';

import Loading from './Loading';

function Payment({ navigation }) {
  /* 가맹점 식별코드, 결제 데이터 추출 */
  const userCode = navigation.getParam('userCode');
  const data = navigation.getParam('data');
  
  /* [필수입력] 결제 후 실행될 콜백 함수 입력 */
  function callback(response) {
    const isSuccessed = getIsSuccessed(response);
    if (isSuccessed) {
      // 결제 성공한 경우, 리디렉션 위해 홈으로 이동한다
      const params = {
        response,
        type: 'payment',
      };
      navigation.replace('Home', params);
    } else {
      // 결제 실패한 경우, 본래 페이지로 돌아간다
      navigation.goBack();
    }
  }

  function getIsSuccessed(response) {
    const { imp_success, success } = response;

    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }

  return (
    <IMP.Payment
      userCode={userCode}
      loading={<Loading />}
      data={{
        ...data,
        app_scheme: 'exampleForWebView',
      }}
      callback={callback}
    />
  );
}

export default Payment;
