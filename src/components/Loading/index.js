import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const logo = require('../../img/iamport-logo.png');

function Loading() {
  const { container, contents, img, text } = styles;
  return (
    <View style={container}>
      <View style={contents}>
        <Image style={img} source={logo} />
        <Text style={text}>잠시만 기다려주세요...</Text>
      </View>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
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
    fontSize: 20,
    marginTop: 20,
    lineHeight: 25
  },
});

export default Loading;
