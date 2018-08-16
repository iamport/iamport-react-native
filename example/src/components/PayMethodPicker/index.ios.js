
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

import { PAY_METHOD_BY_PG } from 'constants';
import { vbank, info, picker, dropdown, closeButton } from './styles';

const triangleDown = require('img/triangle-down.svg');
const closePicker = require('img/close-picker.svg');

const deviceHeight = Dimensions.get('window').height;
const marginTop = (deviceHeight - 200)/2;

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

  renderPayMethod(hideModal) {
    const { payMethod } = this.state;
    const { selectedValue, onPressInput } = this.props;

    const { container, input, text } = info;
    return (
      <View style={container}>
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
    );
  }

  renderVbankDue() {
    return (
      <View>
        {this.renderVbankDueValue()}
        {this.renderVbankPlaceDueholder()}
      </View>
    );
  }

  renderVbankDueValue() {
    const { vbankDue, onPressInput } = this.props;
    const { container, text, input } = info;
    return (
      <View style={{ ...container, zIndex: 1 }}>
        <Text style={text}>{`가상계좌\n입금기한`}</Text>
        <TextInput
          style={input}
          value={vbankDue}
          onChangeText={(text) => onPressInput('vbank_due', text)}
        />
      </View>
    );
  }

  renderVbankPlaceDueholder() {
    const { container, text } = vbank;
    return (
      <View style={container}>
        <Text style={text}>(YYYYMMDD)</Text>
      </View>
    );
  }

  renderPayMethodModal(hideModal) {
    const { visible, payMethod } = this.state;
    const { selectedValue, onPressInput, onValueChange } = this.props;

    const items = Object.keys(payMethod).map((method, key) => {
      return (
        <PickerIOS.Item label={payMethod[method]} value={method} key={key} />
      );
    });

    return (
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
    );
  }

  render() {
    const { payMethod } = this.state;
    const { selectedValue } = this.props;

    const hideModal = Object.keys(payMethod).length === 1;

    return (
      <View>
        {this.renderPayMethod(hideModal)}
        {selectedValue === 'vbank' && this.renderVbankDue()}
        {this.renderPayMethodModal(hideModal)}
      </View>
    );
  }
}

export default PayMethodPicker;
