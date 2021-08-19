import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>잠시만 기다려주세요...</Text>
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
    fontSize: 20,
  },
});

export default Loading;
