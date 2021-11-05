class Validation {
  userCode: string;
  loading: object;
  callback: ((response: any) => any) | undefined;
  data: IMPData.CertificationData | IMPData.PaymentData | undefined;
  isValid: boolean;
  message: string;

  constructor(
    userCode: string,
    loading: object,
    callback?: (response: any) => any,
    data?: IMPData.CertificationData | IMPData.PaymentData
  ) {
    this.userCode = userCode;
    this.loading = loading;
    this.callback = callback;
    this.data = data;

    this.isValid = true;
    this.message = '';

    this.validateUserCode();
  }

  validateUserCode() {
    if (!this.userCode) {
      this.isValid = false;
      this.message = '가맹점 식별코드(userCode)는 필수입력입니다.';
      return;
    }
    this.validateLoading();
  }

  validateLoading() {
    if (this.loading !== undefined && typeof this.loading !== 'object') {
      this.isValid = false;
      this.message = '로딩(loading) 컴포넌트가 올바르지 않습니다.';
      return;
    }
    this.validateCallback();
  }

  validateCallback() {}

  validateData() {}

  getIsValid() {
    return this.isValid;
  }

  getMessage() {
    return this.message;
  }
}

namespace IMPData {
  export interface CertificationData {
    merchant_uid: string;
    company: string;
    carrier: string;
    name: string;
    phone: string;
    min_age?: string;
    m_redirect_url?: string;
  }

  export interface PaymentData {
    pg: string;
    pay_method: string;
    currency?: string;
    notice_url?: string | string[];
    display?: {
      card_quota: number[];
    };
    merchant_uid: string;
    amount: string | number;
    buyer_tel: string;
    app_scheme?: string;
    escrow: boolean;
    name: string;
    tax_free?: number;
    buyer_name: string;
    buyer_email: string;
    buyer_addr?: string;
    buyer_postcode?: string;
    custom_data?: object;
    vbank_due?: string;
    popup?: boolean;
    digital?: boolean;
    language?: string;
    biz_num?: string;
    customer_uid?: string;
    naverPopupMode?: boolean;
    naverUseCfm?: string;
    naverProducts?: object[];
    m_redirect_url?: string;
  }
}

export { Validation, IMPData };
