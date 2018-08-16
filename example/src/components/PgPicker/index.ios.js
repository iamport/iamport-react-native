

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

import { PG } from 'constants';
import { getPgWarningMsg } from 'utils';
import { warn, info, picker, dropdown, closeButton } from './styles';

const triangleDown = require('img/triangle-down.svg');
const closePicker = require('img/close-picker.svg');

const deviceHeight = Dimensions.get('window').height;
const marginTop = (deviceHeight - 200)/2;

class PgPicker extends React.Component {
  state = {
    visible: false,
  }

  componentDidMount() {
    const { visible } = this.props;
    this.setState({ visible });
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      this.setState({ visible }); 
    }
  }

  renderPg() {
    const { selectedValue, onPressInput } = this.props;
    const { container, text, input } = info;

    return (
      <View style={container}>
        <Text style={text}>PG사</Text>
        <TouchableOpacity 
          onPress={() => onPressInput('pgPicker', true)}
        >
          <TextInput 
            style={input}
            pointerEvents='none'
            value={PG[selectedValue]}
          />
          <SvgUri style={dropdown} source={triangleDown} />
        </TouchableOpacity>
      </View>
    );
  }

  renderWarn() {
    const { selectedValue } = this.props;
    const { container, text } = warn;

    return (
      <View style={container}>
        <Text style={text}>{getPgWarningMsg(selectedValue)}</Text>
      </View>
    );
  }

  renderPgModal() {
    const { visible } = this.state;
    const { selectedValue, onPressInput, onValueChange } = this.props;

    const items = Object.keys(PG).map((pg, key) => {
      return <PickerIOS.Item label={PG[pg]} value={pg} key={key} />;
    });

    return (
      <Modal transparent visible={visible}> 
        <TouchableOpacity 
          style={{
            ...closeButton,
            marginTop: marginTop + 10,
          }} 
          onPress={() => onPressInput('pgPicker', false)}
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
    return (
      <View>
        {this.renderPg()}
        {this.renderWarn()}
        {this.renderPgModal()}
      </View>
    );
  }
}

export default PgPicker;