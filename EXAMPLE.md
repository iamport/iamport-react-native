# iamport-react-native
[ ![alt text](https://img.shields.io/badge/react-v16.4.2-orange.svg?longCache=true&style=flat-square) ](https://github.com/facebook/react/)
[ ![alt text](https://img.shields.io/badge/react--native-v0.41.2-yellow.svg?longCache=true&style=flat-square) ](https://github.com/facebook/react-native)
[ ![alt text](https://img.shields.io/badge/query--string-v6.1.0-green.svg?longCache=true&style=flat-square) ](https://github.com/sindresorhus/query-string)

리액트 네이티브용 아임포트 결제연동 모듈 예제 안내입니다.

## 예제 프로젝트
#### IOS
##### 1. 디바이스
  - [XCode를 설치](https://developer.apple.com/xcode)합니다.
  - IOS 디바이스를 컴퓨터에 연결합니다.
  - XCode 프로젝트(`[...]/node_modules/iamport-react-native/example/ios/example.xcodeproj`)를 더블클릭해 오픈합니다.
  - `Cmd+R`를 눌러 앱을 빌드합니다.
  - 빌드가 성공하고 디바이스에 example 앱이 설치된 것을 확인하실 수 있습니다.

##### 2. Emulator
  - 아래 명령어를 입력해 IOS emulator를 실행시켜 아임포트 모듈 결제테스트를 진행하실 수 있습니다.
  ```
  $ cd [...]/node_modules/iamport-react-native/example
  $ npm install
  $ react-native run-ios
  ```

#### 안드로이드
##### 1. 디바이스
  - 안드로이드 디바이스를 컴퓨터에 연결합니다.
  - 아래 명령어를 입력해 앱을 빌드합니다.
    ```
    $ cd [...]/node_modules/iamport-react-native/example
    $ npm install
    $ react-native run-android
    ```
  - 빌드가 성공하고 example 앱이 디바이스에 설치된 것을 확인하실 수 있습니다.

##### 2. Emulator
  - [안드로이드 스튜디오를 설치](https://developer.android.com/studio)합니다.
  - 안드로이드 프로젝트(`[...]/node_modules/iamport-react-native/example/android`)를 안드로이드 스튜디오에서 오픈합니다.
  - ![](src/img/android-studio-build.png) 또는 `Cmd+F9`를 눌러 앱을 빌드합니다.
  - ![AVD Manager](src/img/android-studio-avd-manager.png)을 눌러 안드로이드 emulator를 실행시킵니다.
  - example 앱이 설치된 것을 확인하실 수 있습니다.

![](src/img/ios-emulator-home.png)
![](src/img/ios-emulator-payment.png)
![](src/img/ios-emulator-certification.png)



#### 1. 일반/정기결제 사용예제
```javascript
import React from 'react';
import IMP from 'iamport-react-native'; // 아임포트 결제모듈을 불러옵니다.

class App extends React.Component {
  callback = (response) => { /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    const { navigation } = this.props;
    navigation.replace('PaymentResult', response);
  };

  render() {
    /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      name: '아임포트 결제데이터 분석',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: '39000',
      buyer_name: '홍길동',
      buyer_tel: '01012345678',
      buyer_email: 'example@naver.com',
      buyer_addr: '서울시 강남구 신사동 661-16',
      buyer_postcode: '06018',
      app_scheme: 'example',
      // [Deprecated v1.0.3]: m_redirect_url
    };

    return (
      <IMP.Payment
        userCode={'iamport'} // 가맹점 식별코드
        data={data} // 결제 데이터
        callback={this.callback} // 결제 종료 후 콜백
        loading={{
          message: '잠시만 기다려주세요...', // 로딩화면 메시지 
          image: require('img/iamport-logo.png') // 커스텀 로딩화면 이미지
        }}
      />
    );
  }
}

export default App;
```

| Prop             | Type          |  Description                                                | Default             | Required   |
| ---------------- | ------------- | ----------------------------------------------------------- | ------------------- | ---------- |
| userCode         | string        | 가맹점 식별코드                                                 | undefined           | true       |
| data             | object        | 결제에 필요한 정보 [자세히 보기](https://docs.iamport.kr/tech/imp) | undefined           | true       |
| - m_redirect_url | string        | [Deprecated]                                                | undefined           | false       |
| callback         | function      | 결제 후 실행 될 함수 [자세히보기](#callback)                       | undefined           | true       |
| loading          | object        | 로딩 화면 커스터마이징 위한 메시지 및 이미지                          |                     | false      |
| - message        | string        | 로딩화면 메시지                                                 | 잠시만 기다려주세요...    | false      |
| - image          |               | 로딩화면 이미지(url도 가능)                                       | 아임포트 로고 이미지     | false      |




#### 2. 휴대폰 본인인증 사용예제
```javascript
import React from 'react';
import IMP from 'iamport-react-native'; // 아임포트 본인인증 모듈을 불러옵니다.

class App extends React.Component {
  callback = (response) => { /* [필수입력] 본인인증 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    const { navigation } = this.props;
    navigation.replace('CertificationResult', response);
  };

  render() {
    /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
    const data = {
      merchant_uid: `mid_${new Date().getTime()}`,
      min_age: '',
    };

    return (
      <IMP.Certification
        userCode={'iamport'} // 가맹점 식별코드
        data={data} // 본인인증 데이터
        callback={this.callback} // 본인인증 종료 후 콜백
        loading={{
          message: '잠시만 기다려주세요...', // 로딩화면 메시지 
          image: require('img/iamport-logo.png') // 커스텀 로딩화면 이미지
        }}
      />
    );
  }
}

export default App;
```

| Prop          | Type          |  Description                       | Default             | Required   |
| ------------- | ------------- | ---------------------------------- | ------------------- | ---------- |
| userCode      | string        | 가맹점 식별코드                        | undefined           | true       |
| data          | object        | 본인인증에 필요한 정보                   | undefined           | true       |
| - merchant_uid| string        | 가맹점 주문번호                        | random              | false      |
| - min_age     | number        | 본인인증 허용 최소 연령                  | undefined           | false      |
| callback      | function      | 본인인증 후 실행 될 함수                 | undefined           | true       |
| loading       | object        | 로딩 화면 커스터마이징 위한 메시지 및 이미지  |                     | false      |
| - message     | string        | 로딩화면 메시지                        | 잠시만 기다려주세요...   | false      |
| - image       |               | 로딩화면 이미지(url도 가능)              | 아임포트 로고 이미지     | false      |
