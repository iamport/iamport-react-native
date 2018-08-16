
import React from 'react';
import { 
  Modal, 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PickerIOS, 
  Dimensions 
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import { styles } from '../../styles';
import { PAY_METHOD_BY_PG } from 'constants';

const triangleDown = require('img/triangle-down.svg');
const closePicker = require('img/close-picker.svg');

class PayMethodPicker extends React.Component {
  state = {
    visible: false,
    payMethod: PAY_METHOD_BY_PG[this.props.pg]
  }

  componentDidMount() {
    const { visible } = this.props;
    this.setState({ visible });
  }

  componentDidUpdate(prevProps) {
    const { pg, visible } = this.props;

    if (prevProps.visible !== visible) {
      this.setState({ visible }); 
    }

    if (prevProps.pg !== pg) {
      const payMethod = PAY_METHOD_BY_PG[pg];
      if (PAY_METHOD_BY_PG[prevProps.pg] !== payMethod) {
        this.setState({ payMethod });
      }
    }
  }

  render() {
    const deviceHeight = Dimensions.get('window').height;
    const marginTop = (deviceHeight - 200)/2;

    const { visible, payMethod } = this.state;
    const { row, text, input, picker, dropdown, closeButton, vbankMsgContainer, vbankMsg } = styles;
    const { selectedValue, vbankDue, onPressInput, onValueChange } = this.props;

    const items = Object.keys(payMethod).map((method, key) => {
      return (
        <PickerIOS.Item label={payMethod[method]} value={method} key={key} />
      );
    });

    const hideModal = Object.keys(payMethod).length === 1;

    return (
      <View>
        <View style={row}>
          <Text style={text}>결제수단</Text>
          <TouchableOpacity 
            onPress={() => onPressInput('payMethodPicker', true)}
          >
            <TextInput 
              style={input}
              pointerEvents='none'
              value={payMethod[selectedValue]}
            />
            {
              !hideModal &&
              <SvgUri style={dropdown} source={triangleDown} />
            }
          </TouchableOpacity>
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
        <Modal
          transparent
          visible={visible && !hideModal}
          style={{ zIndex: 1 }}
          onRequestClose={() => console.log('Modal has been closed.')}
        >
          <TouchableOpacity 
            style={{
              ...closeButton,
              marginTop: marginTop + 10,
            }} 
            onPress={() => onPressInput('payMethodPicker', false)}
          >
            <SvgUri source={closePicker} />
          </TouchableOpacity>
          <PickerIOS
            style={{ 
              ...picker, 
              marginTop
            }}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
            {items}
          </PickerIOS>
        </Modal>
      </View>
    );
  }
}

export default PayMethodPicker;
