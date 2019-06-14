import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  picker: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#ccc',
      borderRadius: 3,
      height: 40,
      width: Dimensions.get('window').width - 90 - 80,
  },
  header: {
      backgroundColor: '#344e81',
  },
  headerTitle: {
      color: '#fff',
      textAlign: 'center',
      width: '100%',
  },
  headerBackButtonTextStyle: {
      color: '#fff',
  },
  text: {
      paddingLeft: 10,
      fontSize: 14,
  },
});