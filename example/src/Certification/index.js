import React from 'react';
import IMP from 'iamport-react-native';

import Loading from '../Loading';

import { getUserCode } from '../utils';

export default function Certification({ navigation }) {
  const params = navigation.getParam('params');
  const tierCode = navigation.getParam('tierCode');

  const userCode = getUserCode('danal', tierCode, 'certification');

  return (
    <IMP.Certification
      userCode={userCode}
      tierCode={tierCode}
      loading={<Loading />}
      data={params}
      callback={response => navigation.replace('CertificationResult', { response })}
    />
  );   
}
