const PGS = [
  {
    value: 'html5_inicis',
    label: '웹 표준 이니시스',
  },
  {
    value: 'kcp',
    label: 'NHN KCP',
  },
  {
    value: 'kcp_billing',
    label: 'NHN KCP 정기결제',
  },
  {
    value: 'uplus',
    label: '토스페이먼츠',
  },
  {
    value: 'jtnet',
    label: 'JTNET',
  },
  {
    value: 'nice',
    label: '나이스 정보통신',
  },
  {
    value: 'kakaopay',
    label: '카카오페이',
  },
  {
    value: 'danal',
    label: '다날 휴대폰 소액결제',
  },
  {
    value: 'danal_tpay',
    label: '다날 일반결제',
  },
  {
    value: 'kicc',
    label: '한국정보통신',
  },
  {
    value: 'paypal',
    label: '페이팔',
  },
  {
    value: 'mobilians',
    label: '모빌리언스',
  },
  {
    value: 'payco',
    label: '페이코',
  },
  {
    value: 'eximbay',
    label: '엑심베이',
  },
  {
    value: 'settle',
    label: '세틀뱅크 가상계좌',
  },
  {
    value: 'naverpay',
    label: '네이버페이',
  },
  {
    value: 'smilepay',
    label: '스마일페이',
  },
  {
    value: 'chai',
    label: '차이페이',
  },
  {
    value: 'payple',
    label: '페이플',
  },
  {
    value: 'alipay',
    label: '알리페이',
  },
  {
    value: 'bluewalnut',
    label: '블루월넛',
  },
  {
    value: 'tosspay',
    label: '토스 간편결제',
  },
  {
    value: 'smartro',
    label: '스마트로',
  },
  {
    value: 'tosspayments',
    label: '토스페이먼츠 (신모듈)',
  },
  {
    value: 'ksnet',
    label: 'KSNET',
  },
  {
    value: 'daou',
    label: '키움페이 (다우데이터, 페이조아)',
  },
  {
    value: 'nice_v2',
    label: '(신) 나이스페이먼츠',
  },
];

const CERT_PGS = [
  {
    value: 'danal',
    label: '다날 휴대폰 본인인증',
  },
  {
    value: 'inicis_unified',
    label: '이니시스 통합인증',
  },
];

const METHODS = [
  {
    value: 'card',
    label: '신용카드',
  },
  {
    value: 'vbank',
    label: '가상계좌',
  },
  {
    value: 'trans',
    label: '실시간 계좌이체',
  },
  {
    value: 'phone',
    label: '휴대폰 소액결제',
  },
];

const METHODS_FOR_INICIS = METHODS.concat([
  {
    value: 'samsung',
    label: '삼성페이',
  },
  {
    value: 'kapy',
    label: 'KPAY',
  },
  {
    value: 'cultureland',
    label: '문화상품권',
  },
  {
    value: 'smartculture',
    label: '스마트문상',
  },
  {
    value: 'happymoney',
    label: '해피머니',
  },
]);

const METHODS_FOR_UPLUS = METHODS.concat([
  {
    value: 'cultureland',
    label: '문화상품권',
  },
  {
    value: 'smartculture',
    label: '스마트문상',
  },
  {
    value: 'booknlife',
    label: '도서상품권',
  },
]);

const METHODS_FOR_KCP = METHODS.concat([
  {
    value: 'samsung',
    label: '삼성페이',
  },
]);

const METHODS_FOR_MOBILIANS = [
  {
    value: 'card',
    label: '신용카드',
  },
  {
    value: 'phone',
    label: '휴대폰 소액결제',
  },
];

const METHOD_FOR_CARD = [
  {
    value: 'card',
    label: '신용카드',
  },
];

const METHOD_FOR_PHONE = [
  {
    value: 'phone',
    label: '휴대폰 소액결제',
  },
];

const METHOD_FOR_VBANK = [
  {
    value: 'vbank',
    label: '가상계좌',
  },
];

const METHOD_FOR_TRANS = [
  {
    value: 'trans',
    label: '실시간 계좌이체',
  },
];

const QUOTAS = [
  {
    value: 0,
    label: 'PG사 기본 제공',
  },
  {
    value: 1,
    label: '일시불',
  },
];

const CARRIERS = [
  {
    value: '',
    label: '선택 안함',
  },
  {
    value: 'SKT',
    label: 'SKT',
  },
  {
    value: 'KTF',
    label: 'KT',
  },
  {
    value: 'LGT',
    label: 'LGU+',
  },
  {
    value: 'MVNO',
    label: '알뜰폰',
  },
];

export {
  PGS,
  CERT_PGS,
  METHODS,
  METHODS_FOR_INICIS,
  METHODS_FOR_UPLUS,
  METHODS_FOR_KCP,
  METHODS_FOR_MOBILIANS,
  METHOD_FOR_CARD,
  METHOD_FOR_PHONE,
  METHOD_FOR_VBANK,
  METHOD_FOR_TRANS,
  QUOTAS,
  CARRIERS,
};
