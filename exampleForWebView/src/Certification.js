import React from 'react';
import IMP from 'iamport-react-native';

function Certification({ navigation }) {
  /* 가맹점 식별코드, 본인인증 데이터 추출 */
  const userCode = navigation.getParam('userCode');
  const data = navigation.getParam('data');
  
  /* [필수입력] 본인인증 후 실행될 콜백 함수 입력 */
  function callback(response) {
    const { success } = response;
    if (success === 'false') {
      // 본인인증 실패한 경우, 본래 페이지로 돌아간다
      navigation.goBack();
    } else {
      // 본인인증 성공한 경우, 리디렉션 위해 홈으로 이동한다
      const params = {
        ...response,
        type: 'certification',
      };
      navigation.replace('Home', params);
    }
  }

  return (
    <IMP.Certification
      userCode={userCode}
      data={data}
      callback={callback}
    />
  );
}

export default Certification;
