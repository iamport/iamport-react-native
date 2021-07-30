# 휴대폰 본인인증 웹 페이지 재활용하기

웹 페이지로 작성한 본인인증 화면을 리액트 네이티브에서 웹뷰로 띄워 재사용하는 경우가 있습니다. 이 경우 본인인증 하기 버튼을 눌렀을때 본인인증 환경이 리액트 네이티브인지 판단해 **리액트 네이티브로 post message를 보내야** 합니다.

리액트 네이티브 프로젝트에 아임포트 리액트 네이티브 모듈(`iamport-react-native`)을 설치한 후, 리액트로부터 `post message`를 받으면 해당 본인인증 화면을 렌더링 하도록 로직을 작성해야 합니다.

### 1. 리액트 네이티브로 `post message` 보내기

본인인증 하기 버튼을 눌렀을 때 본인인증 환경이 리액트 네이티브인지 여부를 먼저 판단해야 합니다. 본인인증 환경이 리액트 네이티브인 경우, **리액트 네이티브로 `가맹점 식별코드`, `본인인증 데이터` 그리고 `액션 유형`을 post message로 보냅니다.**

```javascript
  // iamport-react-example/src/Certification/index.js
  import React from 'react';

  function Certification() {
    function onClickCertification() {
      /* 가맹점 식별코드 */
      const userCode = 'imp00000000';

      /* 본인인증 데이터 정의하기 */
      const data = {
        merchant_uid: `mid_${new Date().getTime()}`  // 주문번호
        name: '홍길동',                                // 이름
        phone: '01012341234',                        // 전화번호
        ...
      };

      if (isReactNative()) {
        /* 리액트 네이티브 환경에 대응하기 */
        const params = {
          userCode,                                   // 가맹점 식별코드
          data,                                       // 본인인증 데이터
          type: 'certification',                      // 결제와 본인인증 구분을 위한 필드
        };
        const paramsToString = JSON.stringify(params);
        window.ReactNativeWebView.postMessage(paramsToString);
      } else {
        /* 그 외 환경의 경우 */
        /* 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init(userCode);
        /* 본인인증 창 호출하기 */
        IMP.certification(data, callback);
      }
    }

    /* 콜백 함수 정의하기 */
    function callback(response) {
      ...
    }

    function isReactNative() {
      /*
        리액트 네이티브 환경인지 여부를 판단해
        리액트 네이티브의 경우 IMP.certification()를 호출하는 대신
        리액트 네이티브로 post message를 보낸다

        아래 예시는 모든 모바일 환경을 리액트 네이티브로 인식한 것으로
        실제로는 user agent에 값을 추가해 정확히 판단해야 한다
      */
      if (ua.mobile) return true;
      return false;
    }

    return (
      ...
      <button onClick={onClickCertification}>본인인증 하기</button>
      ...
    );
  }
```

### 2. 리액트 네이티브에서 `post message`를 받았을때 본인인증 화면 렌더링하기

리액트에서 `post message`를 보내면, 리액트 네이티브 `WebView`의 `onMessage` 함수가 이를 트리거합니다. 메시지 내용 중 액션 유형(`type`)이 `payment`면 결제 화면을, `certification`이면 본인인증 화면을 렌더링 하기 위해 해당 라우트로 이동합니다. 이때 **post message로 전달 받은 `가맹점 식별코드`와 `본인인증 데이터`를 `query`로 전달**합니다.

```javascript
  // iamport-react-native/exampleForWebView/src/Home.js
  import React from 'react';
  import WebView from 'react-native-webview';

  function Home({ navigation }) {
    const domain = `http://${가맹점 IP}:3000`;
    function onMessage(e) {
      /* 리액트로부터 post message를 받았을때 트리거 된다 */
      try {
        /* post message에서 가맹점 식별코드, 본인인증 데이터 그리고 액션 유형을 추출한다 */
        const { userCode, data, type } = JSON.parse(e.nativeEvent.data);
        const params = { userCode, data };
        /* 액션 유형이 certification이면 본인인증 화면으로 이동한다 */
        navigation.push(type === 'payment' ? 'Payment' : 'Certification', params);
      } catch (e) {}
    }

    return (
      <WebView
        source={{ uri: domain }} 
        onMessage={onMessage}
        style={{ flex: 1 }}
        injectedJavascript={`(function() {
          window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
          };
        })()`}
      />
    );
  }

  export default Home;
```

### 3. 리액트 네이티브에 본인인증 화면 추가하기

`가맹점 식별코드`와 `본인인증 데이터`를 쿼리에서 추출해 `IMP.Certification`에 prop 형태로 전달합니다. 이때 본인인증 후 실행될 로직을 작성한 콜백 함수도 함께 전달합니다. 콜백함수에서 본인인증 결과에 따라 로직을 다르게 작성할 수 있습니다. 아래는 본인인증 성공시 웹뷰를 띄운 Home으로 돌아가고, 본인인증 실패시 바로 이전 화면으로 돌아가는 예시입니다.

```javascript
  // iamport-react-native/exampleForWebView/Certification.js
  import React from 'react';
  import IMP from 'iamport-react-native';

  function Certification({ navigation }) {
    /* 가맹점 식별코드, 본인인증 데이터 추출 */
    const userCode = navigation.getParam('userCode');
    const data = navigation.getParam('data');
    
    /* 본인인증 후 실행될 콜백 함수 입력 */
    function callback(response) {
      const isSuccessed = getIsSuccessed(response);
      if (isSuccessed) {
        /* 본인인증 성공한 경우, 리디렉션 위해 홈으로 이동한다 */
        const params = {
          ...response,
          type: 'certification', // 결제와 본인인증 구분을 위한 필드
        };
        navigation.replace('Home', params);
      } else {
        /* 본인인증 실패한 경우, 이전 화면으로 돌아간다 */
        navigation.goBack();
      }
    }

    function getIsSuccessed(response) {
      const { success } = response;

      if (typeof success === 'string') return success === 'true';
      if (typeof success === 'boolean') return success === true;
    }

    return (
      <IMP.Certification
        userCode={userCode}
        data={{
          ...data,
          app_scheme: 'test',
        }}
        callback={callback}
      />
    );
  }

  export default Certification;
```

### 5. 본인인증 후 리디렉션 설정하기

위의 예시에 따라 본인인증 후, 웹뷰를 띄운 Home으로 돌아갔을때 리디렉션을 위한 추가 로직을 작성해야 합니다. 아래와 같은 경우를 가정합니다.

| 유형        | 도메인                                       |
| ---------- | ------------------------------------------ |
| 홈          | https://example.com                       |
| 본인인증      | https://example.com/certification         |
| 본인인증 완료  | https://example.com/certification/result  |

위와 같은 경우, 본인인증 후 홈으로 렌더링 시 웹뷰의 도메인은 다시 `https://example.com`이 됩니다. 이를 `https://example.com/certification/result`로 리디렉션 하기 위해 홈 컴포넌트에 아래와 같은 로직을 작성합니다.

```javascript
  // iamport-react-native/exampelForWebView/Home.js
  import React, { useState, useEffect } from 'react';
  import WebView from 'react-native-webview';
  import queryString from 'query-string';

  const domain = 'https://example.com'; // 가맹점 도메인
  function Home({ navigation }) {
    const [uri, setUri] = useState(domain);

    useEffect(() => {
      /* navigation이 바뀌었을때를 트리거 */
      const response = navigation.getParam('response');
      if (response) {
        const query = queryString.stringify(response);
        const { type } = query;
        if (type === 'certification') {
          /* 본인인증 후 렌더링 되었을 경우, https://example.com/certification/result로 리디렉션 시킨다 */
          setUri(`${domain}/certification/result?${query}`);    
        }
        ...
      }
    }, [navigation]);

    function onMessage(e) {
      try {
        const { userCode, data, type } = JSON.parse(e.nativeEvent.data);
        const params = { userCode, data };
        navigation.push(type === 'payment' ? 'Payment' : 'Certification', params);
      } catch (e) {}
    }

    return (
      <WebView
        source={{ uri }} 
        onMessage={onMessage}
        style={{ flex: 1 }}
        injectedJavascript={`(function() {
          window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
          };
        })()`}
      />
    );
  }

  export default Home;
```