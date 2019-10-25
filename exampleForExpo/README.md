
# 아임포트 엑스포 예제 프로젝트

엑스포 환경에서 아임포트 모듈을 사용해 결제 및 휴대폰 본인인증 기능을 구현한 예제 프로젝트입니다. 아래는 해당 프로젝트 실행 방법에 대해 안내합니다.

iamport-react-native 모듈을 clone받아 폴더 위치를 `exampleForExpo` 프로젝트로 이동합니다.

```
$ git clone https://github.com/iamport/iamport-react-native.git
$ cd ./iamport-react-native/exampleForExpo
```

필요한 npm 모듈을 설치합니다.

```
$ npm install
$ npx jetifier // AndroidX 환경 대비
```

앱을 실행합니다.

```
$ expo start
```

각 환경에 맞게 앱을 빌드합니다. IOS는 `ios/exampleforexpo.xcworkspace` 파일을 오픈해 Xcode에서 빌드합니다. Android는 Android Studio에서 android 폴더를 열고 앱을 빌드 및 설치(Run)합니다.
