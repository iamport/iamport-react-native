import React, { useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type {
  CertificationParams,
  RootStackParamList,
} from '../NavigationService';
import { CARRIERS, CERT_PGS } from '../constants';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { IMPConst } from 'iamport-react-native';
import { Platform } from 'react-native';
import {
  Button,
  ButtonText,
  FormControl,
  Input,
  InputField,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import Picker from '../Picker';

type Props = StackScreenProps<RootStackParamList, 'CertificationTest'>;

function CertificationTest({ navigation }: Props) {
  const [userCode, setUserCode] = useState('');
  const [pg, setPg] = useState('danal');
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [company, setCompany] = useState('아임포트');
  const [carrier, setCarrier] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [minAge, setMinAge] = useState('');
  const [tierCode, setTierCode] = useState('');

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: -insets.top,
      }}
    >
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 95 : undefined}
      >
        <ScrollView mx={1} backgroundColor={'#fff'}>
          <FormControl p={2} borderRadius={3}>
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  가맹점 식별코드
                </Text>
              </FormControl.Label>
              <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                <InputField
                  value={userCode}
                  onChangeText={(value) => setUserCode(value)}
                />
              </Input>
            </VStack>
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  PG사
                </Text>
              </FormControl.Label>
              <Picker
                data={CERT_PGS}
                selectedValue={pg}
                onValueChange={(value) => setPg(value)}
              />
            </VStack>
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  주문번호
                </Text>
              </FormControl.Label>
              <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                <InputField
                  value={merchantUid}
                  onChangeText={(value) => setMerchantUid(value)}
                />
              </Input>
            </VStack>
            {pg === 'danal' && (
              <>
                <VStack>
                  <FormControl.Label my={1}>
                    <Text color={'#9e9e9e'} fontSize={15}>
                      회사명
                    </Text>
                  </FormControl.Label>
                  <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                    <InputField
                      value={company}
                      onChangeText={(value) => setCompany(value)}
                    />
                  </Input>
                </VStack>
                <VStack>
                  <FormControl.Label my={1}>
                    <Text color={'#9e9e9e'} fontSize={15}>
                      통신사
                    </Text>
                  </FormControl.Label>
                  <Picker
                    data={CARRIERS}
                    selectedValue={carrier}
                    onValueChange={(value) => setCarrier(value)}
                  />
                </VStack>
                <VStack>
                  <FormControl.Label my={1}>
                    <Text color={'#9e9e9e'} fontSize={15}>
                      이름
                    </Text>
                  </FormControl.Label>
                  <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                    <InputField
                      value={name}
                      onChangeText={(value) => setName(value)}
                    />
                  </Input>
                </VStack>
                <VStack>
                  <FormControl.Label my={1}>
                    <Text color={'#9e9e9e'} fontSize={15}>
                      전화번호
                    </Text>
                  </FormControl.Label>
                  <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                    <InputField
                      keyboardType="number-pad"
                      returnKeyType={'done'}
                      value={phone}
                      onChangeText={(value) => setPhone(value)}
                    />
                  </Input>
                </VStack>
                <VStack>
                  <FormControl.Label my={1}>
                    <Text color={'#9e9e9e'} fontSize={15}>
                      최소연령
                    </Text>
                  </FormControl.Label>
                  <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                    <InputField
                      keyboardType="number-pad"
                      returnKeyType={'done'}
                      value={minAge}
                      onChangeText={(value) => setMinAge(value)}
                    />
                  </Input>
                </VStack>
              </>
            )}
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  티어 코드
                </Text>
              </FormControl.Label>
              <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                <InputField
                  value={tierCode}
                  onChangeText={(value) => setTierCode(value)}
                />
              </Input>
            </VStack>
            <Button
              mt={4}
              bgColor={'#344e81'}
              /* @ts-ignore */
              onPress={() => {
                const data: CertificationParams = {
                  params: {
                    merchant_uid: merchantUid,
                    company,
                    carrier,
                    name,
                    phone,
                    pg,
                    min_age: minAge,
                    m_redirect_url: IMPConst.M_REDIRECT_URL,
                  },
                  userCode,
                  tierCode,
                };
                navigation.navigate('Certification', data);
              }}
            >
              <ButtonText fontWeight={'bold'} color={'#fff'}>
                본인인증 하기
              </ButtonText>
            </Button>
          </FormControl>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CertificationTest;
