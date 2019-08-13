import React from 'react';
import IMP from 'iamport-react-native';

import Loading from '../Loading';

import { getUserCode } from '../utils';

export default function Payment({ navigation }) {
  const params = navigation.getParam('params');
  const { pg } = params;
  const data = {
    ...params,
    app_scheme: 'example',
  };
  
  return (
    <IMP.Payment
      userCode={getUserCode(pg)}
      loading={<Loading />}
      data={data}
      callback={response => navigation.replace('PaymentResult', { response })}
    />
  );   
}
