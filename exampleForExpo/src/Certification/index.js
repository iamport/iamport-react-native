import React from 'react';
import IMP from 'iamport-react-native';

import Loading from '../Loading';

export default function Certification({ navigation }) {
  const params = navigation.getParam('params');
  return (
    <IMP.Certification
      userCode="imp10391932"
      loading={<Loading />}
      data={params}
      callback={response => navigation.replace('CertificationResult', { response })}
    />
  );   
}
