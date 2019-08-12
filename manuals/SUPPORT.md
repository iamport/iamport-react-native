# 지원정보

아임포트 리액트 네이티브가 지원하는 PG사 및 결제수단 안내입니다.

## 지원 PG사 및 결제수단
| pg           | 이름                 |  결제수단                                                                                          |  
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------ | 
| html5_inicis | 웹 표준 이니시스        | 신용카드, 가상계좌, 실시간 계좌이체(IOS 별도 설정 필요), 휴대폰 소액결제, 삼성페이, KPAY, 문화상품권, 스마트문상, 해피머니 |
| kcp          | NHN KCP             | 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제, 삼성페이                                                 |
| kcp_billing  | NHN KCP 정기결제      | 신용카드                                                                                           |
| uplus        | LG 유플러스           | 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제, 문화상품권, 스마트문상, 도서상푼권                              |
| jtnet        | JTNET               | 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제                                                         |
| nice         | 나이스 정보통신         | 신용카드, 가상계좌, 실시간 계좌이체(IOS 별도 설정 필요), 휴대폰 소액결제                                        |
| kakaopay     | 신 - 카카오페이        | 신용카드                                                                                           |
| kakao        | 구 - LG CNS 카카오페이 | 신용카드                                                                                           |
| danal        | 다날 휴대폰 소액결제     | 휴대폰 소액결제                                                                                     |
| danal_tpay   | 다날 일반결제          | 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제                                                         |
| kicc         | 한국정보통신           | 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제                                                         |
| paypal       | 페이팔               | 신용카드                                                                                           |
| mobilians    | 모빌리언스            | 신용카드, 가상계좌(준비중), 실시간 계좌이체(준비중), 휴대폰 소액결제                                             |
| payco        | 페이코               | 신용카드                                                                                           |
| settle       | 세틀뱅크             | 가상계좌                                                                                            |
| naverco      | 네이버 체크아웃        | 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제                                                          |
| naverpay     | 네이버페이            | 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제                                                          |
| smilepay     | 스마일페이            | 신용카드                                                                                            |

## 실시간 계좌이체 별도 설정

### 1. IOS
IOS에서 `웹 표준 이니시스(이하 이니시스)` 또는 `나이스 정보통신(이하 나이스)` `실시간 계좌이체`를 연동하는 경우 별도 설정이 요구됩니다. 이니시스는 결제완료 후 콜백이 실행되지 않고, 나이스는 결제인증 후 결제완료 처리가 되지 않기 때문입니다. 이는 이니시스와 나이스 결제모듈의 문제입니다. 아임포트 리액트 네이티브(이하 RN) 모듈은 이에 대응하기 위한 안내를 제공하고 있습니다.

#### 실시간 계좌이체 결제처리 원리
먼저 뱅크페이 앱에서 귀하의 앱으로 복귀할때를 트리거해야 합니다. 아임포트 RN 모듈은 트리거 된 순간 이니시스의 경우 콜백을 실행시키고, 나이스의 경우 나이스로 결제정보가 담긴 POST 요청을 보냅니다. Objective C는 들어오는(incoming) 앱 링크를 트리거 하기 위해 `openURL` 메소드를 제공합니다. 이때 RN `Linking`을 활용해 RN단에서 들어오는 앱 링크를 트리거 하게 만들 수 있습니다. 자세한 내용은 [RN Linking](https://facebook.github.io/react-native/docs/linking)을 참고하세요.

#### 프로젝트에 openURL 메소드 추가하기
귀하의 프로젝트에 openURL 메소드를 추가하는 방법은 총 2가지입니다.

1. 귀하의 `*AppDelegate.m` 파일에 아래 코드를 복사합니다.

```objectivec
// iOS 9.x or newer
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

```objectivec
// iOS 8.x or older
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

2. 귀하의 프로젝트에 아임포트 RN 모듈 예제 프로젝트 AppDelegate 파일을 추가합니다.
- 귀하의 Xcode 프로젝트를 오픈합니다.
- 왼쪽 프로젝트 네비게이터에서 귀하의 타깃에 커서를 두고 마우스 오른쪽 버튼을 클릭합니다.
- 하위 메뉴에서 `New File...`를 클릭합니다.
- `Header File`을 선택하고 Next 버튼을 누릅니다.
![](../src/img/ios-trans-create-header-file-1.png)
- 파일 이름을 적는 란에 `AppDelegate+Iamport`를 입력하고 Create 버튼을 누릅니다.

![](../src/img/ios-trans-create-header-file-2.png)

- 생성된 `AppDelegate+Iamport.h` 파일에 아래 코드(iamport-react-native/example/ios/AppDelegate+Iamport.h)를 복사합니다.
```objectivec
#ifndef AppDelegate_Iamport_h
#define AppDelegate_Iamport_h

#import "AppDelegate.h"

@interface AppDelegate (프로젝트 이름)

@end

#endif
```
- 같은 방식으로 귀하의 타깃에서 마우스 오른쪽 버튼 클릭 후 `New File...`를 클릭합니다.
- `Objective-C File`을 클릭하고 Next 버튼을 누릅니다.
![](../src/img/ios-trans-create-objectivec-file-1.png)
- 파일 이름을 적는 란에 `AppDelegate+Iamport`를 입력하고 Next 버튼을 누릅니다.
![](../src/img/ios-trans-create-objectivec-file-2.png)
- 마지막 화면에서 Create 버튼을 누릅니다.
- 생성된 AppDelegate+Iamport.m 파일에 아래 코드(iamport-react-native/example/ios/AppDelegate+Iamport.m)를 복사합니다.
```objectivec
#import "AppDelegate+Iamport.h"
#import <React/RCTLinkingManager.h>

@implementation AppDelegate (프로젝트 이름)

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

@end
```
- 생성된 결과는 아래와 같습니다.
![](../src/img/ios-trans-result.png)

## 2. Android
Android에서는 `나이스` `실시간 계좌이체`를 연동하는 경우 IOS와 같은 이유로 별도 설정이 요구됩니다. `이니시스`만 연동하는 경우, 아래 내용을 건너뛰셔도 됩니다.

#### 실시간 계좌이체 결제처리 원리
IOS와 동일하게 뱅크페이 앱에서 귀하의 앱으로 복귀할때를 트리거해야 합니다. 아임포트 RN 모듈은 트리거 된 순간 나이스로 결제정보가 담긴 POST 요청을 보냅니다. Java는 들어오는(incoming) 앱 링크를 트리거 하기 위해 deep Linking 기능을 제공합니다. deep Linking 기능을 활성화하기 위해 `Intent Filter`를 추가하고 `MainActivity`의 `launchMode`를 아래와 같이 `singleTask`로 설정해야 합니다. 자세한 내용은 [RN Linking](https://facebook.github.io/react-native/docs/linking)을 참고하세요.

```xml
...
<!-- MainActivity의 launchMode를 singleTask로 설정 -->
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask"
>
  ...
  <!-- Intent Filter 추가 -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data android:scheme="example" />
  </intent-filter>
</activity>
...
```