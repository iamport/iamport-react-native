import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../NavigationService';
import {
  Button,
  ButtonGroup,
  Center,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: Props) {
  return (
    <View flex={1}>
      <View
        flex={1}
        position={'relative'}
        alignItems={'center'}
        bgColor={'#344e81'}
        justifyContent={'center'}
      >
        <Text
          color={'#fff'}
          fontSize={20}
          mb={10}
          fontWeight={'bold'}
          textAlign={'center'}
        >
          아임포트 테스트
        </Text>
        <Text color={'#fff'} fontSize={15} textAlign={'center'}>
          아임포트 리액트 네이티브 모듈 테스트 화면입니다.
        </Text>
        <Text color={'#fff'} fontSize={15} textAlign={'center'}>
          아래 버튼을 눌러 결제 또는 본인인증 테스트를 진행해주세요.
        </Text>
      </View>
      <View
        flex={1}
        position={'relative'}
        bottom={'0%'}
        w={'90%'}
        flexDirection={'row'}
        alignSelf={'center'}
      >
        <ButtonGroup bottom={'50%'} width={'100%'} alignSelf={'center'}>
          <Button
            h={60}
            m={'4%'}
            bgColor={'#fff'}
            borderRadius={3}
            flex={1}
            onPress={() => navigation.push('PaymentTest')}
          >
            <VStack alignItems={'center'}>
              <Center>
                <FontAwesome name={'credit-card'} size={30} />
                <Text fontSize={15}>결제 테스트</Text>
              </Center>
            </VStack>
          </Button>
          <Button
            h={60}
            m={'4%'}
            bgColor={'#fff'}
            borderRadius={3}
            flex={1}
            onPress={() => navigation.push('CertificationTest')}
          >
            <VStack alignItems={'center'}>
              <Center>
                <FontAwesome name={'user'} size={30} />
                <Text fontSize={15}>본인인증 테스트</Text>
              </Center>
            </VStack>
          </Button>
        </ButtonGroup>
      </View>
    </View>
  );
}

export default Home;
