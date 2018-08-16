

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
import { PG } from 'constants';
import { getPgWarningMsg } from 'utils';

const triangleDown = require('img/triangle-down.svg');
const closePicker = require('img/close-picker.svg');

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

  render() {
    const deviceHeight = Dimensions.get('window').height;
    const marginTop = (deviceHeight - 200)/2;

    const { visible } = this.state;
    const { row, text, input, picker, warnContainer, warn, dropdown, closeButton } = styles;
    const { selectedValue, onPressInput, onValueChange } = this.props;

    const items = Object.keys(PG).map((pg, key) => {
      return <PickerIOS.Item label={PG[pg]} value={pg} key={key} />;
    });
    
    return (
      <View>
        <View style={row}>
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
        <View style={warnContainer}>
          <Text style={warn}>{getPgWarningMsg(selectedValue)}</Text>
        </View>
        <Modal
          transparent
          visible={visible}
        > 
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
      </View>
    );
  }
}

export default PgPicker;