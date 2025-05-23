namespace IMPConst {
  export const PG = [
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
    'settle_acc',
    'mobilians',
    'payco',
    'eximbay',
    'paypal',
    'naverco',
    'naverpay',
    'smilepay',
    'chai',
    'payple',
    'alipay',
    'bluewalnut',
    'tosspay',
    'smartro',
    'tosspayments',
    'ksnet',
    'daou',
    'nice_v2',
    'tosspay_v2',
    'smartro_v2',
    'kpn',
    'inicis_jp',
    'welcome',
    'paymentwall',
    'toss_brandpay',
    'hyphen',
  ] as const;

  export const PAY_METHOD = [
    'card',
    'trans',
    'vbank',
    'phone',
    'samsung',
    'kpay',
    'cultureland',
    'smartculture',
    'happymoney',
    'booknlife',
    'kakaopay',
    'lpay',
    'payco',
    'ssgpay',
    'tosspay',
    // 엑심베이 전용
    'unionpay', // 유니온페이
    'alipay', // 알리페이
    'tenpay', // 텐페이
    'wechat', // 위챗페이
    'molpay', // 몰페이
    'paysbuy', // 태국 paysbuy
  ] as const;
  export const CURRENCY = ['KRW', 'USD', 'EUR', 'JPY'] as const;
  export const LANGUAGE = ['ko', 'en'] as const;
  export const EN_AVAILABLE_PG = [
    'inicis',
    'html5_inicis',
    'uplus',
    'nice',
    'eximbay',
  ] as const;
  export const CARRIERS = ['SKT', 'KTF', 'LGT', 'MVNO'] as const;

  export const ANDROID_MARKET_PREFIX = 'market://details?id=';
  export const IOS_MARKET_PREFIX = 'https://apps.apple.com/app/';
  export const M_REDIRECT_URL = 'http://detectchangingwebview/iamport/rn';
  export const NICE_TRANS_URL =
    'https://web.nicepay.co.kr/smart/bank/payTrans.jsp';
  export const IMP_SDK_URL = 'https://service.iamport.kr';
  export const SMILEPAY_BASE_URL = 'https://www.mysmilepay.com';

  export const WEBVIEW_SOURCE_HTML = `
<html>
  <head>
    <meta http-equiv='content-type' content='text/html; charset=utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>

    <script type='text/javascript' src='https://cdn.iamport.kr/v1/iamport.js'></script>
  </head>
  <body></body>
</html>
`;

  export const ANDROID_APPSCHEME = {
    ISP: 'ispmobile',
    BANKPAY: 'kftc-bankpay',
    KB_BANKPAY: 'kb-bankpay',
    NH_BANKPAY: 'nhb-bankpay',
    MG_BANKPAY: 'mg-bankpay',
    KN_BANKPAY: 'kn-bankpay',
    KAKAOPAY: 'kakaotalk',
    SMILEPAY: 'smilepayapp',
    CHAIPAY: 'chaipayment',
    PAYCO: 'payco',
    HYUNDAICARD: 'hdcardappcardansimclick',
    TOSS: 'supertoss',
    SHINHANCARD: 'shinhan-sr-ansimclick',
    SHINHANSUPERSOL: 'smailapp',
    HANACARD: 'cloudpay',
    SAMSUNGCARD: 'mpocket.online.ansimclick',
    KBCARD: 'kb-acp',
    NHCARD: 'nhallonepayansimclick',
    CITICARD: 'citimobileapp',
    LOTTECARD: 'lotteappcard',
    LPAY: 'lpayapp',
    SSGPAY: 'shinsegaeeasypayment',
    KPAY: 'kpay',
    KBANKPAY: 'ukbanksmartbanknonloginpay',
    PAYNOW: 'lguthepay-xpay',
    WOORIWONCARD: 'com.wooricard.smartapp',
    LPOINT: 'lmslpay',
    KTFAUTH: 'ktauthexternalcall',
    LGTAUTH: 'upluscorporation',
    SKTAUTH: 'tauthlink',
    WOORIWONBANK: 'wooribank',
    KAKAOBANK: 'kakaobank',
  } as const;

  export const ANDROID_PACKAGE = {
    PACKAGE_ISP: 'kvp.jjy.MispAndroid320',
    PACKAGE_BANKPAY: 'com.kftc.bankpay.android',
    PACKAGE_KB_BANKPAY: 'com.kbstar.liivbank',
    PACKAGE_NH_BANKPAY: 'com.nh.cashcardapp',
    PACKAGE_MG_BANKPAY: 'kr.co.kfcc.mobilebank',
    PACKAGE_KN_BANKPAY: 'com.knb.psb',
    PACKAGE_KAKAOPAY: 'com.kakao.talk',
    PACKAGE_SMILEPAY: 'com.mysmilepay.app',
    PACKAGE_CHAIPAY: 'finance.chai.app',
    PACKAGE_PAYCO: 'com.nhnent.payapp',
    PACKAGE_HYUNDAICARD: 'com.hyundaicard.appcard',
    PACKAGE_TOSS: 'viva.republica.toss',
    PACKAGE_SHINHANCARD: 'com.shcard.smartpay',
    PACKAGE_SHINHANSUPERSOL: 'com.shinhan.smartcaremgr',
    PACKAGE_HANACARD: 'com.hanaskard.paycla',
    PACKAGE_SAMSUNGCARD: 'kr.co.samsungcard.mpocket',
    PACKAGE_KBCARD: 'com.kbcard.cxh.appcard',
    PACKAGE_NHCARD: 'nh.smart.nhallonepay',
    PACKAGE_CITICARD: 'kr.co.citibank.citimobile',
    PACKAGE_LOTTECARD: 'com.lcacApp',
    PACKAGE_LPAY: 'com.lotte.lpay',
    PACKAGE_SSGPAY: 'com.ssg.serviceapp.android.egiftcertificate',
    PACKAGE_KPAY: 'com.inicis.kpay',
    PACKAGE_KBANKPAY: 'com.kbankwith.smartbank',
    PACKAGE_PAYNOW: 'com.lguplus.paynow',
    PACKAGE_WOORIWONCARD: 'com.wooricard.smartapp',
    PACKAGE_LPOINT: 'com.lottemembers.android',
    PACKAGE_KTFAUTH: 'com.kt.ktauth',
    PACKAGE_LGTAUTH: 'com.lguplus.smartotp',
    PACKAGE_SKTAUTH: 'com.sktelecom.tauth',
    PACKAGE_WOORIWONBANK: 'com.wooribank.smart.npib',
    PACKAGE_KAKAOBANK: 'com.kakaobank.channel',
  } as const;
}

export { IMPConst };
