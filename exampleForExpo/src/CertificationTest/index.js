import React, { useState } from 'react';
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

export default function CertificationTest({ navigation }) {
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [company, setCompany] = useState('아임포트');
  const [carrier, setCarrier] = useState('SKT');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [minAge, setMinAge] = useState('');
  const [tierCode, setTierCode] = useState('');

  return (
    <ScrollView>
      <FormControl>
        <Stack>
          <FormControl.Label>주문번호</FormControl.Label>
          <Input
            value={merchantUid}
            onChangeText={(value) => setMerchantUid(value)}
          />
        </Stack>
        <Stack>
          <FormControl.Label>회사명</FormControl.Label>
          <Input value={company} onChangeText={(value) => setCompany(value)} />
        </Stack>
        <Stack>
          <FormControl.Label>통신사</FormControl.Label>
          <Select
            selectedValue={carrier}
            onValueChange={(value) => setCarrier(value)}
          >
            {CARRIERS.map(({ label, value }, index) => {
              return <Select.Item label={label} value={value} key={index} />;
            })}
          </Select>
        </Stack>
        <Stack>
          <FormControl.Label>이름</FormControl.Label>
          <Input value={name} onChangeText={(value) => setName(value)} />
        </Stack>
        <Stack>
          <FormControl.Label>전화번호</FormControl.Label>
          <Input
            value={phone}
            keyboardType="number-pad"
            onChangeText={(value) => setPhone(value)}
          />
        </Stack>
        <Stack>
          <FormControl.Label>최소연령</FormControl.Label>
          <Input
            value={minAge}
            keyboardType="number-pad"
            onChangeText={(value) => setMinAge(value)}
          />
        </Stack>
        <Stack>
          <FormControl.Label>티어 코드</FormControl.Label>
          <Picker
            data={TIER_CODES}
            selectedValue={tierCode}
            onValueChange={(value) => setTierCode(value)}
          />
        </Stack>
        <Button
          onPress={() => {
            const data = {
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
          <Text>본인인증 하기</Text>
        </Button>
      </FormControl>
    </ScrollView>
  );
}
