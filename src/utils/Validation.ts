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

  validateCallback() {
    if (this.callback !== undefined && typeof this.callback !== 'function') {
      this.isValid = false;
      this.message = '콜백 함수(callback)가 올바르지 않습니다.';
      return;
    }
    this.validateData();
  }

  validateData() {
    if (this.data?.popup) {
      this.isValid = false;
      this.message = '해당 모듈은 팝업을 지원하지 않습니다.';
      return;
    }
  }

  getIsValid() {
    return this.isValid;
  }

  getMessage() {
    return this.message;
  }
}

namespace IMPData {
  interface ICertificationData {
    merchant_uid: string;
    company: string;
    carrier: string;
    name: string;
    phone: string;
    pg?: string;
    min_age?: string;
    popup?: boolean;
    m_redirect_url?: string;
  }

  export class CertificationData implements ICertificationData {
    constructor(
      carrier: string,
      company: string,
      merchant_uid: string,
      name: string,
      phone: string,
      pg?: string,
      min_age?: string,
      popup?: boolean,
      m_redirect_url?: string
    ) {
      this.carrier = carrier;
      this.company = company;
      this.merchant_uid = merchant_uid;
      this.name = name;
      this.phone = phone;
      this.pg = pg;
      this.min_age = min_age;
      this.popup = popup;
      this.m_redirect_url = m_redirect_url;
    }

    carrier: string;
    company: string;
    merchant_uid: string;
    name: string;
    phone: string;
    pg?: string;
    min_age?: string;
    popup?: boolean;
    m_redirect_url?: string;
  }

  interface IPaymentData {
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
    niceMobileV2?: boolean;
    bypass?: {
      daou?: {
        PRODUCTCODE?: string;
        CASHRECEIPTFLAG: number;
      };
    };
  }

  export class PaymentData implements IPaymentData {
    constructor(
      amount: string | number,
      buyer_email: string,
      buyer_name: string,
      buyer_tel: string,
      escrow: boolean,
      merchant_uid: string,
      name: string,
      pay_method: string,
      pg: string,
      language?: string,
      naverPopupMode?: boolean,
      naverProducts?: object[],
      naverUseCfm?: string,
      niceMobileV2?: boolean,
      notice_url?: string | string[],
      m_redirect_url?: string,
      currency?: string,
      custom_data?: object,
      customer_uid?: string,
      digital?: boolean,
      display?: { card_quota: number[] },
      buyer_postcode?: string,
      app_scheme?: string,
      biz_num?: string,
      buyer_addr?: string,
      popup?: boolean,
      tax_free?: number,
      vbank_due?: string,
      bypass?: {
        daou?: {
          PRODUCTCODE?: string;
          CASHRECEIPTFLAG: number;
        };
      }
    ) {
      this.amount = amount;
      this.app_scheme = app_scheme;
      this.biz_num = biz_num;
      this.buyer_addr = buyer_addr;
      this.buyer_email = buyer_email;
      this.buyer_name = buyer_name;
      this.buyer_postcode = buyer_postcode;
      this.buyer_tel = buyer_tel;
      this.currency = currency;
      this.custom_data = custom_data;
      this.customer_uid = customer_uid;
      this.digital = digital;
      this.display = display;
      this.escrow = escrow;
      this.language = language;
      this.m_redirect_url = m_redirect_url;
      this.merchant_uid = merchant_uid;
      this.name = name;
      this.naverPopupMode = naverPopupMode;
      this.naverProducts = naverProducts;
      this.naverUseCfm = naverUseCfm;
      this.niceMobileV2 = niceMobileV2;
      this.notice_url = notice_url;
      this.pay_method = pay_method;
      this.pg = pg;
      this.popup = popup;
      this.tax_free = tax_free;
      this.vbank_due = vbank_due;
      this.bypass = bypass;
    }

    amount: string | number;
    app_scheme?: string;
    biz_num?: string;
    buyer_addr?: string;
    buyer_email: string;
    buyer_name: string;
    buyer_postcode?: string;
    buyer_tel: string;
    currency?: string;
    custom_data?: object;
    customer_uid?: string;
    digital?: boolean;
    display?: { card_quota: number[] };
    escrow: boolean;
    language?: string;
    m_redirect_url?: string;
    merchant_uid: string;
    name: string;
    naverPopupMode?: boolean;
    naverProducts?: object[];
    naverUseCfm?: string;
    niceMobileV2?: boolean = true;
    notice_url?: string | string[];
    pay_method: string;
    pg: string;
    popup?: boolean;
    tax_free?: number;
    vbank_due?: string;
    bypass?: {
      daou?: {
        PRODUCTCODE?: string;
        CASHRECEIPTFLAG: number;
      };
    };
  }
}

export { Validation, IMPData };
