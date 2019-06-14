import React from 'react';
import IMP from 'iamport-react-native';

export default function Certification({ navigation }) {
  const params = navigation.getParam('params');
  return (
    <IMP.Certification
      userCode="imp10391932"
      loading={{
        message: '본인인증이 진행중입니다...',
      }}
      data={params}
      callback={response => navigation.replace('CertificationResult', { response })}
    />
  );   
}
