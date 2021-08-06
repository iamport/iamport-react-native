import React from 'react';
import IMP from 'iamport-react-native';
import { getUserCode } from '../utils';
import Loading from '../Loading';

export default function Payment({ route, navigation }) {
  const params = route.params.params;
  const tierCode = route.params.tierCode;
  const userCode = getUserCode(params.pg, tierCode);

  return (
    <IMP.Payment
      userCode={userCode}
      tierCode={tierCode}
      loading={<Loading />}
      data={params}
      callback={(response) => navigation.replace('PaymentResult', response)}
    />
  );
}
