import React from 'react';
import { Icon, IconButton, List, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

function getBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return undefined;
}

export default function PaymentResult({ route, navigation }) {
  const imp_success = route.params?.imp_success;
  const success = route.params?.success;
  const imp_uid = route.params?.imp_uid;
  const tx_id = route.params?.txId;
  const merchant_uid = route.params?.merchant_uid;
  const payment_id = route.params?.paymentId;
  const error_code = route.params?.error_code;
  const code = route.params?.code;
  const message = route.params?.message;
  const error_msg = route.params?.error_msg;

  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess =
    getBoolean(imp_success) ??
    getBoolean(success) ??
    (error_code == null && code == null);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
    >
      {isSuccess ? (
        <Icon
          as={FontAwesome}
          name={'check-circle'}
          size={20}
          color={'#52c41a'}
        />
      ) : (
        <Icon as={FontAwesome} name={'warning'} size={20} color={'#f5222d'} />
      )}
      <Text fontSize={25} fontWeight={'bold'} mb={20}>{`결제에 ${
        isSuccess ? '성공' : '실패'
      }하였습니다`}</Text>
      <List width={'90%'} mb={50} borderRadius={3}>
        <List.Item>
          <Text w={'40%'}>아임포트 번호</Text>
          <Text w={'60%'}>{imp_uid ?? tx_id}</Text>
        </List.Item>
        {isSuccess ? (
          <List.Item>
            <Text w={'40%'}>주문번호</Text>
            <Text w={'60%'}>{merchant_uid ?? payment_id}</Text>
          </List.Item>
        ) : (
          <List.Item>
            <Text w={'40%'}>에러코드</Text>
            <Text w={'60%'}>{error_code ?? code}</Text>
            <Text w={'40%'}>에러메시지</Text>
            <Text w={'60%'}>{error_msg ?? message}</Text>
          </List.Item>
        )}
      </List>
      <IconButton
        icon={<Icon as={FontAwesome} name={'arrow-left'} size={20} />}
        /* @ts-ignore */
        onPress={() => navigation.navigate('Home')}
      >
        <Text>돌아가기</Text>
      </IconButton>
    </SafeAreaView>
  );
}
