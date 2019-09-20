# 버전정보

아임포트 리액트 네이티브 모듈 버전 정보 안내입니다.

- [v1.2.3](https://github.com/iamport/iamport-react-native/tree/master)
  - 3rd-party 앱 URL scheme값에 하나멤버스를 추가하였습니다.

- [v1.2.2](https://github.com/iamport/iamport-react-native/tree/v1.2.2)
  - [IOS] package.json에 homepage값을 추가하였습니다.

- [v1.2.1](https://github.com/iamport/iamport-react-native/tree/v1.2.1)
  - [IOS] RN v0.60이상에서 동작하기 위해 podspec 파일을 추가하였습니다.

- [v1.2.0](https://github.com/iamport/iamport-react-native/tree/v1.2.0)
  - [IOS] ipa 파일 설치시 결제/본인인증 창이 뜨지 않는 이슈를 해결하였습니다.
  - [안드로이드] native code의 역할을 react-native단에서 수행하도록 수정하였습니다.
  - [본인인증] 회사명(`company`)과 통신사(`carrier`) 파라메터를 추가하였습니다.
  - 웹뷰 로딩 파라메터를 컴포넌트로 수정하였습니다.

- [v1.1.4-rc.1](https://github.com/iamport/iamport-react-native/tree/v1.1.4-rc.1)
  - [exampleForWebView] 기존에 작성된 웹 페이지를 리액트 네이티브에서 웹뷰로 재활용하는 경우를 위한 exampleForWebView 예제 프로젝트를 추가하였습니다.
  - [example] 예제 프로젝트의 신용카드 할부 개월수 변수명 오타를 수정하였습니다.
  - [결제] 웹 표준 이니시스 & 실시간 계좌이체 결제 중단시 처리 로직을 추가하였습니다.

- [v1.1.4-rc.0](https://github.com/iamport/iamport-react-native/tree/v1.1.4-rc.0)
  - [안드로이드] react-native-fbsdk와 충돌하는 이슈를 해결하였습니다.

- [v1.1.3-rc](https://github.com/iamport/iamport-react-native/tree/v1.1.3-rc)
  - [IOS] duplicate symbols for architecture x86_64 에러를 해결하였습니다.

- [v1.1.2](https://github.com/iamport/iamport-react-native/tree/v1.1.2)
  - [결제] 결제 종료 후 merchant_uid를 전달하기 위해 default m_redirect_url을 지정하였습니다.

- [v1.1.1](https://github.com/iamport/iamport-react-native/tree/v1.1.1)
  - jQuery cdn을 변경하였습니다.

- [v1.1.0](https://github.com/iamport/iamport-react-native/tree/v1.1.0)
  - React(v16.8.6), React Native(v0.59.8) 버전을 업그레이드 하였습니다.
  - React Hook을 적용하였습니다.
  - WebView 라이브러리를 react-native에서 react-native-webview로 변경하였습니다.
  - 로딩 데이터가 없어도 에러가 발생하지 않도록 조치하였습니다.
  - [결제]
    - 결제 데이터에 Array 타입의 값을 허용하도록 설정하였습니다.
    - 스마일페이를 추가하였습니다.
    - 모빌리언스 신용카드 결제를 추가하였습니다.
    - 가상계좌 발급시 콜백 미실행 버그를 해결하였습니다.
    - 실시간 계좌이체 뱅크페이 앱 결제 후 후속처리 로직을 추가하였습니다.
  - [본인인증] PASS 앱 사용을 위한 설정을 추가하였습니다.
  - [Vue Native] VN 지원을 위해, onMessage로 전달되는 data를 decode 하는 코드를 추가하였습니다.

- [v1.0.6](https://github.com/iamport/iamport-react-native/tree/v1.0.6)
  - [IOS] 페이코 웹 결제시, 결제 완료 전 postMessage 수신으로 발생하는 이슈를 해결하였습니다.

- [v1.0.5](https://github.com/iamport/iamport-react-native/tree/v1.0.5)
  - [IOS] 프로덕션 모드에서 js assets이 포함되지 않는 이슈를 해결하였습니다.

- [v1.0.4](https://github.com/iamport/iamport-react-native/tree/v1.0.4)
  - [결제] m_redirect_url 변수가 deprecated 되었습니다.

- [v1.0.3](https://github.com/iamport/iamport-react-native/tree/v1.0.3)
  - 콜백 함수를 필수입력으로 설정하였습니다.

- [v1.0.2](https://github.com/iamport/iamport-react-native/tree/v1.0.2) 
  - [결제] 다날, 카카오페이, 모빌리언스 등 콜백 지원 PG에 대해 결제시도 완료 후 콜백이 트리거 되지 않는 이슈를 해결하였습니다.

- [v1.0.1](https://github.com/iamport/iamport-react-native/tree/v1.0.1) 
  - 안드로이드와 IOS 모두 지원합니다.
  - 일반/정기결제 및 휴대폰 본인인증 기능을 제공합니다.

- [v0.8.0](https://github.com/iamport/iamport-react-native/tree/v0.8.0)
  - 안드로이드만 지원합니다.
  - 일반/정기결제 기능만 제공합니다.