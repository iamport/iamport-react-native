import React from 'react';
import { View } from 'react-native';
import { List, ListItem, Icon, Button, Text } from 'native-base';

import { resultStyles, resultSuccessStyles, resultFailureStyles } from '../styles';

export default function PaymentResult({ navigation }) {
  const response = navigation.getParam('response');
  const { imp_success, success, imp_uid, merchant_uid, error_msg } = response;
  const { wrapper, title, listContainer, list, label, value } = resultStyles;

  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess = !(imp_success === 'false' || imp_success === false || success === 'false' || success === false);
  const { icon, btn, btnText, btnIcon } = isSuccess ? resultSuccessStyles : resultFailureStyles;

  return (
    <View style={wrapper}>
      <Icon
        style={icon}
        type="AntDesign"
        name={isSuccess ? 'checkcircle' : 'exclamationcircle'}
      />
      <Text style={title}>{`결제에 ${isSuccess ? '성공' : '실패'}하였습니다`}</Text>
      <List style={listContainer}>
        <ListItem style={list}>
          <Text style={label}>아임포트 번호</Text>
          <Text style={value}>{imp_uid}</Text>
        </ListItem>
        {isSuccess ? (
          <ListItem style={list}>
            <Text style={label}>주문번호</Text>
            <Text style={value}>{merchant_uid}</Text>
          </ListItem>
        ) : (
          <ListItem style={list}>
            <Text style={label}>에러메시지</Text>
            <Text style={value}>{error_msg}</Text>
          </ListItem>
        )}
      </List>
      <Button
        bordered
        transparent
        style={btn}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="arrow-back" style={btnIcon} />
        <Text style={btnText}>돌아가기</Text>
      </Button>
    </View>
  );
}
