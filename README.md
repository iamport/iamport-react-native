# iamport-react-native
[![alt text](https://img.shields.io/npm/v/iamport-react-native)](https://www.npmjs.com/package/iamport-react-native)

아임포트 리액트 네이티브 모듈입니다.

## 버전 정보
최신버전은 [v2.0.9](https://github.com/iamport/iamport-react-native/tree/v2.0.9)입니다.
버전 히스토리는 [버전 정보](./manuals/VERSION.md)를 참고하세요.

## 지원 정보
아임포트 리액트 네이티브 모듈은 결제 및 휴대폰 본인인증 기능을 제공합니다.
결제시 지원하는 PG사와 결제수단에 따른 자세한 정보는 [지원 정보](./manuals/SUPPORT.md)를 참고하세요.

## 설치하기
아래 명령어를 통해 아임포트 모듈을 귀하의 리액트 네이티브 프로젝트에 추가할 수 있습니다.
`react-native-webview` 모듈은 아임포트 모듈에 dependent하기 때문에 반드시 함께 설치해야 하며 **10.8.3 이상의 버전이 요구**됩니다.
보다 자세한 안내는 [설치하기](./manuals/INSTALL.md)를 참고하세요.

## 설정하기
### iOS 설정하기
iOS에서 아임포트 모듈을 사용하기 위해서는 추가적인 설정이 필요합니다.
보다 자세한 설명은 [iOS 설정하기](./manuals/SETTING.md)를 참고하세요.

### Expo 설정하기
Expo 프로젝트에서 아임포트 모듈을 사용하기 위해서는 추가적인 설정이 필요합니다.
보다 자세한 설명은 [Expo에서 아임포트 연동하기](./manuals/EXPO.md)를 참고하세요.

### 실시간 계좌이체 설정하기
웹 표준 이니시스와 나이스 정보통신은 뱅크페이 앱을 통해 실시간 계좌이체를 진행합니다.
뱅크페이에서 결제 인증 후 본래의 앱으로 복귀 해 다음단계로 진행을 하려면 별도 설정이 요구됩니다.
자세한 내용은 [실시간 계좌이체 설정하기](./manuals/TRANS.md)를 참고하세요.

## 예제
아임포트 결제연동 모듈을 사용해 아래와 같이 일반/정기결제 및 휴대폰 본인인증 기능을 구현할 수 있습니다.
현재 구현된 예제들에 대한 설명 및 라이브러리 사용에 필요한 파라미터는 [예제](./manuals/EXAMPLE.md)를 참고하세요.

## 콜백 함수 설정하기
콜백 함수는 필수입력 필드로, 결제/본인인증 완료 후 routing을 통한 이동을 위해 아래와 같이 로직을 작성할 수 있습니다.
콜백 함수에 대한 자세한 설명은 [콜백 설정하기](./manuals/CALLBACK.md)를 참고하세요.
```js
function callback(response) {
  navigation.replace('Result', response);
}
```
