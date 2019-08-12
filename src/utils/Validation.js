class Validation {
  constructor(userCode, loading, callback, data) {
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

  }

  validateData() {

  }

  getIsValid() {
    return this.isValid;
  }

  getMessage() {
    return this.message;
  }
}

export default Validation;