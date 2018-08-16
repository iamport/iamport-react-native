
import React from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import { title, background, info, actionButton } from 'styles';
import { CERTIFICATION_INFO } from 'constants';

const logo = require('img/iamport-text-logo.svg');

class CertificationTest extends React.Component {
  static nativationOptions = {
    title: 'CertificationTest'
  }

  state = {
    merchant_uid: `mid_${new Date().getTime()}`,
    min_age: null,
  }

  onPressCertification = () => { // 본인인증 하기 눌렀을떄 
    const { merchant_uid, min_age } = this.state;
    const param = { merchant_uid, min_age };

    const { navigation } = this.props;
    navigation.push('Certification', param);
  }

  onChangeValue = (type, value) => {
    if (value === this.state[type]) return;

    this.setState({ [type]: value });
  }

  renderTitle() {
    const { container, text } = title;
    return (
      <View style={container}>
        <SvgUri source={logo} />
        <Text style={text}>본인인증 테스트</Text>
      </View>
    );
  }

  renderCertificationInfo() {
    const { container, text, input } = info;

    const { merchant_uid, min_age, popup } = this.state;
    return (
      <View style={background}>
        <View style={container}>
          <Text style={text}>주문번호</Text>
          <TextInput
            style={input}
            value={merchant_uid}
            onChangeText={(text) => this.onChangeValue('merchant_uid', text)}
          />
        </View>
        <View style={container}>
          <Text style={text}>최소 연령</Text>
          <TextInput
            style={input}
            value={min_age}
            placeholder={'허용 최소 연령(만)'}
            placeholderTextColor={'#aaa'}
            onChangeText={(text) => this.onChangeValue('min_age', text)}
          />
        </View>
      </View>
    );
  }

  renderButton() {
    const { box, text } = actionButton;
    return (
      <TouchableOpacity 
        style={box} 
        onPress={this.onPressCertification}
      >
        <Text style={text}>본인인증 하기</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        {this.renderTitle()}
        {this.renderCertificationInfo()}
        {this.renderButton()}
      </View>
    );
  }
}

export default CertificationTest;
