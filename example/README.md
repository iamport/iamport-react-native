# example 프로젝트

`iamport-react-native` 예제입니다.

기본적인 형태의 리액트 네이티브 애플리케이션으로 앱 내에서 웹뷰를 통해 본인인증 및 결제를 실행한 후 결과를 확인할 수 있습니다.

타입스크립트로 작성되어 있어 `IMPData.PaymentData`와 `IMPData.CertificationData` interface를 통해 결제에 필요한 파라미터들의 타입 체크를 수행합니다.

## 실행

`iamport-react-native` 레포를 clone받은 후 프로젝트의 `example` 폴더 안으로 이동합니다.
```shell
$ git clone https://github.com/iamport/iamport-react-native
$ cd iamport-react-native/example
```

필요한 npm 모듈을 설치합니다.
```shell
$ yarn
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
- Xcode에서 `ios/IamportReactNativeExample.xcworkspace`를 오픈합니다.
- 빌드 타깃을 선택하고 앱을 빋드 후 실행합니다.

### 안드로이드

- Android Studio를 설치합니다.
- Android Studio에서 `android`폴더를 오픈합니다.
- 빌드 타깃을 선택하고 앱을 빌드 후 실행합니다.
