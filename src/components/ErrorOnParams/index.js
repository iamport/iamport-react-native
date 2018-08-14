
import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';

class ErrorOnParams extends React.Component {
  onPressGoBack = () => {
    const { appScheme } = this.props;

    window.location.href = appScheme + '://';
  }

  render() {
    const { container, img, text, button } = styles;

    return (
      <View style={container}>
        <Image style={img} source={require('../../img/iamport-logo.png')} />
        <Text style={text}>{message}</Text>
        <TouchableOpacity 
          style={button}
          onPress={this.onPressGoBack} 
        >
          <Text>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 14,
    marginTop: 20,
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
