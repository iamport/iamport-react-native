
# iamport-react-native
[ ![alt text](https://img.shields.io/badge/react-v16.8.6-orange.svg?longCache=true&style=flat-square) ](https://github.com/facebook/react/)
[ ![alt text](https://img.shields.io/badge/react--native-v0.59.8-yellow.svg?longCache=true&style=flat-square) ](https://github.com/facebook/react-native)
[ ![alt text](https://img.shields.io/badge/query--string-v6.1.0-green.svg?longCache=true&style=flat-square) ](https://github.com/sindresorhus/query-string)

아임포트 리액트 네이티브 모듈 설정 안내입니다.

## 설정하기(IOS)

IOS에서 아임포트 결제연동 모듈을 사용하기 위해서는 아래 3가지 항목을 설정해주셔야 합니다.

#### 1. App Scheme 등록
외부 결제 앱(예) 페이코, 신한 판 페이)에서 결제 후 돌아올 때 사용할 URL identifier를 설정해야합니다.
![](src/img/app-scheme-registry.gif)
1. `[프로젝트 폴더]/ios/[프로젝트 이름]/info.plist` 파일을 연 후 `URL types`속성을 추가합니다.
2. item `0`를 확장하여 `URL schemes`를 선택합니다.
3. item `0`에 App Scheme을 작성합니다.


#### 2. 외부 앱 리스트 등록
3rd party앱(예) 간편결제 앱)을 실행할 수 있도록 외부 앱 리스트를 등록해야합니다. 
1. `[프로젝트 폴더]/ios/[프로젝트 이름]/info.plist` 파일을 오픈합니다.
2. [LSApplicationQueriesSchemes](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW14)속성을 추가하고 아래에 외부 앱 리스트를 등록합니다.
```html
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>kakao0123456789abcdefghijklmn</string>
  <string>kakaokompassauth</string>
  <string>storykompassauth</string>
  <string>kakaolink</string>
  <string>kakaotalk</string>
  <string>kakaostory</string>
  <string>storylink</string>
  <string>payco</string>
  <string>kftc-bankpay</string>
  <string>ispmobile</string>
  <string>itms-apps</string>
  <string>hdcardappcardansimclick</string>
  <string>smhyundaiansimclick</string>
  <string>shinhan-sr-ansimclick</string>
  <string>smshinhanansimclick</string>
  <string>kb-acp</string>
  <string>mpocket.online.ansimclick</string>
  <string>ansimclickscard</string>
  <string>ansimclickipcollect</string>
  <string>vguardstart</string>
  <string>samsungpay</string>
  <string>scardcertiapp</string>
  <string>lottesmartpay</string>
  <string>lotteappcard</string>
  <string>cloudpay</string>
  <string>nhappvardansimclick</string>
  <string>nonghyupcardansimclick</string>
  <string>nhallonepayansimclick</string>
  <string>citispay</string>
  <string>citicardappkr</string>
  <string>citimobileapp</string>
  <string>itmss</string>
  <string>lpayapp</string>
  <string>kpay</string>
</array>
```


#### 3. App Transport Security 설정
![](src/img/allow-arbitrary.gif)
1. `[프로젝트 폴더]/ios/[프로젝트 이름]/info.plist` 파일을 오픈합니다.
2. `App Transport Security` 속성을 추가합니다.
3. 하부 속성에 `Allow Arbitrary Loads in Web Content`,`Allow Arbitrary Loads` 속성을 추가하고 각각의 값(value)을 `YES`로 변경합니다.
4. 설정된 결과는 아래와 같습니다.
```html
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoadsInWebContent</key>
  <true/>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```