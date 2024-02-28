import queryString from 'query-string';
import { Linking, Platform } from 'react-native';
import { IMPConst } from '../constants';
import type { IMPData } from 'iamport-react-native';

class IamportUrl {
  url: string;
  scheme: string;
  path?: string;
  package?: string; // Android only

  constructor(url: string) {
    this.url = url;
    this.scheme = url.split('://', 1)[0];
    let splittedUrl = [this.scheme, url.slice(this.scheme.length + 3)];
    if (Platform.OS === 'ios') {
      this.path = this.scheme.startsWith('itms')
        ? `https://${splittedUrl[1]}`
        : this.url;
    } else if (Platform.OS === 'android') {
      if (this.isAppUrl()) {
        if (this.scheme.includes('intent')) {
          let intentUrl = splittedUrl[1].split('#Intent;');
          let host = intentUrl[0];
          let args = intentUrl[1].split(';');

          if (this.scheme !== 'intent') {
            this.scheme = this.scheme.split(':')[1];
            this.path = this.scheme + '://' + host;
          }
          args.forEach((s) => {
            if (s.startsWith('scheme')) {
              let scheme = s.split('=')[1];
              this.path = scheme + '://' + host;
              this.scheme = scheme;
            } else if (s.startsWith('package')) {
              this.package = s.split('=')[1];
            }
          });
        } else {
          this.path = this.url;
        }
      } else {
        this.path = this.url;
      }
    }
  }

  getUrl() {
    return this.url;
  }

  isPaymentOver(redirectUrl: string, data?: IMPData.PaymentData) {
    if (this.url.startsWith(redirectUrl)) {
      return true;
    }

    if (data?.pay_method === 'trans') {
      const decodeUrl = decodeURIComponent(this.url);
      const parsedUrl = queryString.parse(decodeUrl);
      const scheme = data?.app_scheme;
      /**
       * [IOS] 웹 표준 이니시스 - 실시간 계좌이체 대비
       * 아래 로직대로 동작해야 최종적으로 결제가 승인된 후 콜백 함수가 호출됨
       * 1. 사파리 앱에서 복귀(app_scheme://imp_uid=%26merchant_uid=%26m_redirect_url=)
       * 2. 최종 결제 승인을 위해 이니시스가 HTTP 리퀘스트 호출
       * 3. "다음" 버튼이 있는 최종 화면으로 이동
       * 4. "다음" 버튼을 클릭
       * 5. 1번과 마찬가지로 app_scheme://imp_uid=%26merchant_uid=%26m_redirect_url=로 HTTP 리퀘스트 호출
       * 6. 콜백 함수 호출
       * 따라서 현재 handleOpenURL이 트리거 되는 사유가 1번 때문인지 5번 때문인지 구분이 필요하여
       * 이를 위한 isInicisTransPaid 플래그 추가
       */
      if (data.pg.startsWith('html5_inicis') && Platform.OS === 'ios') {
        const query = parsedUrl;
        if (
          query.m_redirect_url !== null &&
          scheme === data.app_scheme?.toLowerCase()
        ) {
          if ((query.m_redirect_url as string | null)?.includes(redirectUrl)) {
            return true;
          }
        }
      }
    }
  }

  isAppUrl() {
    return !['http', 'https', 'about:blank', 'about:srcdoc'].includes(
      this.scheme
    );
  }

  isIframeLoaded() {
    return (
      this.url !== 'about:blank' && !this.url.startsWith(IMPConst.IMP_SDK_URL)
    );
  }

  getAppUrl() {
    return this.path;
  }

  getMarketUrl() {
    if (Platform.OS === 'ios') {
      switch (this.scheme) {
        case 'kftc-bankpay': // 뱅크페이
          return IMPConst.IOS_MARKET_PREFIX + 'id398456030';
        case 'ispmobile': // ISP/페이북
          return IMPConst.IOS_MARKET_PREFIX + 'id369125087';
        case 'hdcardappcardansimclick': // 현대카드 앱카드
          return IMPConst.IOS_MARKET_PREFIX + 'id702653088';
        case 'shinhan-sr-ansimclick': // 신한 앱카드
          return IMPConst.IOS_MARKET_PREFIX + 'id572462317';
        case 'kb-acp': // KB국민 앱카드
          return IMPConst.IOS_MARKET_PREFIX + 'id695436326';
        case 'mpocket.online.ansimclick': // 삼성앱카드
          return IMPConst.IOS_MARKET_PREFIX + 'id535125356';
        case 'lottesmartpay': // 롯데 모바일결제
          return IMPConst.IOS_MARKET_PREFIX + 'id668497947';
        case 'lotteappcard': // 롯데 앱카드
          return IMPConst.IOS_MARKET_PREFIX + 'id688047200';
        case 'cloudpay': // 하나1Q페이(앱카드)
          return IMPConst.IOS_MARKET_PREFIX + 'id847268987';
        case 'citimobileapp': // 시티은행 앱카드
          return IMPConst.IOS_MARKET_PREFIX + 'id1179759666';
        case 'payco': // 페이코
          return IMPConst.IOS_MARKET_PREFIX + 'id924292102';
        case 'kakaotalk': // 카카오톡
          return IMPConst.IOS_MARKET_PREFIX + 'id362057947';
        case 'lpayapp': // 롯데 L.pay
          return IMPConst.IOS_MARKET_PREFIX + 'id1036098908';
        case 'wooripay': // 우리페이
          return IMPConst.IOS_MARKET_PREFIX + 'id1201113419';
        case 'com.wooricard.wcard': // 우리WON카드
          return IMPConst.IOS_MARKET_PREFIX + 'id1499598869';
        case 'nhallonepayansimclick': // NH농협카드 올원페이(앱카드)
          return IMPConst.IOS_MARKET_PREFIX + 'id1177889176';
        case 'hanawalletmembers': // 하나카드(하나멤버스 월렛)
          return IMPConst.IOS_MARKET_PREFIX + 'id1038288833';
        case 'shinsegaeeasypayment': // 신세계 SSGPAY
          return IMPConst.IOS_MARKET_PREFIX + 'id666237916';
        case 'naversearchthirdlogin': // 네이버페이 앱 로그인
          return IMPConst.IOS_MARKET_PREFIX + 'id393499958';
        case 'lguthepay-xpay': // 페이나우
          return IMPConst.IOS_MARKET_PREFIX + 'id760098906';
        case 'lmslpay': // 롯데 L.POINT
          return IMPConst.IOS_MARKET_PREFIX + 'id473250588';
        case 'liivbank': // Liiv 국민
          return IMPConst.IOS_MARKET_PREFIX + 'id1126232922';
        case 'supertoss': // 토스
          return IMPConst.IOS_MARKET_PREFIX + 'id839333328';
        case 'newsmartpib': // 우리WON뱅킹
          return IMPConst.IOS_MARKET_PREFIX + 'id1470181651';
        case 'ukbanksmartbanknonloginpay': // 케이뱅크 페이
          return IMPConst.IOS_MARKET_PREFIX + 'id1178872627';
        default:
          return this.url;
      }
    } else if (Platform.OS === 'android') {
      if (this.package != null) {
        return IMPConst.ANDROID_MARKET_PREFIX + this.package;
      }
      switch (this.scheme) {
        case IMPConst.ANDROID_APPSCHEME.ISP:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_ISP
          );
        case IMPConst.ANDROID_APPSCHEME.BANKPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_BANKPAY
          );
        case IMPConst.ANDROID_APPSCHEME.KB_BANKPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_KB_BANKPAY
          );
        case IMPConst.ANDROID_APPSCHEME.NH_BANKPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_NH_BANKPAY
          );
        case IMPConst.ANDROID_APPSCHEME.MG_BANKPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_MG_BANKPAY
          );
        case IMPConst.ANDROID_APPSCHEME.KN_BANKPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_KN_BANKPAY
          );
        case IMPConst.ANDROID_APPSCHEME.KAKAOPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_KAKAOPAY
          );
        case IMPConst.ANDROID_APPSCHEME.SMILEPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_SMILEPAY
          );
        case IMPConst.ANDROID_APPSCHEME.CHAIPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_CHAIPAY
          );
        case IMPConst.ANDROID_APPSCHEME.PAYCO:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_PAYCO
          );
        case IMPConst.ANDROID_APPSCHEME.HYUNDAICARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_HYUNDAICARD
          );
        case IMPConst.ANDROID_APPSCHEME.TOSS:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_TOSS
          );
        case IMPConst.ANDROID_APPSCHEME.SHINHANCARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_SHINHANCARD
          );
        case IMPConst.ANDROID_APPSCHEME.SHINHANSUPERSOL:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_SHINHANSUPERSOL
          );
        case IMPConst.ANDROID_APPSCHEME.HANACARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_HANACARD
          );
        case IMPConst.ANDROID_APPSCHEME.SAMSUNGCARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_SAMSUNGCARD
          );
        case IMPConst.ANDROID_APPSCHEME.KBCARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_KBCARD
          );
        case IMPConst.ANDROID_APPSCHEME.NHCARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_NHCARD
          );
        case IMPConst.ANDROID_APPSCHEME.CITICARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_CITICARD
          );
        case IMPConst.ANDROID_APPSCHEME.LOTTECARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_LOTTECARD
          );
        case IMPConst.ANDROID_APPSCHEME.LPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_LPAY
          );
        case IMPConst.ANDROID_APPSCHEME.SSGPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_SSGPAY
          );
        case IMPConst.ANDROID_APPSCHEME.KPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_KPAY
          );
        case IMPConst.ANDROID_APPSCHEME.KBANKPAY:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_KBANKPAY
          );
        case IMPConst.ANDROID_APPSCHEME.PAYNOW:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_PAYNOW
          );
        case IMPConst.ANDROID_APPSCHEME.WOORIWONCARD:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_WOORIWONCARD
          );
        case IMPConst.ANDROID_APPSCHEME.LPOINT:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_LPOINT
          );
        case IMPConst.ANDROID_APPSCHEME.KTFAUTH:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_KTFAUTH
          );
        case IMPConst.ANDROID_APPSCHEME.LGTAUTH:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_LGTAUTH
          );
        case IMPConst.ANDROID_APPSCHEME.SKTAUTH:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_SKTAUTH
          );
        case IMPConst.ANDROID_APPSCHEME.WOORIWONBANK:
          return (
            IMPConst.ANDROID_MARKET_PREFIX +
            IMPConst.ANDROID_PACKAGE.PACKAGE_WOORIWONBANK
          );
        default:
          return this.url;
      }
    } else {
      return this.url;
    }
  }

  getQuery() {
    return queryString.parse(this.getStringifiedQuery());
  }

  getStringifiedQuery() {
    const decodedUrl = decodeURIComponent(this.url);
    return queryString.extract(decodedUrl);
  }

  getInicisTransQuery(redirectUrl: string) {
    const { m_redirect_url, imp_uid, merchant_uid } = this.getQuery();
    const inicisTransQuery = { imp_uid, merchant_uid };
    if (m_redirect_url?.includes(redirectUrl)) {
      inicisTransQuery.merchant_uid =
        typeof merchant_uid === 'object' ? merchant_uid![0] : merchant_uid;
    } else {
      inicisTransQuery.merchant_uid = merchant_uid;
    }
    return inicisTransQuery;
  }

  async launchApp() {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      try {
        if (await Linking.canOpenURL(this.url)) {
          return await Linking.openURL(this.getAppUrl() as string);
        } else {
          return await Linking.openURL(this.getAppUrl() as string);
        }
      } catch (e) {
        return await Linking.openURL(this.getMarketUrl());
      }
    }
  }
}

export default IamportUrl;
