export const PGS = [
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
    label: 'LG 유플러스',
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
    label: '신 - 카카오페이',
  },
  {
    value: 'kakao',
    label: '구 - LG CNS 카카오페이',
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
    value: 'naverco',
    label: '네이버 체크아웃',
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
];

export const TIER_CODES = [
  {
    value: 'ADD',
    label: '아디다스',
  },
  {
    value: 'RBK',
    label: '리복 - 복수PG 사용중',
  },
  {
    value: 'HKT',
    label: '에어텔닷컴 렌트카 테스트',
  },
  {
    value: 'HKK',
    label: 'YES Angel',
  },
  {
    value: 'DGA',
    label: 'CAMPVR대구',
  },
  {
    value: 'SCH',
    label: 'CAMPVR광화문',
  },
  {
    value: 'SNL',
    label: '토즈_선릉점',
  },
  {
    value: '111',
    label: '여기어때',
  },
  {
    value: 'ABC',
    label: '삼성점',
  },
  {
    value: 'XYZ',
    label: '삼성점',
  },
  {
    value: '123',
    label: 'aaaaaaa',
  },
  {
    value: 'AAZ',
    label: '테스트하위가맹',
  },
  {
    value: '001',
    label: '테스트',
  },
  {
    value: 'A01',
    label: '행복쇼핑',
  },
  {
    value: 'T11',
    label: 'test11',
  },
];

export const METHODS = [
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
    label: '휴대폰 소액결제'
  },
];

export const METHODS_FOR_INICIS =
  METHODS.concat([
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

export const METHODS_FOR_UPLUS =
  METHODS.concat([
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

export const METHODS_FOR_KCP =
  METHODS.concat([
    {
      value: 'samsung',
      label: '삼성페이',
    },
  ]);

export const METHODS_FOR_MOBILIANS = [
  {
    value: 'card',
    label: '신용카드',
  },
  {
    value: 'phone',
    label: '휴대폰 소액결제',
  },
];

export const METHOD_FOR_CARD = [
  {
    value: 'card',
    label: '신용카드',
  },
];

export const METHOD_FOR_PHONE = [
  {
    value: 'phone',
    label: '휴대폰 소액결제',
  },
];

export const METHOD_FOR_VBANK = [
  {
    value: 'vbank',
    label: '가상계좌',
  },
];

export const METHOD_FOR_TRANS = [
  {
    value: 'trans',
    label: '실시간 계좌이체',
  },
];

export const QUOTAS = [
  {
    value: 0,
    label: 'PG사 기본 제공',
  },
  {
    value: 1,
    label: '일시불',
  },
];
  
export const CARRIERS = [
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
