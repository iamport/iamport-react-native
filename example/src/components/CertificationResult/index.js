
import React from 'react';
import { View, Text, Button } from 'react-native';

import { result } from 'styles';
import { PG } from 'constants';

class CertificationResult extends React.Component {
  static nativationOptions = {
    title: 'CertificationResult'
  }

  renderMessage(paymentResult) {
    const { title, failure, success } = result;

    if (paymentResult) {
      return (
        <Text style={title}>
          <Text style={success}>🎉 </Text>
          본인인증에 성공하였습니다.
        </Text>
      );
    }

    return (
      <Text style={title}>
        <Text style={failure}>❗</Text>
        본인인증에 실패하였습니다.
      </Text>
    );
  }

  render() {
    const { navigation } = this.props;
    const success = navigation.getParam('success');
    const type = navigation.getParam('type');
    const pg_provider = navigation.getParam('pg_provider');
    const imp_uid = navigation.getParam('imp_uid');
    const merchant_uid = navigation.getParam('merchant_uid');
    const error_msg = navigation.getParam('error_msg');

    const { container, table, row, name, value, button } = result;

    return (
      <View style={container}>
        {this.renderMessage(success)}
        <View style={table}>
          <View style={row}>
            <Text style={name}>PG사</Text>
            <Text style={value}>{PG[pg_provider] || '없음'}</Text>
          </View>
          <View style={row}>
            <Text style={name}>아임포트 번호</Text>
            <Text style={value}>{imp_uid || '없음'}</Text>
          </View>
          <View style={row}>
            <Text style={name}>주문 번호</Text>
            <Text style={value}>{merchant_uid || '없음'}</Text>
          </View>
          {
            !success && 
            <View style={row}>
              <Text style={name}>에러 메시지</Text>
              <Text style={value}>{error_msg || '없음'}</Text>
            </View>
          }
        </View>
        <View style={button}>
          <Button 
            title='돌아가기' 
            color='#333'
            onPress={() => navigation.push('Home')}
          />
        </View>
      </View>
    );
  }
}

export default CertificationResult;
