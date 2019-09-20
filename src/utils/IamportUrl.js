import queryString from 'query-string';

class IamportUrl {
  static M_REDIRECT_URL = 'http://localhost/iamport';
  static NICE_TRANS_URL = 'https://web.nicepay.co.kr/smart/bank/payTrans.jsp';

  constructor(url) {
    this.url = url;

    const [scheme, path] = url.split('://');
    this.scheme = scheme;
    this.path = path;
  }

  getUrl() {
    return this.url;
  }

  isPaymentOver() {
    return this.url.includes(IamportUrl.M_REDIRECT_URL);
  }

  isAppUrl() {
    return this.scheme !== 'http' && this.scheme !== 'https' && this.scheme !== 'about:blank';
  }

  getAppUrl() {
    return this.scheme === 'itmss' ? `https://${this.path}` :  this.url;
  }

  getMarketUrl() {
    switch (this.scheme) {
      case 'kftc-bankpay': // 뱅크페이
        return 'https://itunes.apple.com/kr/app/id398456030';
      case 'ispmobile': // ISP/페이북
        return 'https://itunes.apple.com/kr/app/id369125087';
      case 'hdcardappcardansimclick': // 현대카드 앱카드
        return 'https://itunes.apple.com/kr/app/id702653088';
      case 'shinhan-sr-ansimclick': // 신한 앱카드
        return 'https://itunes.apple.com/app/id572462317';
      case 'kb-acp': // KB국민 앱카드
        return 'https://itunes.apple.com/kr/app/id695436326';
      case 'mpocket.online.ansimclick': // 삼성앱카드
        return 'https://itunes.apple.com/kr/app/id535125356';
      case 'lottesmartpay': // 롯데 모바일결제
        return 'https://itunes.apple.com/kr/app/id668497947';
      case 'lotteappcard': // 롯데 앱카드
        return 'https://itunes.apple.com/kr/app/id688047200';
      case 'cloudpay': // 하나1Q페이(앱카드)
        return 'https://itunes.apple.com/kr/app/id847268987';
      case 'citimobileapp': // 시티은행 앱카드
        return 'https://itunes.apple.com/kr/app/id1179759666';
      case 'payco': // 페이코
        return 'https://itunes.apple.com/kr/app/id924292102';
      case 'kakaotalk': // 카카오톡
        return 'https://itunes.apple.com/kr/app/id362057947';
      case 'lpayapp': // 롯데 L.pay
        return 'https://itunes.apple.com/kr/app/id1036098908';
      case 'wooripay': // 우리페이
        return 'https://itunes.apple.com/kr/app/id1201113419';
      case 'nhallonepayansimclick': // NH농협카드 올원페이(앱카드)
        return 'https://itunes.apple.com/kr/app/id1177889176';
      case 'hanawalletmembers': // 하나카드(하나멤버스 월렛)
        return 'https://itunes.apple.com/kr/app/id1038288833';
      case 'shinsegaeeasypayment': // 신세계 SSGPAY
        return 'https://itunes.apple.com/app/id666237916';
      default:
        return this.url;
    }
  }

  getQuery() {
    const decodedUrl = decodeURIComponent(this.url);
    const extractedQuery = queryString.extract(decodedUrl);
    const query = queryString.parse(extractedQuery);
    return query;
  }

  getStringifiedQuery() {
    const decodedUrl = decodeURIComponent(this.url);
    return queryString.extract(decodedUrl);
  }
}

export default IamportUrl;