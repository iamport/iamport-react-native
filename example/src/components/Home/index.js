
import React from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import Dropdown from '../Dropdown';
import PgPicker from '../PgPicker';
import PayMethodPicker from '../PayMethodPicker';

import { styles } from '../../styles';
import { getCurrentDate } from '../../utils';
import { PAYMENT_INFO, PG, PAY_METHOD_BY_PG } from '../../constants';

class Home extends React.Component {
  static nativationOptions = {
    title: 'Home'
  }

  state = {
    pgPicker: false,
    payMethodPicker: false,
    pg: 'html5_inicis',
    pay_method: 'card',
    name: '아임포트 결제데이터 분석',
    merchant_uid: `mid_${new Date().getTime()}`,
    // amount: '39000',
    amount: '1000',
    buyer_name: '홍길동',
    buyer_tel: '01012345678',
    buyer_email: 'example@naver.com',
    buyer_addr: '서울시 강남구 신사동 661-16',
    buyer_postcode: '06018',
    vbank_due: getCurrentDate(),
  }

  onPressPayment = () => { // 결제하기 눌렀을떄 
    const { 
      pg, 
      pay_method,
      name,
      merchant_uid,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
      buyer_addr,
      buyer_postcode,
      vbank_due,
    } = this.state;

    const { navigation } = this.props;
    const { navigate } = navigation;
    
    const param = {
      pg,
      pay_method,
      name,
      merchant_uid,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
      buyer_addr,
      buyer_postcode,
      vbank_due,
    };
    
    navigation.push('Payment', param);
  }

  onChangePg = (pg) => {
    if (pg === this.state.pg) return;

    // 결제수단 리스트가 다른 경우, 바뀐 리스트의 맨 처음 값으로 바꾼다
    const payMethodLists = PAY_METHOD_BY_PG[pg];
    if (payMethodLists !== PAY_METHOD_BY_PG[this.state.pg]) {
      this.setState({ pay_method: Object.keys(payMethodLists)[0] });
    }
    this.setState({ pg, pgPicker: false, payMethodPicker: false, });
  }

  onChangePayMethod = (pay_method) => {
    if (pay_method === this.state.pay_method) return;

    this.setState({ pay_method, payMethodPicker: false });
  }

  onChangeValue = (type, value) => {
    if (value === this.state[type]) return;

    this.setState({ [type]: value });
  }

  renderPaymentInfo() {
    const { row, text, input } = styles;
    return PAYMENT_INFO.map((info, key) => {
      const { name, value } = info;

      return (
        <View style={row} key={key}>
          <Text style={text}>{name}</Text>
          <TextInput
            style={input}
            value={this.state[value]}
            onChangeText={(text) => this.onChangeValue(value, text)}
          />
        </View>
      );
    })
  }

  render() {
    const { pg, pay_method, vbank_due, pgPicker, payMethodPicker } = this.state;
    const { titleContainer, title, background, row, button, buttonText } = styles;

    return (
      <ScrollView>
        {/* 아임포트 결제테스트 타이틀*/}
        <View style={titleContainer}>
          <SvgUri source={require('../../img/iamport-text-logo.svg')} />
          <Text style={title}>결제테스트</Text>
        </View>
        <View style={background}>
          {/* PG사 드롭다운 */}
          <PgPicker 
            visible={pgPicker}
            selectedValue={pg}
            onPressInput={this.onChangeValue}
            onValueChange={this.onChangePg}
          />
          {/* 결제수단 드롭다운 */}
          <PayMethodPicker 
            pg={pg}
            vbankDue={vbank_due}
            visible={payMethodPicker}
            selectedValue={pay_method}
            onPressInput={this.onChangeValue}
            onValueChange={this.onChangePayMethod}
          />
          {/* 나머지 결제정보 입력필드 */}
          {this.renderPaymentInfo()}
        </View>
        {/* 결제하기 버튼 */}
        <TouchableOpacity 
          style={button} 
          onPress={this.onPressPayment}
        >
          <Text style={buttonText}>결제하기</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Home;
