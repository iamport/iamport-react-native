
import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, 
  Image, 
  Text, 
  // TouchableOpacity, 
  StyleSheet, 
} from 'react-native';

const logo = require('../../img/iamport-logo.png');

function ErrorOnParams({ message }) {
  const { container, contents, img, text/*, button*/ } = styles;
  return (
    <View style={container}>
      <View style={contents}>
        <Image style={img} source={logo} />
        <Text style={text}>{message}</Text>
        {/*<TouchableOpacity 
          style={button}
          onPress={} 
        >
          <Text>돌아가기</Text>
        </TouchableOpacity>*/}
      </View>
    </View>
  );
}

ErrorOnParams.propTypes = {
  message: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 25
  },
  button: {
    backgroundColor: '#fff',
    color: '#ff0000',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    marginTop: 20,
    fontWeight: 'bold',
  }
});

export default ErrorOnParams;
