import React from 'react';
import IMP from 'iamport-react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../NavigationService';
import { getUserCode } from '../utils';
import Loading from '../Loading';

type Props = StackScreenProps<RootStackParamList, 'Payment'>;

function Payment({ route, navigation }: Props) {
  const params = route.params?.params;
  const tierCode = route.params?.tierCode;
  const userCode = getUserCode(params!.pg, tierCode);

  return (
    <IMP.Payment
      userCode={userCode}
      tierCode={tierCode}
      loading={<Loading />}
      data={params!}
      callback={(response) => navigation.replace('PaymentResult', response)}
    />
  );
}

export default Payment;
