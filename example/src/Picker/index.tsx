import React from 'react';
import {
  ChevronDownIcon,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';

type PickerProps = {
  data: any[];
  selectedValue: string | number | undefined;
  onValueChange?: ((value: any) => void) | undefined;
};

function Picker(props: PickerProps) {
  return (
    <Select
      mx={2}
      mb={1}
      flex={1}
      p={1}
      selectedValue={
        props.data.find(({ value }) => value === props.selectedValue)?.value
      }
      selectedLabel={
        props.data.find(({ value }) => value === props.selectedValue)?.label
      }
      onValueChange={props.onValueChange}
    >
      <SelectTrigger variant={'underlined'}>
        <SelectInput />
        <SelectIcon>
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {props.data.map((e, index) => {
            const { label, value } = e;
            return <SelectItem label={label} value={value} key={index} />;
          })}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

export default Picker;
