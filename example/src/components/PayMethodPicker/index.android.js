

import React from 'react';
import { 
  View,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import { styles } from '../../styles';
import { PAY_METHOD } from '../../constants';

class PayMethodPicker extends React.Component {
  render() {
    const { row, text, input, vbankMsgContainer, vbankMsg } = styles;
    const { selectedValue, vbankDue, onPressInput, onValueChange } = this.props;

    const items = Object.keys(PAY_METHOD).map((method, key) => {
      return (
        <Picker.Item label={PAY_METHOD[method]} value={method} key={key} />
      );
    });
    
    return (
      <View>
        <View style={row}>
          <Text style={text}>결제수단</Text>
          <Picker
            style={input}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
            {items}
          </Picker>
        </View>
        { 
          selectedValue === 'vbank' && 
          <View>
            <View style={{ ...row, zIndex: 1 }}>
              <Text style={text}>{`가상계좌\n입금기한`}</Text>
              <TextInput
                style={input}
                value={vbankDue}
                onChangeText={(text) => onPressInput('vbank_due', text)}
              />
            </View>
            <View style={vbankMsgContainer}>
              <Text style={vbankMsg}>(YYYYMMDD)</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}

export default PayMethodPicker;
