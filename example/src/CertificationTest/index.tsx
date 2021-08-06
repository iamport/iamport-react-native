import React, { useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type {
  CertificationParams,
  RootStackParamList,
} from '../NavigationService';
import {
  Button,
  FormControl,
  Input,
  ScrollView,
  Select,
  Stack,
  Text,
} from 'native-base';
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
      <ScrollView m={2} backgroundColor={'#fff'}>
        <FormControl p={'5%'} borderRadius={3}>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              주문번호
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={merchantUid}
              onChangeText={(value) => setMerchantUid(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              회사명
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={company}
              onChangeText={(value) => setCompany(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              통신사
            </FormControl.Label>
            <Select
              mb={2}
              flex={1}
              borderColor={'transparent'}
              selectedValue={carrier}
              onValueChange={(value) => setCarrier(value)}
            >
              {CARRIERS.map(({ label, value }, index) => {
                return <Select.Item label={label} value={value} key={index} />;
              })}
            </Select>
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              이름
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              전화번호
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={phone}
              keyboardType="number-pad"
              returnKeyType={'done'}
              onChangeText={(value) => setPhone(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              최소연령
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={minAge}
              keyboardType="number-pad"
              returnKeyType={'done'}
              onChangeText={(value) => setMinAge(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              티어 코드
            </FormControl.Label>
            <Picker
              data={TIER_CODES}
              selectedValue={tierCode}
              onValueChange={(value) => setTierCode(value)}
            />
          </Stack>
          <Button
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
