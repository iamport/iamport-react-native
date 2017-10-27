# iamport-react-native(Android 미구현)
리액트 네이티브용 아임포트 결제 연동 웹뷰 컴포넌트 라이브러리입니다.

모바일 앱의 웹뷰를 활용하여 결제를 진행하며, PG사에서 제공하는 다양한 결제 앱으로의 자연스러운 이동 처리가 구현되어 있습니다.

(현재 iOS만 구현되어 있습니다. Android는 빠른 시간안에 구현하도록 하겠습니다.)

## 문서 구성
* [설치](#설치)
    * [iOS](#ios)
        1. [App Scheme 등록](#1-app-scheme-등록)
        2. [`LSApplicationQueriesSchemes` 에 외부앱 리스트 추가](#2-lsapplicationqueriesschemes-에-외부앱-리스트-추가)
        3. [App Transport Security 설정](#3-app-transport-security-설정)
    * Android(미구현)
* [사용 방법](#사용-방법)

##  설치
다음의 명령어로 패키지를 설치할 수 있습니다.
```
npm install iamport-react-native
```
### iOS
#### 1. App Scheme 등록
외부 결제 앱(e.g. 페이코, 신한 판 페이)에서 결제 후 돌아올 때 사용할 URL identifier를 설정합니다.
![](./assets/app-scheme-registry.gif)
1. `info.plist` 파일을 연 후 `URL types`속성을 추가합니다.
2. item `0`를 확장하여 `URL schemes`를 선택합니다.
3. item `0`에 원하는 앱 scheme을 작성합니다.

#### 2. `LSApplicationQueriesSchemes` 에 외부앱 리스트 추가
3rd party앱(e.g. 간편결제 앱)을 실행할 수 있도록 [LSApplicationQueriesSchemes](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW14)에 아래의 코드를 `info.plist`에 등록합니다.
```
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
![](./assets/allow-arbitrary.gif)
1. info.plist 파일을 연 후 `App Transport Security`속성을 추가합니다.
2. 하부 속성에 `Allow Arbitrary Loads in Web Content`,`Allow Arbitrary Loads`속성을 추가하고 각각의 값(value)을 `YES`로 변경합니다.

또는

다음 코드를 삽입합니다:
```
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <true/>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### Android
현재 구현되어 있지 않습니다. 빠른 시간안에 구현하도록 하겠습니다.

## 사용 방법
먼저 `iamport-react-native`모듈을 불러옵니다.
```
import IamportPaymentWebview from "iamport-react-native";
```

그 다음 결제 웹뷰를 사용하고자 하는 컴포넌트를 생성한 후 `IamportPaymentWebview`를 렌더링합니다.

#### Example
```
class Payment extends Component {

    handlePaymentSuccess = (response) => {
        console.log("결제 성공!");
    }

    handlePaymentFailure = (response) => {
        console.log("결제 실패!");
    }

    render() {
        const parameters = {
            pg: "html5_inicis",
            app_scheme: "myawesomeapp",
            m_redirect_url: "https://myawesomeapp.com/success",
            pay_method: "card",
            merchant_uid: "merchant_" + new Date().getTime(),
            name: "[CD] 로꼬 (Loco) 1집 - Bleached",
            amount: 14900,
            buyer_email: "customer@gmail.com",
            buyer_name: "김고객",
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 영동대로25길",
            buyer_postcode: "06018",
        };

        return (
            <IamportPaymentWebView
                iamportUserCode="imp00000000" // 가맹점 식별 코드
                parameters={parameters}
                onPaymentSuccess={this.handlePaymentSuccess}
                onPaymentFailure={this.handlePaymentFailure}
            />
        )
    }
}
```
| Property         | type     | Description                                                                                                                                                 |
|------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| iamportUserCode  | string   | 아임포트 가맹점 식별코드. 아임포트에서 제공하는 모듈을 사용할 때 가맹점을 구분하기 위해, 관리자 페이지 가입과 동시에 자동 발급되는 고유한 문자입니다.       |
| parameters       | object   | 결제 요청에 대한 상세 정보. [Param속성](https://github.com/iamport/iamport-manual/tree/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C#211-param-속성공통-속성) |
| onPaymentSuccess | function | (callback function을 지원하는 pg사의 경우) 결제 success인 경우의 callback handler.                                                                          |
| onPaymentFailure | function | (callback function을 지원하는 pg사의 경우) 결제 success가 아닌 경우의 callback handler.                                                                     |