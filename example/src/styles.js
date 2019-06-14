import { StyleSheet, Platform, StatusBar } from 'react-native';

const formStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  item: {
    marginBottom: 5,
    paddingLeft: 0,
    marginLeft: 0,
    borderBottomWidth: 0,
  },
  label: {
    width: 90,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: 3,
    height: 40,
    fontSize: 14,
    paddingLeft: 10,
  },
  radio: {
    marginTop: 5,
    marginBottom: 5,
  },
  btn: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#344e81',
  },
  btnText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
});

const resultStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 100,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    width: '90%',
    marginBottom: 50,
  },
  list: {
    borderBottomWidth: 0,
    marginTop: -10,
    marginBottom: -10,
  },
  label: {
    width: '40%',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  value: {
    width: '60%',
  },
  btn: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -20,
  },
});

const resultSuccessStyles = StyleSheet.create({
  icon: {
    ...resultStyles.icon,
    color: '#52c41a',
  },
  btn: {
    ...resultStyles.btn,
    borderColor: '#52c41a',
  },
  btnText: {
    color: '#52c41a',
  },
  btnIcon: {
    color: '#52c41a',
  },
});

const resultFailureStyles = StyleSheet.create({
  icon: {
    ...resultStyles.icon,
    color: '#f5222d',
  },
  btn: {
    ...resultStyles.btn,
    borderColor: '#f5222d',
  },
  btnText: {
    ...resultStyles.btnText,
    color: '#f5222d',
  },
  btnIcon: {
    color: '#f5222d',
  },
});

const statusBarStyles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: '#344e81',
  },
});

export {
  formStyles,
  resultStyles,
  resultSuccessStyles,
  resultFailureStyles,
  statusBarStyles,
}
