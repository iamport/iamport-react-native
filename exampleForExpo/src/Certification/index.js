import React from 'react';
// import IMP from 'lib/module';
import IMP from 'iamport-react-native';
import { getUserCode } from '../utils';
import Loading from '../Loading';

export default function Certification({ route, navigation }) {
  const params = route.params.params;
  const tierCode = route.params.tierCode;
  const userCode = getUserCode('danal', tierCode, 'certification');

  return (
    <IMP.Certification
      userCode={userCode}
      tierCode={tierCode}
      data={params}
      loading={<Loading />}
      callback={(response) =>
        navigation.replace('CertificationResult', response)
      }
    />
  );
}
