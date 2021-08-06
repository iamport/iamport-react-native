# exampleForWebView 프로젝트

`iamport-react-native` 예제입니다.

리액트 네이티브로 앱을 만들때, 기존에 만들어진 웹 페이지를 웹뷰로 띄워 재사용하는 경우가 있습니다.
이 경우, 외부 앱(간편결제, 카드사 앱 등)과 통신하기 위해 네이티브 코드를 추가로 작성해야 합니다.
이 과정이 꽤 번거롭기 때문에 아임포트는 웹에서 리액트 네이티브로 post message를 보내는 방식을 권장하고 있습니다.

이 예제는 해당 내용이 구현된 리액트 결제/본인인증 테스트용 웹앱 예제 [iamport-react-example](https://github.com/iamport/iamport-react-example)과 함께 실행할 수 있습니다.

## iamport-react-example 실행

`iamport-react-example` 프로젝트를 clone 후 실행합니다.
```shell
$ git clone https://github.com/iamport/iamport-react-example
$ cd iamport-react-example
$ npm install
$ npm start
```

## exampleForWebView 실행

`iamport-react-native` 레포를 clone받은 후 프로젝트의 `exampleForWebView` 폴더 안으로 이동합니다.
```shell
$ git clone https://github.com/iamport/iamport-react-native
$ cd iamport-react-native/exampleForWebView
```

필요한 npm 모듈을 설치합니다.
```shell
$ yarn
```

`exampleForWebView` 프로젝트의 최상위 `HOME` 컴포넌트에서 웹뷰 source URL을 설정합니다.
테스트를 위해 `iamport-react-example`을 실행했을 때 표시되는 URL로 수정합니다.
실제 릴리즈 모드에서는 가맹점 도메인으로 변경해야 합니다.
```js
import React from 'react';
import WebView from 'react-native-webview';

function Home() {
  const domain = `http://${가맹점 IP}`;
  ...
}

export default Home;
```

앱을 빌드하고 실행하기 전 Metro를 실행합니다.
```shell
$ yarn start
```

각 환경에 맞게 앱을 빌드합니다.

### iOS

- Xcode를 설치합니다.
- 필요한 CocoaPod 라이브러리를 설치합니다.
```shell
$ cd ios
$ pod install
```
- Xcode에서 `ios/exxampleForWebView.xcworkspace`를 오픈합니다.
- 빌드 타깃을 선택하고 앱을 빋드 후 실행합니다.

### 안드로이드

- Android Studio를 설치합니다.
- Android Studio에서 `android`폴더를 오픈합니다.
- 빌드 타깃을 선택하고 앱을 빌드 후 실행합니다.

아래는 위와 같이 웹 페이지를 리액트 네이티브에서 웹뷰로 띄워 재활용할때, 아임포트 결제 및 휴대폰 본인인증을 연동하는 과정을 설명합니다.
이해를 돕기 위해 앞서 소개한 `iamport-react-example` 웹앱과 `exampleForWebView` 프로젝트 코드를 예시로 사용합니다.

- [결제 웹 페이지 재활용하기](./manuals/PAYMENT.md)
- [휴대폰 본인인증 웹 페이지 재활용하기](./manuals/CERTIFICATION.md)
