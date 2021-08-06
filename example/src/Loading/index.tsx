import React from 'react';
import { Text, View } from 'native-base';

function Loading() {
  return (
    <View
      flex={1}
      alignItems={'center'}
      flexDir={'row'}
      justifyContent={'center'}
    >
      <View flex={1} alignItems={'center'} justifyContent={'center'}>
        <Text fontSize={20}>잠시만 기다려주세요...</Text>
      </View>
    </View>
  );
}

export default Loading;
