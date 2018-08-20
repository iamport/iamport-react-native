
export const PAYMENT_INFO = [{
  name: '주문번호',
  value: 'merchant_uid',
}, {
  name: '주문명',
  value: 'name',
}, {
  name: '결제금액',
  value: 'amount',
}, {
  name: '이름',
  value: 'buyer_name',
}, {
  name: '연락처',
  value: 'buyer_tel',
}, {
  name: '이메일',
  value: 'buyer_email',
}, {
  name: '주소',
  value: 'buyer_addr',
}, {
  name: '우편번호',
  value: 'buyer_postcode',
}, {
  name: '결제 후',
  value: 'm_redirect_url'
}];

export const CERTIFICATION_INFO = [{
  name: '주문번호',
  value: 'merchant_uid',
}, {
  name: '최소나이',
  value: 'min_age',
}, {
  name: '새 창',
  value: 'popup',
}];

export const PG = {
  html5_inicis: '웹 표준 이니시스',
  kcp: 'NHN KCP',
  kcp_billing: 'NHN KCP 정기결제',
  uplus: 'LG U+',
  jtnet: 'JTNET',
  nice: '나이스 정보통신',
  kakaopay: '카카오페이',
  kakao: 'LG CNS 카카오페이',
  danal: '다날 휴대폰 소액결제',
  danal_tpay: '다날 일반결제',
  kicc: '한국 정보통신',
  paypal: '페이팔',
  mobilians: '모빌리언스 휴대폰 소액결제',
  payco: '페이코',
  settle: '세틀뱅크 가상계좌',
  naverco: '네이버 체크아웃',
  naverpay: '네이버페이',
};

export const PAY_METHOD = {
  card: '신용카드',
  vbank: '가상계좌',
  trans: '실시간 계좌이체',
  phone: '휴대폰 소액결제'
};

export const PAY_METHOD_BY_PG = {
  html5_inicis: PAY_METHOD,
  kcp: PAY_METHOD,
  kcp_billing: {
    card: '신용카드'
  },
  uplus: PAY_METHOD,
  jtnet: PAY_METHOD,
  nice: PAY_METHOD,
  kakaopay: PAY_METHOD,
  kakao: {
    card: '신용카드'
  },
  danal: {
    phone: '휴대폰 소액결제'
  },
  danal_tpay: PAY_METHOD,
  kicc: PAY_METHOD,
  paypal: {
    card: '신용카드'
  },
  mobilians: {
    phone: '휴대폰 소액결제'
  },
  payco: {
    card: '신용카드'
  },
  settle: PAY_METHOD,
  naverco: PAY_METHOD,
  naverpay: PAY_METHOD,
}
