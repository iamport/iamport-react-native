# iamport-react-native
[ ![alt text](https://img.shields.io/badge/react-v16.4.2-orange.svg?longCache=true&style=flat-square) ](https://github.com/facebook/react/)
[ ![alt text](https://img.shields.io/badge/react--native-v0.41.2-yellow.svg?longCache=true&style=flat-square) ](https://github.com/facebook/react-native)
[ ![alt text](https://img.shields.io/badge/query--string-v6.1.0-green.svg?longCache=true&style=flat-square) ](https://github.com/sindresorhus/query-string)

리액트 네이티브용 아임포트 결제연동 모듈 설치 안내입니다.

## 설치하기
아래 명령어를 통해 아임포트 모듈을 귀하의 리액트 네이티브 프로젝트에 추가할 수 있습니다.

```
$ npm install iamport-react-native --save
```

아래 다음 명령어를 통해 아임포트 모듈을 귀하의 안드로이드/IOS 프로젝트에 추가할 수 있습니다.

```
$ npm install -g react-native-cli
$ react-native link iamport-react-native
```

성공적으로 마쳤을 경우, 아래와 같은 화면을 보실 수 있습니다.

![](src/img/after-linking-module.png)

실패한 경우, 아래 과정을 통해 iamport-react-native 모듈을 귀하의 프로젝트에 [수동으로 연결](https://facebook.github.io/react-native/docs/linking-libraries-ios)시킬 수 있습니다.

#### IOS

1. XCode 프로젝트(`[...]/ios/[...].xcodeproj`)를 더블클릭해 오픈합니다.
2. 왼쪽 프로젝트 네비게이터에서, `Libraries` 폴더를 마우스 오른쪽 클릭 ➜ `Add Files to [your project's name]`를 클릭합니다.
3. `[...]/node_modules/iamport-react-native/ios/IamportReactNative.xcodeproj`를 선택해 추가합니다.
4. 왼쪽 프로젝트 네비게이터에서, 귀하의 프로젝트를 클릭 ➜ 오른쪽 상단 `Build Settings`를 클릭합니다.
5. 세번째 메뉴인 `Link Binary With Libraries`를 열어 `libIamportReactNative.a` 파일을 추가합니다.

#### 안드로이드

1. `android/app/src/main/java/[...]/MainApplication.java` 파일을 열어 아래 코드를 추가합니다.
  ```java
  import com.iamport.IamportPackage; // 아임포트 패키지를 불러옵니다.

  ...

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
          new IamportPackage() // 아임포트 패키지를 추가합니다.
    );
  }
  ```

2. `android/settings.gradle` 파일을 열고 아래 코드를 추가합니다.
  ```java
  ...

  include ':iamport-react-native'
  project(':iamport-react-native').projectDir = new File(rootProject.projectDir,  '../node_modules/iamport-react-native/android')

  ...
  ```

3. `android/app/build.gradle` 파일을 열고 아래 코드를 추가합니다.
  ```java
  dependencies {
    ...

    compile project(':iamport-react-native')

    ...
  }
  ```