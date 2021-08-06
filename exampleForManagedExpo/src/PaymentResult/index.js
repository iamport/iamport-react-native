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

export default function PaymentResult({ route, navigation }) {
  const imp_success = route.params.imp_success;
  const success = route.params.success;
  const imp_uid = route.params.imp_uid;
  const merchant_uid = route.params.merchant_uid;
  const error_msg = route.params.error_msg;

  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess = !(
    imp_success === 'false' ||
    imp_success === false ||
    success === 'false' ||
    success === false
  );

  return (
    <View>
      {isSuccess ? <CheckCircleIcon /> : <WarningIcon />}
      <Text>{`결제에 ${isSuccess ? '성공' : '실패'}하였습니다`}</Text>
      <List>
        <List.Item>
          <Text>아임포트 번호</Text>
          <Text>{imp_uid}</Text>
        </List.Item>
        {isSuccess ? (
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
