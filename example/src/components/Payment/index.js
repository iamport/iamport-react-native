
import React from 'react';
import IMP from 'iamport-react-native';
import { View, Text } from 'react-native';

import { getUserCode } from 'utils';

class Payment extends React.Component {
  static navigationOptions = {
    title: 'Payment'
  }

  callback = (response) => {
    const { navigation } = this.props;
    navigation.push('PaymentResult', response);
  }

  render() {
    const { navigation } = this.props;
    const pg = navigation.getParam('pg');
    const pay_method = navigation.getParam('pay_method');
    let data = {
      pg,
      pay_method,
      app_scheme: 'example',
      name: navigation.getParam('name'),
      amount: navigation.getParam('amount'),
      buyer_email: navigation.getParam('buyer_email'),
      buyer_name: navigation.getParam('buyer_name'),
      buyer_tel: navigation.getParam('buyer_tel'),
      buyer_addr: navigation.getParam('buyer_addr'),
      buyer_postcode: navigation.getParam('buyer_postcode'),
      merchant_uid: navigation.getParam('merchant_uid'),
      m_redirect_url: navigation.getParam('m_redirect_url'),
      custom_data: { 'hello': 'world' }
    };

    /* 가상계좌의 경우, 입금기한 추가 */
    const vbank_due = navigation.getParam('vbank_due');
    if (pay_method === 'vbank' && vbank_due) {
      data['vbank_due'] = vbank_due;
    }

    /* 정기결제의 경우, customer_uid는 필수입력필드 */
    if (pg === 'kcp_billing') {
      data['customer_uid'] = `cuid_${new Date().getTime()}`;
    }

    /* 네이버 체크아웃 대비 */
    if (pg === 'naverco') {
      data['naverProducts'] = [{
        id: 1286,
        name: '\uae40\uce58 with icebox',
        basePrice: '10000',
        taxType: 'TAX',
        quantity: 1,
        infoUrl: 'http://demo.movingcart.kr/\uc0c1\ud488/%ea%b9%80%ec%b9%98-with-icebox',
        imageUrl: 'http://demo.movingcart.kr/wp-content/uploads/2015/08/blueberry.jpg',
        shipping: {
          groupId: '1-5',
          method: 'DELIVERY',
          baseFee: 5000,
          feeType: 'CONDITIONAL_FREE',
          feePayType: 'PREPAYED',
          feeRule: {
            freeByThreshold: 50000
          }
        }
      }, {
          id: 1287,
          name: 'just \uae40\uce58',
          basePrice: '20000',
          taxType: 'TAX',
          quantity: 1,
          infoUrl: 'http://demo.movingcart.kr/\uc0c1\ud488/just-%ea%b9%80%ec%b9%98',
          imageUrl: 'http://demo.movingcart.kr/wp-content/uploads/2015/08/fancybox.jpg',
          shipping: {
            groupId: '1-5',
            method: 'DELIVERY',
            baseFee: 3000,
            feeType: 'CONDITIONAL_FREE',
            feePayType: 'PREPAYED',
            feeRule: {
              freeByThreshold: 50000
            }
        }
      }];
    }
    
    return (
      <IMP.Payment 
        userCode={getUserCode(pg)}
        data={data}
        callback={this.callback}
        loading={{
          message: '잠시만 기다려주세요...',
          image: require('img/iamport-logo.png')
        }}
      />
    );
  }
}

export default Payment;
