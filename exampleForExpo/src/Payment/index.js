import React from 'react';
import IMP from 'iamport-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserCode } from '../utils';
import Loading from '../Loading';

export default function Payment({ route, navigation }) {
  const params = route.params.params;
  const tierCode = route.params.tierCode;
  const userCode = getUserCode(params.pg, tierCode);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <IMP.Payment
        userCode={userCode}
        tierCode={tierCode}
        loading={<Loading />}
        data={params}
        callback={(response) => navigation.replace('PaymentResult', response)}
      />
    </SafeAreaView>
  );
}
