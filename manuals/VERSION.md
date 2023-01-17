# 버전정보
아임포트 리액트 네이티브 모듈 버전 정보 안내입니다.
- [v2.0.4](https://github.com/iamport/iamport-react-native/tree/main)
  - 아임포트 JavaScript SDK 버전을 신규 v1으로 업그레이드하였습니다.
  - SDK 업그레이드를 통해 KSNET, 토스페이먼츠 (신 모듈)를 추가했습니다.

- [v2.0.3](https://github.com/iamport/iamport-react-native/tree/v2.0.3)
  - React(v18), React Native(v0.70) 버전을 업그레이드하였습니다.

- [v2.0.2](https://github.com/iamport/iamport-react-native/tree/v2.0.2)
  - intent 파싱 로직을 변경했습니다. (@Gijuno)

- [v2.0.1](https://github.com/iamport/iamport-react-native/tree/v2.0.1)
  - 앱 내부 redirection 방식을 보완했습니다.

- [v2.0.0](https://github.com/iamport/iamport-react-native/tree/v2.0.0)
  - 예제 UI가 개선되었습니다.
  - popup 파라미터가 추가되었습니다.(미설정하거나 false로 설정 요망)
  - redirect 관련 로직이 수정되었습니다.
  - 케이뱅크페이 지원을 추가했습니다.

- [v2.0.0-rc.2](https://github.com/iamport/iamport-react-native/tree/v2.0.0-rc.2)
  - `requiresMainQueueSetup` 관련 워닝을 해결했습니다.

- [v2.0.0-rc.1](https://github.com/iamport/iamport-react-native/tree/v2.0.0-rc.1)
  - [안드로이드] 다날 본인인증 PASS 앱 실행 로직을 추가했습니다.
  - 예제 UI가 개선되었습니다.
  - 스마트로를 추가했습니다.
  - 우리페이 확대에 따른 우리WON뱅킹 지원을 추가했습니다.
  - React(v17.0.2), React Native(v0.65.0) 버전을 업그레이드하였습니다.

- [v2.0.0-rc.0](https://github.com/iamport/iamport-react-native/tree/v2.0.0-rc.0)
  - 프로젝트를 타입스크립트로 재작성했습니다.
  - [안드로이드] 라이브러리의 네이티브 코드에 대한 의존성을 제거했습니다.
  - Expo managed 프로젝트에서 eject를 하지 않는 예제를 추가했습니다.
  - [엑심베이] 중국어, 일본어 언어 설정을 추가했습니다.
  - React(v16.13.1), React Native(v0.63.4) 버전을 업그레이드하였습니다.

- [v1.6.4](https://github.com/iamport/iamport-react-native/tree/v1.6.4)
  - 토스 - 간편결제(tosspay)를 추가하였습니다.

- [v1.6.3](https://github.com/iamport/iamport-react-native/tree/v1.6.3)
  - 엑심베이 전용 결제 수단 및 결제창 언어 옵션을 추가하였습니다.

- [v1.6.2](https://github.com/iamport/iamport-react-native/tree/v1.6.2)
  - [IOS / 이니시스 - 실시간 계좌이체] 결제 승인 플로우 관련 버그를 수정하였습니다.

- [v1.6.1](https://github.com/iamport/iamport-react-native/tree/v1.6.1)
  - 블루월넛 PG사 대비 로직을 작성하였습니다.

- [v1.6.0](https://github.com/iamport/iamport-react-native/tree/v1.6.0)
  - 다날 결제시, 주문명에 %를 포함하는 경우 URI malformed 에러를 해결하였습니다.
  - [IOS / 네이버페이] 네이버페이 앱 로그인 마켓 URL을 추가하였습니다.
  - [IOS / 스마일페이] 쿠키 허용을 위해 baseURL을 스마일페이로 설정한 feature 브랜치(feature/smilepay)를 머지하였습니다.
  - [안드로이드 / react-native-webview] v10.8.3 이상에서 원활한 동작을 위해 작성한 feature 브랜치(feature/react-native-webview)를 머지 하였습니다.

- [v1.5.2](https://github.com/iamport/iamport-react-native/tree/v1.5.2)
  - [안드로이드] KG이니시스 - 실시간계좌이체시 국민리브, NH앱캐시, NG상상뱅크, BNK경남은행 앱의 링크가 누락된 부분을 추가하였습니다.
  - 예제 코드에 네이버페이 원활한 사용을 위한 네이버페이 전용 파라미터를 추가하였습니다.

- [v1.5.1](https://github.com/iamport/iamport-react-native/tree/v1.5.1)
  - [IOS] 페이코 및 시티카드 앱의 마켓 URL 오타를 수정하였습니다.

- [v1.5.0](https://github.com/iamport/iamport-react-native/tree/v1.5.0)
  - agency 기능을 위한 tierCode prop을 추가하였습니다.

- [v1.4.4](https://github.com/iamport/iamport-react-native/tree/v1.4.4)
  - 새로운 PG사 및 결제수단을 추가하였습니다.
  - PG사의 prop type을 enum에서 string으로 변경하였습니다.
  - inject javascript는 웹뷰 로드 후 최초 한번만 실행하도록 flag를 추가하였습니다.
  - 로딩 컴포넌트 렌더링 시간을 inject javascript 이후로 연장하였습니다. (안드로이드 - iframe 방식은 제외)

- [v1.4.0](https://github.com/iamport/iamport-react-native/tree/v1.4.0)
  - 엑심베이 지원을 위한 코드를 추가하였습니다.
  - 아임포트 javascript SDK 버전을 1.1.8로 업그레이드 하였습니다.

- [v1.3.0](https://github.com/iamport/iamport-react-native/tree/v1.3.0)
  - IOS13의 UIWebView deprecated error에 대응하기 위해 react-native-webview의 버전을 7.4.2로 업데이트 하였습니다.
  - expo 사용자를 위한 가이드 문서와 예제 프로젝트를 추가하였습니다.

- [v1.2.3](https://github.com/iamport/iamport-react-native/tree/v1.2.3)
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
