import { StyleSheet } from 'react-native';

const header = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    lineHeight: 20,
  },
});

const button = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -50,
    height: 100,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  module: {
    width: '45%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 1.0,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  icon: {
    color: '#333',
  },
});

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 0.5,
    position: 'relative',
    textAlign: 'center',
    backgroundColor: '#344e81',
  },
});

export {
  header,
  button,
};
