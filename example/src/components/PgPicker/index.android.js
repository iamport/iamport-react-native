

import React from 'react';
import { View, Text, Picker } from 'react-native';

import { PG } from 'constants';
import { warn, info } from './styles';
import { getPgWarningMsg } from 'utils';

class PgPicker extends React.Component {
  renderPg() {
    const items = Object.keys(PG).map((pg, key) => {
      return (
        <Picker.Item label={PG[pg]} value={pg} key={key} />
      );
    });

    const { selectedValue, onValueChange } = this.props;
    const { container, text, input } = info;

    return (
      <View style={container}>
        <Text style={text}>PG사</Text>
        <Picker
          style={input}
          selectedValue={selectedValue}
          onValueChange={onValueChange}>
          {items}
        </Picker>
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

  render() {
    return (
      <View>
        {this.renderPg()}
        {this.renderWarn()}
      </View>
    );
  }
}

export default PgPicker;