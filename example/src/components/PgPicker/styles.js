
import { StyleSheet } from 'react-native';
import { info } from 'styles';

const warn = StyleSheet.create({
  container: {
    width: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 60,
    marginBottom: 10,
  },
  text: {
    color: '#fa5f60',
    fontSize: 12
  }
});

export {
  warn,	
  info,
}