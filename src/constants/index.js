
const PG = [
  'html5_inicis', 
  'inicis', 
  'uplus', 
  'kcp', 
  'kcp_billing', 
  'nice', 
  'jtnet', 
  'kakao', 
  'kakaopay',
  'danal', 
  'danal_tpay', 
  'kicc',
  'settle',
  'mobilians', 
  'payco', 
  'paypal', 
  'naverco',
  'naverpay',
  'smilepay',
];

const CALLBACK_AVAILABLE_PG = ['kakao', 'danal', 'danal_tpay'];
const REDIRECT_NEEDED_PG = ['uplus'];
const PAY_METHOD = ['card', 'trans', 'vbank', 'phone', 'samsung', 'kpay', 'cultureland', 'smartculture', 'happymoney', 'booknlife'];
const CURRENCY = ['KRW', 'USD', 'EUR', 'JPY'];
const LANGUAGE = ['ko', 'en'];
const EN_AVAILABLE_PG = ['inicis', 'html5_inicis', 'uplus', 'nice'];
const MARKET_URL = {
  'shinhan-sr-ansimclick': 'https://itunes.apple.com/app/id572462317', // 신한 앱카드
  'hdcardappcardansimclick': 'https://itunes.apple.com/kr/app/id702653088', // 현대카드 앱카드
  'citimobileapp': 'https://itunes.apple.com/kr/app/id1179759666', // 시티은행 앱카드
  'shinsegaeeasypayment': 'https://itunes.apple.com/app/id666237916', // 신세계 SSGPAY
  'lpayapp': 'https://itunes.apple.com/kr/app/id1036098908', // 롯데 L.pay
  'lottesmartpay': 'https://itunes.apple.com/kr/app/id668497947', // 롯데 모바일결제
  'kpay': 'https://itunes.apple.com/app/id911636268', // Kpay
  'ispmobile': 'https://itunes.apple.com/kr/app/id369125087', // ISP/페이북
  'kb-acp': 'https://itunes.apple.com/kr/app/id695436326', // KB국민 앱카드
  'mpocket.online.ansimclick': 'https://itunes.apple.com/kr/app/id535125356', // 삼성앱카드
  'lotteappcard': 'https://itunes.apple.com/kr/app/id688047200', // 롯데 앱카드
  'nhallonepayansimclick': 'https://itunes.apple.com/kr/app/id1177889176', // NH농협카드 올원페이(앱카드)
  'cloudpay': 'https://itunes.apple.com/kr/app/id847268987', // 하나1Q페이(앱카드)
  'lguthepay': 'https://itunes.apple.com/kr/app/id760098906', // 페이나우
  'kftc-bankpay': 'https://itunes.apple.com/kr/app/id398456030', // 뱅크페이
};

export {
  PG,
  CALLBACK_AVAILABLE_PG,
  REDIRECT_NEEDED_PG,
  PAY_METHOD,
  CURRENCY,
  LANGUAGE,
  EN_AVAILABLE_PG,
  MARKET_URL
};