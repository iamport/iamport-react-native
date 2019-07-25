import React, { useState } from 'react';
import { Content, Form, Item, Label, Input, Button, Text, Switch } from 'native-base';

import Picker from '../Picker';
import { formStyles } from '../styles';
import { PGS } from '../constants';
import { getQuotas, getMethods } from '../utils';

export default function PaymentTest({ navigation }) {
  const { wrapper, form, item, label, input, radio, btn, btnText } = formStyles;
  const [pg, setPg] = useState('html5_inicis');
  const [method, setMethod] = useState('card');
  const [cardQuota, setCardQuota] = useState(0);
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [name, setName] = useState('아임포트 결제데이터분석');
  const [amount, setAmount] = useState('39000');
  const [buyerName, setBuyerName] = useState('홍길동');
  const [buyerTel, setBuyerTel] = useState('01012341234');
  const [buyerEmail, setBuyerEmail] = useState('example@example.com');
  const [vbankDue, setVbankDue] = useState('');
  const [bizNum, setBizNum] = useState('');
  const [escrow, setEscrow] = useState(false);
  const [digital, setDigital] = useState(false);

  onPress = () => {
    const params = {
      pg,
      pay_method: method,
      merchant_uid: merchantUid,
      name,
      amount,
      buyer_name: buyerName,
      buyer_tel: buyerTel,
      buyer_email: buyerEmail,
      escrow,
    };
    
    // 신용카드의 경우, 할부기한 추가
    if (method === 'card' && cardQuota !== 0) {
      params.display = {
        card_quota: cardQuota === 1 ? [] : [cardQuota],
      };
    }

    // 가상계좌의 경우, 입금기한 추가
    if (method === 'vbank' && vbankDue) {
      params.vbank_due = vbankDue;
    }

    // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
    if (method === 'vbank' && pg === 'danal_tpay') {
      params.biz_num = bizNum;
    }

    // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
    if (method === 'phone') {
      params.digital = digital;
    }

    // 정기결제의 경우, customer_uid 추가
    if (pg === 'kcp_billing') {
      params.customer_uid = `cuid_${new Date().getTime()}`;
    }

    navigation.navigate('Payment', { params });
  };

  return (
    <Content style={wrapper}>
      <Form style={form}>
        <Item inlineLabel style={item}>
          <Label style={label}>PG사</Label>
          <Picker
            iosHeader="PG사 선택"
            data={PGS}
            selectedValue={pg}
            onValueChange={value => {
              setPg(value);

              const methods = getMethods(value);
              setMethod(methods[0].value);
            }}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>결제수단</Label>
          <Picker
            iosHeader="결제수단 선택"
            data={getMethods(pg)}
            selectedValue={method}
            onValueChange={value => setMethod(value)}
          />
        </Item>
        {method === 'card' && (
          <Item inlineLabel style={item}>
            <Label style={label}>할부개월수</Label>
            <Picker
              iosHeader="할부개월수 선택"
              data={getQuotas(pg)}
              selectedValue={cardQuota}
              onValueChange={value => setCardQuota(value)}
            />
          </Item>
        )}
        {method === 'vbank' && (
          <Item inlineLabel style={item}>
            <Label style={label}>입금기한</Label>
            <Input
              style={input}
              value={vbankDue}
              onChangeText={value => setVbankDue(value)}
            />
          </Item>  
        )}
        {method === 'vbank' && pg === 'danal_tpay' && (
          <Item inlineLabel style={item}>
            <Label style={label}>사업자번호</Label>
            <Input
              style={input}
              value={bizNum}
              keyboardType="number-pad"
              onChangeText={value => setBizNum(value)}
            />
          </Item>  
        )}
        {method === 'phone' && (
          <Item inlineLabel style={item}>
            <Label style={label}>실물컨텐츠</Label>
            <Switch
              style={radio}
              value={digital}
              onValueChange={value => setDigital(value)}
            />
          </Item>  
        )}
        <Item inlineLabel style={item}>
          <Label style={label}>에스크로</Label>
          <Switch
            style={radio}
            value={escrow}
            onValueChange={value => setEscrow(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>주문명</Label>
          <Input
            style={input}
            value={name}
            onChangeText={value => setName(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>결제금액</Label>
          <Input
            style={input}
            value={amount}
            keyboardType="number-pad"
            onChangeText={value => setAmount(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>주문번호</Label>
          <Input
            style={input}
            value={merchantUid}
            onChangeText={value => setMerchantUid(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>이름</Label>
          <Input
            style={input}
            value={buyerName}
            onChangeText={value => setBuyerName(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>전화번호</Label>
          <Input
            style={input}
            keyboardType="number-pad"
            value={buyerTel}
            onChangeText={value => setBuyerTel(value)}
          />
        </Item>
        <Item inlineLabel style={item}>
          <Label style={label}>이메일</Label>
          <Input
            style={input}
            value={buyerEmail}
            onChangeText={value => setBuyerEmail(value)}
          />
        </Item>
        <Button
          primary
          style={btn}
          onPress={this.onPress}
        >
          <Text style={btnText}>결제하기</Text>
        </Button>
      </Form>
    </Content>
  );  
}