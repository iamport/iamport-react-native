import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../NavigationService';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = StackScreenProps<RootStackParamList, 'CertificationResult'>;

function CertificationResult({ route, navigation }: Props) {
  const imp_success = route.params?.imp_success;
  const success = route.params?.success;
  const imp_uid = route.params?.imp_uid;
  const merchant_uid = route.params?.merchant_uid;
  const error_msg = route.params?.error_msg;

  const isSuccess = !(
    imp_success === 'false' ||
    imp_success === false ||
    success === 'false' ||
    success === false
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
    >
      {isSuccess ? (
        <FontAwesome name={'check-circle'} color={'#52c41a'} size={150} />
      ) : (
        <FontAwesome name={'warning'} color={'#f5222d'} size={150} />
      )}
      <Heading size={'2xl'}>
        {`본인인증에 ${isSuccess ? '성공' : '실패'}하였습니다`}
      </Heading>
      <Box>
        <VStack my={10}>
          <HStack mx={'15%'} my={10}>
            <Text w={'40%'}>아임포트 번호</Text>
            <Text w={'60%'}>{imp_uid}</Text>
          </HStack>
          {success ? (
            <HStack mx={'15%'} my={10}>
              <Text w={'40%'}>주문번호</Text>
              <Text w={'60%'}>{merchant_uid}</Text>
            </HStack>
          ) : (
            <HStack mx={'15%'} my={10}>
              <Text w={'40%'}>에러메시지</Text>
              <Text w={'60%'}>{error_msg}</Text>
            </HStack>
          )}
        </VStack>
      </Box>
      <Button size={'md'} onPress={() => navigation.navigate('Home')}>
        <ButtonIcon as={ArrowLeftIcon} />
        <ButtonText>돌아가기</ButtonText>
      </Button>
    </SafeAreaView>
  );
}

export default CertificationResult;
