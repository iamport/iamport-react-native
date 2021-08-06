# exampleForExpo 프로젝트

`iamport-react-native` 예제입니다.

Expo를 통해 아임포트 결제모듈을 연동하는 것을 구현한 예제 프로젝트입니다.
그 중에서도 bare 프로젝트를 생성했을 때, 혹은 기존 managed 프로젝트를 eject 했을 때를 가정해 만들어졌습니다.
또한 자바스크립트로 작성되었기 때문에 타입스크립트가 아닌 자바스크립트에서의 `iamport-react-native` 사용법도 보실 수 있습니다.

Expo 관련 설정은 [Expo 설정하기](../manuals/EXPO.md)에서 보실 수 있습니다.

## Expo CLI 설치

```shell
$ yarn global add expo-cli
```

## Expo Go 앱에서 실행

먼저 테스트할 기기에 [Expo Go](https://expo.dev/client) 앱을 설치합니다.

`iamport-react-native` 레포를 clone받은 후 프로젝트의 `example` 폴더 안으로 이동합니다.
```shell
$ git clone https://github.com/iamport/iamport-react-native
$ cd iamport-react-native/exampleForExpo
```

Expo 개발 서버를 실행합니다.
```shell
$ expo start
```

서버의 로딩이 완료되면 안드로이드의 경우 Expo Go 앱에서, iOS의 경우 카메라를 통해 QR 코드를 찍어 앱을 실행합니다.

Expo Go 앱의 특성상 일부 결제수단(e.g. 뱅크페이)은 직접 빌드하는 것이 아니면 사용이 불가합니다.

## 플랫폼별로 앱을 직접 빌드해 실행

앱을 빌드하기 전 Metro를 실행합니다.
```shell
$ yarn start
```

### iOS

- Xcode를 설치합니다.
- 필요한 CocoaPod 라이브러리를 설치합니다.
```shell
$ cd ios
$ pod install
```
- Xcode에서 `ios/exampleForExpo.xcworkspace`를 오픈합니다.
- 빌드 타깃을 선택하고 앱을 빋드 후 실행합니다.

### 안드로이드

- Android Studio를 설치합니다.
- Android Studio에서 `android`폴더를 오픈합니다.
- 빌드 타깃을 선택하고 앱을 빌드 후 실행합니다.
