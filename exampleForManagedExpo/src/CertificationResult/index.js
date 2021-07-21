import React from 'react';
import {
  ArrowBackIcon,
  CheckCircleIcon,
  IconButton,
  List,
  Text,
  View,
  WarningIcon,
} from 'native-base';

export default function CertificationResult({ route, navigation }) {
  const success = route.params.success;
  const imp_uid = route.params.imp_uid;
  const merchant_uid = route.params.merchant_uid;
  const error_msg = route.params.error_msg;

  return (
    <View>
      {success ? <CheckCircleIcon /> : <WarningIcon />}
      <Text>{`본인인증에 ${success ? '성공' : '실패'}하였습니다`}</Text>
      <List>
        <List.Item>
          <Text>아임포트 번호</Text>
          <Text>{imp_uid}</Text>
        </List.Item>
        {success ? (
          <List.Item>
            <Text>주문번호</Text>
            <Text>{merchant_uid}</Text>
          </List.Item>
        ) : (
          <List.Item>
            <Text>에러메시지</Text>
            <Text>{error_msg}</Text>
          </List.Item>
        )}
      </List>
      <IconButton
        icon={<ArrowBackIcon />}
        onPress={() => navigation.navigate('Home')}
      >
        <Text>돌아가기</Text>
      </IconButton>
    </View>
  );
}
