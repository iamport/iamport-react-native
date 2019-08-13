import React, { useState } from 'react';
import { Content, Form, Item, Label, Input, Button, Text } from 'native-base';
import Picker from '../Picker';

import { CARRIERS } from '../constants';
import { formStyles } from '../styles';

export default function CertificationTest({ navigation }) {
  const { wrapper, form, item, label, input, btn, btnText } = formStyles;
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [company, setCompany] = useState('아임포트');
  const [carrier, setCarrier] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [minAge, setMinAge] = useState();

  onPress = () => {
    const params = {
      merchant_uid: merchantUid,
    };
    if (company) {
      params.company = company;
    }
    if (carrier) {
      params.carrier = carrier;
    }
    if (name) {
      params.name = name;
    }
    if (phone) {
      params.phone = phone;
    }
    if (minAge) {
      params.minAge = minAge;
    }
    
    navigation.navigate('Certification', { params });
  };

  return (
    <Content style={wrapper}>
      <Form style={form}>
        <Item inlineLabel style={item}>
          <Label style={label}>주문번호</Label>
          <Input
            style={input}
            value={merchantUid}
            onChangeText={value => setMerchantUid(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>회사명</Label>
          <Input
            style={input}
            placeholder="또는 도메인"
            value={company}
            onChangeText={value => setCompany(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>통신사</Label>
          <Picker
            iosHeader="통신사 선택"
            data={CARRIERS}
            selectedValue={carrier}
            onValueChange={value => setCarrier(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>이름</Label>
          <Input
            style={input}
            value={name}
            onChangeText={value => setName(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>전화번호</Label>
          <Input
            style={input}
            keyboardType="number-pad"
            value={phone}
            onChangeText={value => setPhone(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>최소연령</Label>
          <Input
            style={input}
            keyboardType="number-pad"
            placeholder="허용 최소 만 나이"
            value={minAge}
            onChangeText={value => setMinAge(value)}
          />
        </Item>
        <Button
          primary
          style={btn}
          onPress={this.onPress}
        >
          <Text style={btnText}>본인인증 하기</Text>
        </Button>
      </Form>
    </Content>
  );  
}