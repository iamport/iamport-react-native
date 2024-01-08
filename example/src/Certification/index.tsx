import React from 'react';
import IMP from 'iamport-react-native';
import type { RootStackParamList } from '../NavigationService';
import type { StackScreenProps } from '@react-navigation/stack';
import Loading from '../Loading';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<RootStackParamList, 'Certification'>;

function Certification({ route, navigation }: Props) {
  const params = route.params?.params!;
  const tierCode = route.params?.tierCode;
  const userCode = route.params?.userCode!;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <IMP.Certification
        userCode={userCode}
        tierCode={tierCode}
        data={params}
        loading={<Loading />}
        callback={(response) =>
          navigation.replace('CertificationResult', response)
        }
      />
    </SafeAreaView>
  );
}

export default Certification;
