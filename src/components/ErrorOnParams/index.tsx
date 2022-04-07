import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const logo = require('../../img/iamport-logo.png');

type ErrorProps = { message: string };

function ErrorOnParams({ message }: ErrorProps) {
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    lineHeight: 25,
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
  },
});

export default ErrorOnParams;
