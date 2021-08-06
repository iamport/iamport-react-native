import React from 'react';
import { Button, Text, View } from 'native-base';

export default function Home({ navigation }) {
  return (
    <View>
      <View>
        <View>
          <Text>아임포트 테스트</Text>
          <Text>아임포트 리액트 네이티브 Expo 모듈 테스트 화면입니다.</Text>
          <Text>
            아래 버튼을 눌러 결제 또는 본인인증 테스트를 진행해주세요.
          </Text>
        </View>
        <View>
          <Button onPress={() => navigation.push('PaymentTest')}>
            <Text>결제 테스트</Text>
          </Button>
          <Button onPress={() => navigation.push('CertificationTest')}>
            <Text>본인인증 테스트</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
