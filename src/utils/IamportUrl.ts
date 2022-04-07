import queryString from 'query-string';
import { Linking, Platform } from 'react-native';
import { IMPConst } from '../constants';

class IamportUrl {
  url: string;
  scheme: string;
  path?: string;
  package?: string; // Android only

  constructor(url: string) {
    this.url = url;
    let splittedUrl = url.replace('://', ' ').split(' ');
    this.scheme = splittedUrl[0];
    if (Platform.OS === 'ios') {
      this.path =
        this.scheme === 'itmss' ? `https://${splittedUrl[1]}` : this.url;
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

  isPaymentOver() {
    return this.url.includes(IMPConst.M_REDIRECT_URL);
  }

  isAppUrl() {
    return !['http', 'https', 'about:blank'].includes(this.scheme);
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

  getInicisTransQuery() {
    const { m_redirect_url, imp_uid, merchant_uid } = this.getQuery();
    const inicisTransQuery = {
      imp_uid: imp_uid,
      merchant_uid,
    };
    if (m_redirect_url?.includes(IMPConst.M_REDIRECT_URL)) {
      inicisTransQuery.merchant_uid =
        typeof merchant_uid === 'object' ? merchant_uid![0] : merchant_uid;
    } else {
      inicisTransQuery.merchant_uid = merchant_uid;
    }
    return queryString.stringify(inicisTransQuery);
  }

  async launchApp() {
    if (Platform.OS === 'ios') {
      if (await Linking.canOpenURL(this.url)) {
        return await Linking.openURL(this.getAppUrl() as string);
      }
      try {
        return await Linking.openURL(this.getAppUrl() as string);
      } catch (e) {
        return await Linking.openURL(this.getMarketUrl());
      }
    } else if (Platform.OS === 'android') {
      try {
        return await Linking.openURL(this.getAppUrl() as string);
      } catch (e) {
        return await Linking.openURL(this.getMarketUrl());
      }
    }
  }
}

export default IamportUrl;
