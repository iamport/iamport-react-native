
import { StyleSheet } from 'react-native';
import { info, CommonStyles } from 'styles';

const vbank = StyleSheet.create({
  container: {
    width: 260,
    top: 0,
    paddingRight: 10,
    left: '50%',
    marginLeft: -130,
    marginBottom: 10,
    position: 'absolute',
    zIndex: 0,
  },
  text: {
    height: 40,
    lineHeight: 40,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  }
});

const { picker, dropdown, closeButton } = CommonStyles;
export {
  vbank,
  info,
  picker,
  dropdown,
  closeButton,
}