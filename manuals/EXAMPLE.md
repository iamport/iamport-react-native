# 예제 프로젝트
아임포트 리액트 네이티브 모듈 예제 안내입니다.

`iamport-react-native`에서는 4가지의 예제를 통해 서로 다른 개발 스택에서 결제 모듈을 사용하는 방법을 안내드리고 있습니다.
예제별 상세 설명은 각 예제 폴더의 README 파일을 확인해주시기 바랍니다.

예제 실행을 위해서는 `iamport-react-native` 모듈을 clone받은 후 루트 디렉토리에서 다음의 명령어를 실행합니다.
```shell
$ yarn
```
그 후 각 예제 프로젝트의 폴더로 이동해 예제별 설명을 따라 앱을 빌드 및 실행할 수 있습니다.

## 1. [example](../example/README.md)
일반적인 형태의 리액트 네이티브 애플리케이션입니다.
타입스크립트로 작성되었습니다.

## 2. [exampleForWebView](../exampleForWebView/README.md)
기존에 만들어진 웹 페이지를 웹뷰에 띄워 결제를 진행하는 예제입니다.
[iamport-react-example](https://github.com/iamport/iamport-react-example)과 함께 동작할 수 있도록 제작되었습니다.
타입스크립트로 작성되었습니다.

## 3. [exampleForExpo](../exampleForExpo/README.md)
Expo bare 프로젝트 입니다.
Expo에서 eject를 실행해 android 및 ios 폴더를 생성 후 직접 앱을 빌드하는 경우를 가정합니다.
자바스크립트로 작성되었습니다.

## 4. [exampleForManagedExpo](../exampleForManagedExpo/README.md)
Expo managed 프로젝트입니다.
Expo에서 eject하지 않고 앱을 개발하는 경우를 가정합니다.
자바스크립트로 작성되었습니다.

## 일반/정기결제 코드 예시
```javascript
import React from 'react';
/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';

export function Payment({ navigation }) {
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    navigation.replace('PaymentResult', response);
  }

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
    // customer_uid: 'example' (정기결제 시)
    // [Deprecated v1.0.3]: m_redirect_url
  };

  return (
    <IMP.Payment
      userCode={'iamport'}  // 가맹점 식별코드
      tierCode={'AAA'}      // 티어 코드: agency 기능 사용자에 한함
      loading={<Loading />} // 로딩 컴포넌트
      data={data}           // 결제 데이터
      callback={callback}   // 결제 종료 후 콜백
    />
  );
}

export default Payment;
```

| Prop             | Type          | Description                                                     | Required   |
|------------------| ------------- |-----------------------------------------------------------------| ---------- |
| userCode         | string        | 가맹점 식별코드                                                        | true       |
| tierCode         | string        | agency 기능 사용자의 하위 가맹점 코드 3자리                                    | false       |
| data             | object        | 결제에 필요한 정보 [자세히 보기](https://docs.iamport.kr/sdk/javascript-sdk#request_pay)           | true       |
| - m_redirect_url | string        | 결제 후 이동할 url                                                    | false       |
| callback         | function      | 결제 후 실행 될 함수 [자세히보기](https://docs.iamport.kr/sdk/javascript-sdk) | true       |
| loading          | RN 컴포넌트     | 웹뷰 로드시 보여질 컴포넌트                                                 | false      |


## 휴대폰 본인인증 코드 예시
```javascript
import React from 'react';
/* 아임포트 본인인증 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';

export function Certification({ navigation }) {
  /* [필수입력] 본인인증 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    navigation.replace('CertificationResult', response);
  }

  /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: '아임포트',
    carrier: 'SKT',
    name: '홍길동',
    phone: '01012341234',
    min_age: '',
  };

  return (
    <IMP.Certification
      userCode={'iamport'}  // 가맹점 식별코드
      tierCode={'AAA'}      // 티어 코드: agency 기능 사용자에 한함
      loading={<Loading />} // 로딩 컴포넌트
      data={data}           // 본인인증 데이터
      callback={callback}   // 본인인증 종료 후 콜백
    />
  );
}

export default Certification;
```

| Prop          | Type          |  Description                       | Required   |
| ------------- | ------------- | ---------------------------------- | ---------- |
| userCode      | string        | 가맹점 식별코드                        | true       |
| tierCode      | string        | agency 기능 사용자의 하위 가맹점 코드 3자리 | false       |
| data          | object        | 본인인증에 필요한 정보 [자세히 보기](https://https://docs.iamport.kr/tech/mobile-authentication#call-authentication)      | true       |
| - merchant_uid| string        | 가맹점 주문번호                        | false      |
| - company     | string        | 회사명 또는 URL                       | false      |
| - carrier     | string        | 통신사                               | false      |
| - name        | string        | 본인인증 할 이름                        | false      |
| - phone       | number        | 본인인증 할 전화번호                     | false      |
| - min_age     | number        | 본인인증 허용 최소 연령                  | false      |
| callback      | function      | 본인인증 후 실행 될 함수                 | true       |
| loading       | RN 컴포넌트     | 웹뷰 로드시 보여질 컴포넌트               | false      |

## 웹뷰 로딩 컴포넌트 코드 예시
웹뷰가 로드되기 전 보여질 로딩 화면을 컴포넌트로 생성해 loading 파라메터로 넘깁니다.
미 입력시 아임포트가 보여주는 default 로딩 페이지가 렌더링됩니다. 아래는 로딩 컴포넌트 코드 작성 예시입니다.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Loading() {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>잠시만 기다려주세요...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Loading;
```

로딩 컴포넌트 및 웹뷰 컴포넌트(IMP.Certification, IMP Payment)를 감싸고 있는 최상단 View 컴포넌트의 스타일 속성을 지정할때 주의해야합니다.
별도의 설정 없이 작성할 경우, 컴포넌트들이 전체화면으로 보이지 않을 수 있습니다.
따라서 스타일 속성을 지정할 때, 각 컴포넌트의 `flex`값을 1로 설정해주셔야 합니다.
