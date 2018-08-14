
# iamport-react-native
리액트 네이티브용 아임포트 결제연동 모듈입니다. 안드로이드와 iOS 모두 지원합니다.

## Version
- [v0.8.0](https://github.com/iamport/iamport-react-native)
  - stable 버전으로 안드로이드만 지원합니다.
  - 일반/정기결제 기능만 제공합니다.

- [v1.0.0-beta](https://github.com/iamport/iamport-react-native/tree/feature/merge-android-n-ios) 
  - beta 버전으로 안드로이드와 iOS 모두 지원합니다. 현재 정식 버전으로 패치를 위한 테스트를 진행 중입니다.
  - 일반/정기결제 및 휴대폰 본인인증 기능을 제공합니다.

## Dependencies
![alt text](https://img.shields.io/badge/react-v16.4.2-orange.svg?longCache=true&style=flat-square)
![alt text](https://img.shields.io/badge/react--native-v0.41.2-yellow.svg?longCache=true&style=flat-square)
![alt text](https://img.shields.io/badge/query--string-v6.1.0-green.svg?longCache=true&style=flat-square)

## Install
아래 명령어를 통해 아임포트 모듈을 귀하의 리액트 네이티브 프로젝트에 추가할 수 있습니다.

```
  $ npm install iamport-react-native --save
```

아래 다음 명령어를 통해 아임포트 모듈을 귀하의 Android/IOS 프로젝트에 추가할 수 있습니다.

```
  $ npm install -g react-native-cli
  $ react-native link iamport-react-native
```

## Documentation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `iamport-react-native` and add `IamportReactNative.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libIamportReactNative.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)

#### Android
아임포트 모듈 설치 과정에서 Linking(`$ react-native link iamport-react-native`)을 성공적으로 마쳤다면, 아래 과정을 건너뛰셔도 됩니다.

1. `android/app/src/main/java/[...]/MainApplication.java` 파일을 열어 아래 코드를 추가합니다.
  ```
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
  ```
    ...

    include ':iamport-react-native'
    project(':iamport-react-native').projectDir = new File(rootProject.projectDir,  '../node_modules/iamport-react-native/android')

    ...
  ```

3. `android/app/build.gradle` 파일을 열고 아래 코드를 추가합니다.
  ```
    dependencies {
        ...

        compile project(':iamport-react-native')

        ...
    }
  ```

## Example
#### iOS
- emulator

  아래 명령어를 입력해 iOS emulator를 실행시켜 아임포트 모듈 결제테스트를 진행하실 수 있습니다.
  ```
    $ cd [...]/node_modules/iamport-react-native/example
    $ npm install
    $ react-native run-ios
  ```

- device
  - XCode를 설치합니다.
  - iOS 디바이스를 컴퓨터에 USB로 연결합니다.
  - xcode 프로젝트(`[...]/node_modules/iamport-react-native/example/ios/example.xcodeproj`)를 오픈합니다.
  - 앱을 빌드(`Cmd+R`)합니다.
  - 빌드가 성공하고 디바이스에 example이라는 이름의 앱이 설치된 것을 확인하실 수 있습니다.

#### Android
- [안드로이드 스튜디오를 설치](https://developer.android.com/studio)합니다.
- 안드로이드 프로젝트 폴더(`[...]/node_modules/iamport-react-native/example/android`)를 오픈합니다.
- 안드로이드 디바이스에서 테스트를 원하는 경우, 디바이스를 컴퓨터에 USB로 연결합니다.
- 아래 명령어를 입력하거나 `Cmd+F9`를 눌러 앱을 빌드합니다.
  ```
	$ cd [...]/node_modules/iamport-react-native/example
	$ npm install
	$ react-native run-android
  ```
- AVD Manager([logo]: ./src/img/android-studio-avd-manager.png)를 눌러 안드로이드 emulator를 통해 테스트하실 수도 있습니다.
- 빌드가 성공하고 example이라는 이름의 앱이 설치된 것을 확인하실 수 있습니다.
