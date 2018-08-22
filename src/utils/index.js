
import { 
  LANGUAGE,
  EN_AVAILABLE_PG 
} from '../constants';

export function validateProps(userCode, data) {
	if (!userCode) {
    return { validate: false, message: '가맹점 식별코드(userCode)는 필수입력입니다.' };
  } 
  if (typeof data === 'undefined') {
    return { validate: false, message: '결제 파라미터(data)는 필수입력입니다.' };
  }

  const { pg, pay_method, merchant_uid, amount, buyer_tel, app_scheme, language, digital, m_redirect_url, biz_num, customer_uid, naverPopupMode, popup } = data;
  if (!merchant_uid) {
    return { validate: false, message: '주문번호(merchant_uid)는 필수입력입니다.' };
  }
  if (!amount) {
    return { validate: false, message: '결제금액(amount)은 필수입력입니다.' };
  }
  if (!buyer_tel) {
    return { validate: false, message: '구매자 번호(buyer_tel)는 필수입력입니다.' };
  }
  if (!app_scheme) {
    return { validate: false, message: 'app_scheme은 필수입력입니다.' };
  }
  if (language && pg !== 'paypal') {
    if (EN_AVAILABLE_PG.indexOf(pg) !== -1) { 
      if (LANGUAGE.indexOf(language) !== -1) {
        return { validate: false, message: '올바르지 않은 언어 설정입니다.\n 선택하신 PG사는 ko 또는 en 옵션을 지원합니다. ' };    
      } 
    } else if (language !== 'ko') {
      return { validate: false, message: '올바르지 않은 언어 설정입니다.\n 선택하신 PG사는 ko 옵션만 지원합니다.' };    
    }
  }
  if (pay_method === 'phone' && typeof digital === 'undefined') {
    return { validate: false, message: '휴대폰 소액결제시 digital은 필수입력입니다.' };
  }
  if (pg === 'eximbay') {
    return { validate: false, message: '해당 모듈은 현재 엑심베이 지원을 위한 개발을 진행중입니다.' };
  }
  if (pg === 'syrup') {
    return { validate: false, message: '해당 모듈은 현재 시럽페이를 지원하지 않습니다.' };
  }
  if (pg === 'paypal') {
    if (popup === true) {
      return { validate: false, message: '해당 모듈에서 popup은\n페이팔 결제시 지원하지 않습니다.' };
    }
    if (!m_redirect_url) {
      return { validate: false, message: '해당 모듈에서 m_redirect_url은\n페이팔 결제시 필수입력입니다.' };
    }
  }
  if (pg === 'naverpay' || pg === 'naverco') {
    if (naverPopupMode === true) {
      return { validate: false, message: '해당 모듈에서 popup은\n네이버 페이 결제시 지원하지 않습니다.' };
    }
    if (!m_redirect_url) {
      return { validate: false, message: '해당 모듈에서 m_redirect_url은\n네이버 페이 결제시 필수입력입니다.' };
    }
  }
  if (pg === 'danal_tpay' && pay_method === 'vbank' && !biz_num) {
    return { validate: false, message: '다날-가상계좌시 biz_num은 필수입력입니다.' };
  }
  if ((pg === 'kcp_billing' || pg === 'syrup' ) && !customer_uid) {
    return { validate: false, message: '정기결제시 customer_uid는 필수입력입니다.' };
  }
  
  return { validate: true, message: '' };
}