
import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { View, Text, TouchableOpacity } from 'react-native';

import { title, background, explanation, button } from './styles';

const logo = require('img/iamport-text-logo.svg');
const dot = require('img/dot.svg');
const payment = require('img/payment.svg');
const certification = require('img/certification.svg');

class Home extends React.Component {
  static nativationOptions = {
    title: 'Home'
  }

  renderTitle() {
    const { container, text } = title;

    return (
      <View style={container}>
        <SvgUri source={logo} />
        <Text style={text}>테스트</Text>
      </View>
    );
  }

  renderExplanation() {
    const { container, row, img, text } = explanation;

    return (
      <View style={container}>
        <View style={row}>
          <SvgUri source={dot} style={img}/>
          <Text style={text}>아임포트 리액트 네이티브 모듈 테스트를 위한 화면입니다.</Text>
        </View>
        <View style={row}>
          <SvgUri source={dot} style={img} />
          <Text style={text}>아래 버튼을 눌러 결제 및 본인인증을 테스트를 위한 화면으로 넘어가실 수 있습니다.</Text>
        </View>
      </View>
    );
  }

  renderButtons() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { container, box, text } = button;

    return (
      <View style={container}>
        <TouchableOpacity 
          style={{ ...box, marginRight: 10 }} 
          onPress={() => navigation.push('PaymentTest')}
        >
          <SvgUri source={payment} />  
          <Text style={text}>결제 테스트</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ ...box, marginLeft: 10 }}
          onPress={() => navigation.push('CertificationTest')}
        >
          <SvgUri source={certification} />  
          <Text style={text}>본인인증 테스트</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={background}>
        {this.renderTitle()}
        {this.renderExplanation()}
        {this.renderButtons()}
      </View>
    );
  }
}

export default Home;
