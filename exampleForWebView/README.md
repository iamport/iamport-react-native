# 아임포트 리액트 네이티브 웹뷰

리액트 네이티브로 앱을 만들때, 기존에 만들어진 웹 페이지를 웹뷰로 띄워 재사용하는 경우가 있습니다. 이 경우, 외부 앱(간편결제, 카드사 앱 등)과 통신하기 위해 네이티브 코드를 추가로 작성해야 합니다. 이 과정이 꽤 번거롭기 때문에 아임포트는 **웹에서 리액트 네이티브로 `post message`를 보내는 방식**을 권장하고 있습니다.

아임포트는 해당 내용이 구현된 리액트 결제/본인인증 테스트용 웹앱 예제 [iamport-react-example](https://github.com/SoleeChoi/iamport-react-example)과 리액트 네이티브 예제 [exampleForWebView](https://github.com/iamport/iamport-react-native/exampleForWebView)를 제공합니다.

## iamport-react-example 다운로드 및 실행

아래 명령어를 통해 `iamport-react-example` 프로젝트를 clone 받고 실행합니다.

```
$ git clone https://github.com/SoleeChoi/iamport-react-example
```

```
$ cd ./iamport-react-example
$ npm install
$ npm start
```

브라우저를 열고 `http://${가맹점 IP}:3000`으로 접속합니다.

## exampleForWebView 다운로드

아래 명령어를 통해 `exampleForWebView` 프로젝트가 포함된 `iamport-react-native` 프로젝트를 clone 받습니다.

```
$ git clone https://github.com/iamport/iamport-react-native
```

## 리액트 네이티브 웹뷰 source URL 설정하기

`exampleForWebView` 프로젝트의 최상위 `Home` 컴포넌트에서 웹뷰 source URL을 설정합니다. 테스트를 위해 `iamport-react-example`을 띄운 로컬 URL로 수정합니다. **실제 릴리즈 모드에서는 가맹점 도메인으로 변경해야** 합니다.

```javascript
  // iamport-react-native/exampleForWebView/src/Home.js
  import React from 'react';
  import WebView from 'react-native-webview';
  
  function Home() {
    const domain = `http://${가맹점 IP}:3000`;
    ...
  }

  export default Home;
```

## exampleForWebView 실행하기

아래 명령어를 통해 `exampleForWebView` 프로젝트를 실행합니다.

```
$ cd ./iamport-react-native/exampleForWebView
$ npm install
$ react-native link iamport-react-native
$ react-native link react-native-webview
$ react-native run-android 또는 react-native run-ios
```

생성된 앱에서 결제 및 휴대폰 본인인증이 원활히 동작하는 것을 확인하실 수 있습니다.

아래는 위와 같이 웹 페이지를 리액트 네이티브에서 웹뷰로 띄워 재활용 할때, 아임포트 결제 및 휴대폰 본인을 연동하는 과정을 설명합니다. 이해를 돕기 위해 앞서 소개한 `iamport-react-example` 웹앱과 `exampleForWebView` 프로젝트의 코드를 예시로 사용합니다.

- [결제 웹 페이지 재활용하기](manuals/PAYMENT.md)
- [휴대폰 본인인증 웹 페이지 재활용하기](manuals/CERTIFICATION.md)
