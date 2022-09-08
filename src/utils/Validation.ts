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
  /**
   * @details 결제수단
   * @type card 신용카드
   * @type trans 실시간계좌이체
   * @type vbank 가상계좌
   * @type phone 휴대폰소액결제
   * @type kakaopay 이니시스, KCP, 나이스페이먼츠를 통한 카카오페이 직접 호출
   * @type payco 이니시스, KCP를 통한 페이코 직접 호출
   * @type lpay 이니시스를 통한 LPAY 직접 호출
   * @type ssgpay 이니시스를 통한 SSG페이 직접 호출
   * @type tosspay 이니시스를 통한 토스간편결제 직접 호출
   * @type point 카카오페이, PAYCO, 이니시스, 나이스페이먼츠 내 간편결제 시 해당 간편결제 자체 포인트 100% 결제
   */
  type IPayMethod =
    | 'card'
    | 'trans'
    | 'vbank'
    | 'phone'
    | 'kakaopay'
    | 'payco'
    | 'lpay'
    | 'ssgpay'
    | 'tosspay'
    | 'point';

  /**
   * @details 결제상태
   * @type ready 브라우저 창 이탈, 가상계좌 발급 완료 등 미결제 상태
   * @type paid 결제완료
   * @type failed 신용카드 한도 초과, 체크카드 잔액 부족, 브라우저 창 종료 또는 취소 버튼 클릭 등 결제실패 상태
   */
  type IStatus = 'ready' | 'paid' | 'failed';

  /**
   * @details 결제승인/시도된 PG사
   * @type html5_inicis 웹표준방식의 KG이니시스
   * @type inicis 일반 KG이니시스
   * @type kakaopay 카카오페이
   * @type uplus 토스페이먼츠(구 LG U+)
   * @type nice 나이스정보통신
   * @type jtnet JTNet
   * @type danal 다날
   */
  type IPgProvider =
    | 'html5_inicis'
    | 'inicis'
    | 'kakaopay'
    | 'uplus'
    | 'nice'
    | 'jtnet'
    | 'danal';

  type ISuccess = 'true' | 'false' | true | false;

  interface ICertificationData {
    merchant_uid: string;
    company: string;
    carrier: string;
    name: string;
    phone: string;
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
      min_age?: string,
      popup?: boolean,
      m_redirect_url?: string
    ) {
      this.carrier = carrier;
      this.company = company;
      this.merchant_uid = merchant_uid;
      this.name = name;
      this.phone = phone;
      this.min_age = min_age;
      this.popup = popup;
      this.m_redirect_url = m_redirect_url;
    }

    carrier: string;
    company: string;
    merchant_uid: string;
    name: string;
    phone: string;
    min_age?: string;
    popup?: boolean;
    m_redirect_url?: string;
  }

  interface IPaymentData {
    pg: string;
    pay_method: IPayMethod;
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
      pay_method: IPayMethod,
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
      vbank_due?: string
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
    pay_method: IPayMethod;
    pg: string;
    popup?: boolean;
    tax_free?: number;
    vbank_due?: string;
  }

  interface IPaymentResponse {
    success?: ISuccess;
    imp_success?: ISuccess;
    error_code: string;
    error_msg: string;
    imp_uid: string | null;
    merchant_uid: string;
    pay_method?: IPayMethod;
    paid_amount?: number;
    status?: IStatus;
    name?: string;
    pg_provider?: IPgProvider;
    emb_pg_provider?: string;
    pg_tid?: string;
    buyer_name?: string;
    buyer_email?: string;
    buyer_tel?: string;
    buyer_addr?: string;
    buyer_postcode?: string;
    custom_data?: object;
    paid_at?: number;
    receipt_url?: string;
  }

  export class PaymentResponse implements IPaymentResponse {
    constructor(
      error_code: string,
      error_msg: string,
      imp_uid: string | null,
      merchant_uid: string,
      success?: ISuccess,
      imp_success?: ISuccess,
      pay_method?: IPayMethod,
      paid_amount?: number,
      status?: IStatus,
      name?: string,
      pg_provider?: IPgProvider,
      emb_pg_provider?: string,
      pg_tid?: string,
      buyer_name?: string,
      buyer_email?: string,
      buyer_tel?: string,
      buyer_addr?: string,
      buyer_postcode?: string,
      custom_data?: object,
      paid_at?: number,
      receipt_url?: string
    ) {
      this.success = success;
      this.imp_success = imp_success;
      this.error_code = error_code;
      this.error_msg = error_msg;
      this.imp_uid = imp_uid;
      this.merchant_uid = merchant_uid;
      this.pay_method = pay_method;
      this.paid_amount = paid_amount;
      this.status = status;
      this.name = name;
      this.pg_provider = pg_provider;
      this.emb_pg_provider = emb_pg_provider;
      this.pg_tid = pg_tid;
      this.buyer_name = buyer_name;
      this.buyer_email = buyer_email;
      this.buyer_tel = buyer_tel;
      this.buyer_addr = buyer_addr;
      this.buyer_postcode = buyer_postcode;
      this.custom_data = custom_data;
      this.paid_at = paid_at;
      this.receipt_url = receipt_url;
    }
    success?: ISuccess;
    imp_success?: ISuccess;
    error_code: string;
    error_msg: string;
    imp_uid: string | null;
    merchant_uid: string;
    pay_method?: IPayMethod;
    paid_amount?: number;
    status?: IStatus;
    name?: string;
    pg_provider?: IPgProvider;
    emb_pg_provider?: string;
    pg_tid?: string;
    buyer_name?: string;
    buyer_email?: string;
    buyer_tel?: string;
    buyer_addr?: string;
    buyer_postcode?: string;
    custom_data?: object;
    paid_at?: number;
    receipt_url?: string;
  }
}

export { Validation, IMPData };
