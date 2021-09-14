import React, { useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { CertificationParams, RootStackParamList } from '../NavigationService';
import { Button, FormControl, Input, ScrollView, Select, Stack, Text } from 'native-base';
import Picker from '../Picker';
import { CARRIERS, TIER_CODES } from '../constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StackScreenProps<RootStackParamList, 'CertificationTest'>;

function CertificationTest({ navigation }: Props) {
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [company, setCompany] = useState('아임포트');
  const [carrier, setCarrier] = useState('SKT');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [minAge, setMinAge] = useState('');
  const [tierCode, setTierCode] = useState('');

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f5f5f5', paddingTop: -insets.top }}
    >
      <ScrollView mx={1} backgroundColor={'#fff'}>
        <FormControl p={2} borderRadius={3}>
          <Stack direction={'column'}>
            <FormControl.Label mb={0}>
              <Text color={'gray.500'} fontSize={15}>
                주문번호
              </Text>
            </FormControl.Label>
            <Input
              mx={2}
              mb={1}
              flex={1}
              p={1}
              variant={'underlined'}
              value={merchantUid}
              onChangeText={(value) => setMerchantUid(value)}
            />
          </Stack>
          <Stack direction={'column'}>
            <FormControl.Label mb={0}>
              <Text color={'gray.500'} fontSize={15}>
                회사명
              </Text>
            </FormControl.Label>
            <Input
              mx={2}
              mb={1}
              flex={1}
              p={1}
              variant={'underlined'}
              value={company}
              onChangeText={(value) => setCompany(value)}
            />
          </Stack>
          <Stack direction={'column'}>
            <FormControl.Label mb={0}>
              <Text color={'gray.500'} fontSize={15}>
                통신사
              </Text>
            </FormControl.Label>
            <Select
              mx={2}
              mb={1}
              flex={1}
              p={1}
              variant={'underlined'}
              selectedValue={carrier}
              onValueChange={(value) => setCarrier(value)}
            >
              {CARRIERS.map(({ label, value }, index) => {
                return <Select.Item label={label} value={value} key={index} />;
              })}
            </Select>
          </Stack>
          <Stack direction={'column'}>
            <FormControl.Label mb={0}>
              <Text color={'gray.500'} fontSize={15}>
                이름
              </Text>
            </FormControl.Label>
            <Input
              mx={2}
              mb={1}
              flex={1}
              p={1}
              variant={'underlined'}
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </Stack>
          <Stack direction={'column'}>
            <FormControl.Label mb={0}>
              <Text color={'gray.500'} fontSize={15}>
                전화번호
              </Text>
            </FormControl.Label>
            <Input
              mx={2}
              mb={1}
              flex={1}
              p={1}
              variant={'underlined'}
              value={phone}
              keyboardType='number-pad'
              returnKeyType={'done'}
              onChangeText={(value) => setPhone(value)}
            />
          </Stack>
          <Stack direction={'column'}>
            <FormControl.Label mb={0}>
              <Text color={'gray.500'} fontSize={15}>
                최소연령
              </Text>
            </FormControl.Label>
            <Input
              mx={2}
              mb={1}
              flex={1}
              p={1}
              variant={'underlined'}
              value={minAge}
              keyboardType='number-pad'
              returnKeyType={'done'}
              onChangeText={(value) => setMinAge(value)}
            />
          </Stack>
          <Stack direction={'column'}>
            <FormControl.Label mb={0}>
              <Text color={'gray.500'} fontSize={15}>
                티어 코드
              </Text>
            </FormControl.Label>
            <Picker
              data={TIER_CODES}
              selectedValue={tierCode}
              onValueChange={(value) => setTierCode(value)}
            />
          </Stack>
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
                  min_age: minAge,
                },
                tierCode,
              };
              navigation.navigate('Certification', data);
            }}
          >
            <Text fontWeight={'bold'} color={'#fff'}>
              본인인증 하기
            </Text>
          </Button>
        </FormControl>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CertificationTest;
