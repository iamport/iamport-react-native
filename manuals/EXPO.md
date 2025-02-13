# Expo에서 아임포트 연동하기

`iamport-react-native`는 Expo 환경에서 사용하실 수 있습니다.
또한 eject를 하지 않아도 사용 가능합니다.

이 문서에서는 eject를 하지 않은 managed 프로젝트와 eject를 한 bare 프로젝트 양 쪽에서 Expo를 설정하는 방법을 설명하고 있습니다.

## Expo CLI 설치하기
```
$ npm install -g expo-cli
```

## 1. managed 프로젝트

managed 프로젝트는 Expo의 가장 기초적인 프로젝트 생성 방식으로 플랫폼별 네이티브 코드 없이 오직 자바스크립트 및 타입스크립트만으로 앱을 개발하는 방식입니다.
Expo 자체 서버에서 빌드 및 배포를 모두 처리할 수 있습니다.
`ios`및 `android` 폴더가 없기 때문에 필요한 설정들은 `app.json`에 적어주셔야 합니다.

### 1-1. Expo 서버 빌드를 위한 설정

managed로 개발하는 경우 빌드를 Expo 서버에서 원격으로 진행하게 되며 그에 따른 [필수 값들](https://docs.expo.dev/distribution/building-standalone-apps/#2-configure-appjson)을 채워야 합니다.

- `name`, `icon`, `version`, 그리고 `slug`는 앱 공통 설정으로 필수입니다.
- `ios`의 `bundleIdentifier` 및 `buildNumber`는 iOS 앱 배포 및 빌드를 위해 필수입니다.
-  `android`의 `package` 및 `versionCode`는 안드로이드 앱 배포 및 빌드를 위해 필수입니다.

```json
// app.json
{
  "expo": {
    "name": "Your App Name",
    "icon": "./path/to/your/app-icon.png",
    "version": "1.0.0",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1
    }
  }
}
```

### 1-2. 외부 앱 실행을 위한 설정

Expo bare 프로젝트나 일반 리액트 네이티브 프로젝트의 경우 AndroidManifest.xml 및 Info.plist에 앱 scheme [관련 설정](./SETTING.md)을 작성하지만, managed 프로젝트의 경우 네이티브 코드가 없어 app.json에 대신 설정을 적어주셔야 합니다.

먼저 안드로이드를 위한 외부 앱 설정에 필요한 expo-build-properties를 설치합니다.

```sh
npx expo install expo-build-properties
```

- `ios.infoPlist.LSApplicationQueriesSchemes`에는 외부 앱 리스트를 작성합니다.
- `ios.infoPlist.NSAppTransportSecurity`의 두 항목을 `YES`로 설정합니다.
- `android.intentFilters`에 개발하시는 앱의 scheme을 설정합니다.
- `plugins`에 expo-build-properties를 이용해 안드로이드 외부 앱 리스트를 추가로 작성합니다.

```json
// app.json
{
  "expo": {
    ...,
    "ios": {
      ...
      "infoPlist": {
        "LSApplicationQueriesSchemes": [
          "kftc-bankpay",
          "ispmobile",
          "itms-apps",
          "hdcardappcardansimclick",
          "smhyundaiansimclick",
          "shinhan-sr-ansimclick",
          "smshinhanansimclick",
          "kb-acp",
          "mpocket.online.ansimclick",
          "ansimclickscard",
          "ansimclickipcollect",
          "vguardstart",
          "samsungpay",
          "scardcertiapp",
          "lottesmartpay",
          "lotteappcard",
          "cloudpay",
          "nhappcardansimclick",
          "nonghyupcardansimclick",
          "citispay",
          "citicardappkr",
          "citimobileapp",
          "kakaotalk",
          "payco",
          "chaipayment",
          "kb-auth",
          "hyundaicardappcardid",
          "com.wooricard.wcard",
          "lmslpay",
          "lguthepay-xpay",
          "liivbank",
          "supertoss",
          "kakaobank"
        ],
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true,
          "NSAllowsArbitraryLoadsInWebContent": true
        }
      }
    },
    ...
    "android": {
      ...
      "intentFilters": [
        {
          "action": "VIEW",
          "category": [
            "DEFAULT",
            "BROWSABLE"
          ],
          "data": {
            "scheme": "exampleformanagedexpo"
          }
        }
      ]
    },
    ...
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "manifestQueries": [
              {
                "intent": {
                  "action": "android.intent.action.VIEW",
                  "category": "android.intent.category.BROWSABLE",
                  "data": {
                    "scheme": "https"
                  }
                },
                "package": [
                  "kvp.jjy.MispAndroid320",
                  "com.kftc.bankpay.android",
                  "com.kbstar.liivbank",
                  "com.nh.cashcardapp",
                  "kr.co.kfcc.mobilebank",
                  "com.knb.psb",
                  "com.kakao.talk",
                  "com.mysmilepay.app",
                  "finance.chai.app",
                  "com.nhnent.payapp",
                  "com.hyundaicard.appcard",
                  "viva.republica.toss",
                  "com.shcard.smartpay",
                  "com.shinhan.smartcaremgr",
                  "com.hanaskard.paycla",
                  "kr.co.samsungcard.mpocket",
                  "com.kbcard.cxh.appcard",
                  "nh.smart.nhallonepay",
                  "kr.co.citibank.citimobile",
                  "com.lcacApp",
                  "com.lotte.lpay",
                  "com.ssg.serviceapp.android.egiftcertificate",
                  "com.inicis.kpay",
                  "com.kbankwith.smartbank",
                  "com.lguplus.paynow",
                  "com.wooricard.smartapp",
                  "com.lottemembers.android",
                  "com.kt.ktauth",
                  "com.lguplus.smartotp",
                  "com.sktelecom.tauth",
                  "com.wooribank.smart.npib",
                  "com.kakaobank.channel"
                ]
              }
            ]
          }
        }
      ]
    ]
  }
}
```

### 1-3. 예제

- [예제 코드 작성하기](./EXAMPLE.md)
- [예제 프로젝트 실행하기](../exampleForManagedExpo/README.md)

## 2. bare 프로젝트

bare 프로젝트는 기존 managed 프로젝트에서 eject를 실행해 네이티브 코드를 사용하고자 하는 개발 방식입니다.
Expo 자체 서버에서 bare 프로젝트의 빌드를 지원하고 있지 않기 때문에 앱 배포를 위해서는 로컬에서 직접 빌드하게 됩니다.

### 2-1. 설정 파일(app.json) 확인하기

원활한 ejecting을 위해 아래와 같이 설정되어 있는지 확인합니다.

```
// app.json
{
  "expo": {
    "name": "Your App Name",
    "icon": "./path/to/your/app-icon.png",
    "version": "1.0.0",
    "slug": "your-app-slug",
    "sdkVersion": "XX.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname"
    },
    "android": {
      "package": "com.yourcompany.yourappname"
    }
  }
}
```

- IOS의 `bundleIdentifier`값과 Android의 `package`값에 알맞은 값을 넣어야 합니다.
- `name`, `icon` 그리고 `version` 필드는 필수입력입니다.
- 보다 자세한 내용은 엑스포 공식문서 [Configuration with app.json](https://docs.expo.dev/workflow/configuration)을 참고해주세요.

### 2-2. EJECT 하기

프로젝트 폴더에서 expo 명령어를 통해 eject 합니다. `android`와 `ios` 폴더가 생성되며 필요한 dependency들이 설치됩니다.

```shell
$ expo eject
```

### 2-3. [아임포트 설치 및 링킹하기](./INSTALL.md)
```shell
$ yarn add iamport-react-native
$ yarn add react-native-webview
```

### 2-4. 설정하기
  - [IOS 설정하기](./SETTING.md)
  - [실시간 계좌이체 설정하기](./TRANS.md)

###2-5. 예제

- [예제 코드 작성하기](./EXAMPLE.md)
- [예제 프로젝트 실행하기](../exampleForExpo/README.md)

### 2-6 [콜백 함수 설정하기](./CALLBACK.md)
