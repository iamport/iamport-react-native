

import React from 'react';
import { 
  View,
  Text,
  Picker,
} from 'react-native';

import { styles } from '../../styles';
import { PG } from '../../constants';
import { getPgWarningMsg } from '../../utils';

class PgPicker extends React.Component {
  render() {
    const { row, text, input, warnContainer, warn } = styles;
    const { selectedValue, onValueChange } = this.props;

    const items = Object.keys(PG).map((pg, key) => {
      return (
        <Picker.Item label={PG[pg]} value={pg} key={key} />
      );
    });
    
    return (
      <View>
        <View style={row}>
          <Text style={text}>PG사</Text>
          <Picker
            style={input}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
            {items}
          </Picker>
        </View>
        <View style={warnContainer}>
          <Text style={warn}>{getPgWarningMsg(selectedValue)}</Text>
        </View>
      </View>
    );
  }
}

export default PgPicker;