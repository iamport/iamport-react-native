import React from 'react';
import * as NativeBase from 'native-base';
import styles from './styles';

const NativeBasePicker = NativeBase.Picker;
const { Item } = NativeBasePicker;

export default function Picker({ iosHeader, selectedValue, data, onValueChange }) {
  const { picker, header, headerTitle, headerBackButtonTextStyle, text } = styles;
  return (
    <NativeBasePicker
      mode="dropdown"
      style={picker}
      iosHeader={iosHeader}
      textStyle={text}
      headerStyle={header}
      headerTitleStyle={headerTitle}
      headerBackButtonText="뒤로"
      headerBackButtonTextStyle={headerBackButtonTextStyle}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      {data.map(eachData => {
        const { label, value } = eachData;
        return (
          <Item label={label} value={value} key={value} />
        );
      })}
    </NativeBasePicker>
  );
}
