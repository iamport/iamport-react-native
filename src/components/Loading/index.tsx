import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const logo = require('../../img/iamport-logo.png');

function Loading() {
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Text style={styles.text}>잠시만 기다려주세요...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    lineHeight: 25,
  },
});

export default Loading;
