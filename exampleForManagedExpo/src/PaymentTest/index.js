import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  ScrollView,
  Stack,
  Switch,
  Text,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Picker from '../Picker';
import { PGS, TIER_CODES } from '../constants';
import { getMethods, getQuotas } from '../utils';
import { IMPConst } from 'iamport-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PaymentTest({ navigation }) {
  const [pg, setPg] = useState('html5_inicis');
  const [tierCode, setTierCode] = useState(undefined);
  const [method, setMethod] = useState('card');
  const [cardQuota, setCardQuota] = useState(0);
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [name, setName] = useState('아임포트 결제데이터분석');
  const [amount, setAmount] = useState('39000');
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
      <ScrollView m={2} backgroundColor={'#fff'}>
        <FormControl p={'5%'} borderRadius={3}>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              PG사
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
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              결제수단
            </FormControl.Label>
            <Picker
              data={getMethods(pg)}
              selectedValue={method}
              onValueChange={(value) => setMethod(value)}
            />
          </Stack>
          {method === 'card' && (
            <Stack direction={'row'}>
              <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
                할부개월수
              </FormControl.Label>
              <Picker
                data={getQuotas(pg)}
                selectedValue={cardQuota}
                onValueChange={(value) => setCardQuota(parseInt(value, 10))}
              />
            </Stack>
          )}
          {method === 'vbank' && (
            <Stack direction={'row'}>
              <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
                입금기한
              </FormControl.Label>
              <Input
                mb={2}
                flex={1}
                value={vbankDue}
                onChangeText={(value) => setVbankDue(value)}
              />
            </Stack>
          )}
          {method === 'vbank' && pg === 'danal_tpay' && (
            <Stack direction={'row'}>
              <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
                사업자번호
              </FormControl.Label>
              <Input
                mb={2}
                flex={1}
                value={bizNum}
                keyboardType="number-pad"
                returnKeyType={'done'}
                onChangeText={(value) => setBizNum(value)}
              />
            </Stack>
          )}
          {method === 'phone' && (
            <Stack direction={'row'}>
              <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
                실물컨텐츠
              </FormControl.Label>
              <Switch
                mb={2}
                value={digital}
                onValueChange={(value) => setDigital(value)}
              />
            </Stack>
          )}
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              에스크로
            </FormControl.Label>
            <Switch
              mb={2}
              value={escrow}
              onValueChange={(value) => setEscrow(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              주문명
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
              결제금액
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={amount}
              keyboardType="number-pad"
              returnKeyType={'done'}
              onChangeText={(value) => setAmount(value)}
            />
          </Stack>
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
              이름
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={buyerName}
              onChangeText={(value) => setBuyerName(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              전화번호
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={buyerTel}
              keyboardType="number-pad"
              returnKeyType={'done'}
              onChangeText={(value) => setBuyerTel(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              이메일
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={buyerEmail}
              onChangeText={(value) => setBuyerEmail(value)}
            />
          </Stack>
          <Button
            bgColor={'#344e81'}
            /* @ts-ignore */
            onPress={() => {
              const data = {
                params: {
                  pg,
                  pay_method: method,
                  currency: undefined,
                  notice_url: undefined,
                  display: undefined,
                  merchant_uid: merchantUid,
                  name,
                  amount,
                  app_scheme: 'exampleformanagedexpo://',
                  tax_free: undefined,
                  buyer_name: buyerName,
                  buyer_tel: buyerTel,
                  buyer_email: buyerEmail,
                  buyer_addr: undefined,
                  buyer_postcode: undefined,
                  custom_data: undefined,
                  vbank_due: undefined,
                  popup: undefined,
                  digital: undefined,
                  language: undefined,
                  biz_num: undefined,
                  customer_uid: undefined,
                  naverPopupMode: undefined,
                  naverUseCfm: undefined,
                  naverProducts: undefined,
                  m_redirect_url: IMPConst.M_REDIRECT_URL,
                  escrow,
                },
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
            <Text fontWeight={'bold'} color={'#fff'}>
              결제하기
            </Text>
          </Button>
        </FormControl>
      </ScrollView>
    </SafeAreaView>
  );
}
