
import { StyleSheet } from 'react-native';
import * as styles from '../../styles';

const explanation = StyleSheet.create({
  container: {
    maxWidth: 400, 
    marginLeft: 'auto', 
    marginRight: 'auto',  
    paddingLeft: 30,
    paddingRight: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',  
  },
  img: {
    paddingTop: 10,
  },
  text: {
    paddingLeft: 10,
    lineHeight: 25,
  },
});

const { box, text } = styles.button;
const button = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 300,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  box: {
    ...box,
    backgroundColor: '#fff',
    width: 120,
    alignItems: 'center',
  },
  text: {
    ...text,
    color: '#00bfff', 
    marginTop: 10,
  },
});

const HomeStyles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    borderRadius: 3,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20, 
  }
});

const { title } = styles;
const { background } = HomeStyles;
export {
  title,
  background,
  explanation,
  button,
}
