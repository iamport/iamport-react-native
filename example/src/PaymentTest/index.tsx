import React, { useState } from 'react';
import { PGS } from '../constants';
import { getMethods, getQuotas } from '../utils';
import type { StackScreenProps } from '@react-navigation/stack';
import type { PaymentParams, RootStackParamList } from '../NavigationService';
import { IMPConst } from 'iamport-react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import {
  Button,
  ButtonText,
  FormControl,
  Input,
  InputField,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import Picker from '../Picker';

type Props = StackScreenProps<RootStackParamList, 'PaymentTest'>;

function PaymentTest({ navigation }: Props) {
  const [userCode, setUserCode] = useState('');
  const [pg, setPg] = useState('html5_inicis');
  const [tierCode, setTierCode] = useState('');
  const [method, setMethod] = useState('card');
  const [cardQuota, setCardQuota] = useState(0);
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [name, setName] = useState('아임포트 결제데이터분석');
  const [amount, setAmount] = useState('1000');
  const [buyerName, setBuyerName] = useState('홍길동');
  const [buyerTel, setBuyerTel] = useState('01012341234');
  const [buyerEmail, setBuyerEmail] = useState('example@example.com');
  const [vbankDue, setVbankDue] = useState('');
  const [bizNum, setBizNum] = useState('');
  const [escrow, setEscrow] = useState(false);
  const [digital, setDigital] = useState(false);

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
                data={PGS}
                selectedValue={pg}
                onValueChange={(value) => {
                  setPg(value);
                  const methods = getMethods(value);
                  setMethod(methods[0].value);
                }}
              />
            </VStack>
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
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  결제수단
                </Text>
              </FormControl.Label>
              <Picker
                data={getMethods(pg)}
                selectedValue={method}
                onValueChange={(value) => setMethod(value)}
              />
            </VStack>
            {method === 'card' && (
              <VStack>
                <FormControl.Label my={1}>
                  <Text color={'#9e9e9e'} fontSize={15}>
                    할부개월수
                  </Text>
                </FormControl.Label>
                <Picker
                  data={getQuotas(pg)}
                  selectedValue={cardQuota}
                  onValueChange={(value) => setCardQuota(parseInt(value, 10))}
                />
              </VStack>
            )}
            {method === 'vbank' && (
              <VStack>
                <FormControl.Label my={1}>
                  <Text color={'#9e9e9e'} fontSize={15}>
                    입금기한
                  </Text>
                </FormControl.Label>
                <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                  <InputField
                    value={vbankDue}
                    onChangeText={(value) => setVbankDue(value)}
                  />
                </Input>
              </VStack>
            )}
            {method === 'vbank' && pg === 'danal_tpay' && (
              <VStack>
                <FormControl.Label my={1}>
                  <Text color={'#9e9e9e'} fontSize={15}>
                    사업자번호
                  </Text>
                </FormControl.Label>
                <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                  <InputField
                    keyboardType="number-pad"
                    returnKeyType={'done'}
                    value={bizNum}
                    onChangeText={(value) => setBizNum(value)}
                  />
                </Input>
              </VStack>
            )}
            {method === 'phone' && (
              <VStack>
                <FormControl.Label my={1}>
                  <Text color={'#9e9e9e'} fontSize={15}>
                    실물컨텐츠
                  </Text>
                </FormControl.Label>
                <Switch
                  mx={2}
                  mb={1}
                  p={1}
                  value={digital}
                  alignSelf={'flex-start'}
                  onValueChange={(value) => setDigital(value)}
                />
              </VStack>
            )}
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  에스크로
                </Text>
              </FormControl.Label>
              <Switch
                mx={2}
                mb={1}
                p={1}
                value={escrow}
                alignSelf={'flex-start'}
                onValueChange={(value) => setEscrow(value)}
              />
            </VStack>
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  주문명
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
                  결제금액
                </Text>
              </FormControl.Label>
              <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                <InputField
                  keyboardType="number-pad"
                  returnKeyType={'done'}
                  value={amount}
                  onChangeText={(value) => setAmount(value)}
                />
              </Input>
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
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  이름
                </Text>
              </FormControl.Label>
              <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                <InputField
                  value={buyerName}
                  onChangeText={(value) => setBuyerName(value)}
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
                  value={buyerTel}
                  onChangeText={(value) => setBuyerTel(value)}
                />
              </Input>
            </VStack>
            <VStack>
              <FormControl.Label my={1}>
                <Text color={'#9e9e9e'} fontSize={15}>
                  이메일
                </Text>
              </FormControl.Label>
              <Input mx={2} mb={1} flex={1} p={1} variant={'underlined'}>
                <InputField
                  value={buyerEmail}
                  onChangeText={(value) => setBuyerEmail(value)}
                />
              </Input>
            </VStack>
            <Button
              bgColor={'#344e81'}
              mt={4}
              /* @ts-ignore */
              onPress={() => {
                const data: PaymentParams = {
                  params: {
                    pg,
                    pay_method: method,
                    currency: undefined,
                    notice_url: undefined,
                    display: undefined,
                    merchant_uid: merchantUid,
                    name,
                    amount,
                    app_scheme: 'exampleforrn',
                    tax_free: undefined,
                    buyer_name: buyerName,
                    buyer_tel: buyerTel,
                    buyer_email: buyerEmail,
                    buyer_addr: undefined,
                    buyer_postcode: undefined,
                    custom_data: undefined,
                    vbank_due: undefined,
                    digital: undefined,
                    language: undefined,
                    biz_num: undefined,
                    customer_uid: undefined,
                    naverPopupMode: undefined,
                    naverUseCfm: undefined,
                    naverProducts: undefined,
                    m_redirect_url: IMPConst.M_REDIRECT_URL,
                    niceMobileV2: true,
                    escrow,
                  },
                  userCode,
                  tierCode,
                };

                // 신용카드의 경우, 할부기한 추가
                if (method === 'card' && cardQuota !== 0) {
                  data.params.display = {
                    card_quota: cardQuota === 1 ? [] : [cardQuota],
                  };
                }

                // 가상계좌의 경우, 입금기한 추가
                if (method === 'vbank' && vbankDue) {
                  data.params.vbank_due = vbankDue;
                }

                // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
                if (method === 'vbank' && pg === 'danal_tpay') {
                  data.params.biz_num = bizNum;
                }

                // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
                if (method === 'phone') {
                  data.params.digital = digital;
                }

                // 정기결제의 경우, customer_uid 추가
                if (pg === 'kcp_billing') {
                  data.params.customer_uid = `cuid_${new Date().getTime()}`;
                }

                if (pg === 'naverpay') {
                  const today = new Date();
                  const oneMonthLater = new Date(
                    today.setMonth(today.getMonth() + 1)
                  );
                  const dd = String(oneMonthLater.getDate()).padStart(2, '0');
                  const mm = String(oneMonthLater.getMonth() + 1).padStart(
                    2,
                    '0'
                  ); // January is 0!
                  const yyyy = oneMonthLater.getFullYear();

                  data.params.naverPopupMode = false;
                  data.params.naverUseCfm = `${yyyy}${mm}${dd}`;
                  data.params.naverProducts = [
                    {
                      categoryType: 'BOOK',
                      categoryId: 'GENERAL',
                      uid: '107922211',
                      name: '한국사',
                      payReferrer: 'NAVER_BOOK',
                      count: 10,
                    },
                  ];
                }

                navigation.navigate('Payment', data);
              }}
            >
              <ButtonText fontWeight={'bold'} color={'#fff'}>
                결제하기
              </ButtonText>
            </Button>
          </FormControl>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default PaymentTest;
