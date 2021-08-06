import React from 'react';
import { Select } from 'native-base';

export default function Picker(props) {
  return (
    <Select
      selectedValue={props.selectedValue}
      onValueChange={props.onValueChange}
    >
      {props.data.map((e, index) => {
        const { label, value } = e;
        return <Select.Item label={label} value={value} key={index} />;
      })}
    </Select>
  );
}
