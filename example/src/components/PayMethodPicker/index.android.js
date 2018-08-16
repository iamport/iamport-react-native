

import React from 'react';
import { 
  View,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import { vbank, info } from './styles';
import { PAY_METHOD } from 'constants';

class PayMethodPicker extends React.Component {
  renderPayMethod() {
    const items = Object.keys(PAY_METHOD).map((method, key) => {
      return (
        <Picker.Item label={PAY_METHOD[method]} value={method} key={key} />
      );
    });

    const { selectedValue, onValueChange } = this.props;
    const { container, text,input } = info;
    return (
      <View style={container}>
        <Text style={text}>결제수단</Text>
        <Picker
          style={input}
          selectedValue={selectedValue}
          onValueChange={onValueChange}>
          {items}
        </Picker>
      </View>
    );
  }

  renderVbankDue() {
    const { container, text, input } = info;
    const { vbankDue, onPressInput } = this.props;
    return (
      <View style={{ ...container, zIndex: 1 }}>
        <Text style={text}>{`가상계좌\n입금기한`}</Text>
        <TextInput
          style={input}
          value={vbankDue}
          onChangeText={(vbank_due) => onPressInput('vbank_due', vbank_due)}
        />
      </View>
    );
  }

  renderVbankPlaceholder() {
    const { container, text } = vbank;
    return (
      <View style={container}>
        <Text style={text}>(YYYYMMDD)</Text>
      </View>
    );
  }

  render() {
    const { selectedValue } = this.props;
    
    return (
      <View>
        {this.renderPayMethod()}
        { 
          selectedValue === 'vbank' && 
          <View>
            {this.renderVbankDue()}
            {this.renderVbankPlaceholder()}
          </View>
        }
      </View>
    );
  }
}

export default PayMethodPicker;
