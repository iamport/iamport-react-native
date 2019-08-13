import Validation from './Validation';
import { LANGUAGE, EN_AVAILABLE_PG } from '../constants';

class ValidationForPayment extends Validation {
  constructor(userCode, loading, callback, data) {
    super(userCode, loading, callback, data);
  }

  validateCallback() {
    if (this.callback !== undefined && typeof this.callback !== 'function') {
      this.isValid = false;
      this.message = '콜백 함수(callback)가 올바르지 않습니다.';
      return;
    }
    this.validateData();
  }

  validateData() {
    const {
      pg,
      pay_method,
      merchant_uid,
      amount,
      buyer_tel,
      app_scheme,
      language,
      digital,
      biz_num,
      customer_uid,
      naverPopupMode,
      popup,
    } = this.data;

    if (this.data === undefined) {
      this.isValid = false;
      this.message = '결제 파라미터(data)는 필수입력입니다.';
      return;
    }

    if (merchant_uid === undefined) {
      this.isValid = false;
      this.message = '주문번호(merchant_uid)는 필수입력입니다.';
      return;
    }

    if (amount === undefined) {
      this.isValid = false;
      this.message = '결제금액(amount)은 필수입력입니다.';
      return;
    }

    if (buyer_tel === undefined) {
      this.isValid = false;
      this.message = '구매자 번호(buyer_tel)는 필수입력입니다.';
      return;
    }

    if (app_scheme === undefined) {
      this.isValid = false;
      this.message = 'app_scheme은 필수입력입니다.';
      return;
    }

    if (language && pg !== 'paypal') {
      if (EN_AVAILABLE_PG.indexOf(pg) !== -1) { 
        if (LANGUAGE.indexOf(language) !== -1) {
          this.isValid = false;
          this.message = '올바르지 않은 언어 설정입니다.\n 선택하신 PG사는 ko 또는 en 옵션을 지원합니다. ';
          return;
        } 
      } else if (language !== 'ko') {
        this.isValid = false;
        this.message = '올바르지 않은 언어 설정입니다.\n 선택하신 PG사는 ko 옵션만 지원합니다.';
        return;
      }
    }

    if (pay_method === 'phone' && digital === undefined) {
      this.isValid = false;
      this.message = '휴대폰 소액결제시 digital은 필수입력입니다.';
      return;
    }

    if (pg === 'eximbay') {
      this.isValid = false;
      this.message = '해당 모듈은 현재 엑심베이 지원을 위한 개발을 진행중입니다.';
      return;
    }

    if (pg === 'syrup') {
      this.isValid = false;
      this.message = '해당 모듈은 현재 시럽페이를 지원하지 않습니다.';
      return;
    }

    if (pg === 'paypal' && popup === true) {
      this.isValid = false;
      this.message = '해당 모듈에서 popup은\n페이팔 결제시 지원하지 않습니다.';
      return;
    }

    if ((pg === 'naverpay' || pg === 'naverco') && naverPopupMode === true) {
      this.isValid = false;
      this.message = '해당 모듈에서 popup은\n네이버 페이 결제시 지원하지 않습니다.';
      return;
    }

    if (pg === 'danal_tpay' && pay_method === 'vbank' && biz_num === undefined) {
      this.isValid = false;
      this.message = '다날-가상계좌시 biz_num은 필수입력입니다.';
      return;
    }

    if ((pg === 'kcp_billing' || pg === 'syrup' ) && customer_uid === undefined) {
      this.isValid = false;
      this.message = '정기결제시 customer_uid는 필수입력입니다.';
      return;
    }
  }
}
  
export default ValidationForPayment;
