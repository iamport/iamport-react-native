
# 콜백 함수 설정하기
아임포트 리액트 네이티브 모듈 콜백 함수 설정을 위한 안내입니다.

콜백 함수는 필수입력 필드로, 결제/본인인증 완료 후 라우트를 이동하도록 로직을 작성해야합니다. [react-navigation](https://github.com/react-navigation/react-navigation)을 통해 라우터를 변경하는 경우, 아래와 같이 [push 함수](https://reactnavigation.org/docs/en/stack-actions.html#push)가 아닌 [replace 함수](https://reactnavigation.org/docs/en/stack-actions.html#replace)를 사용해야 합니다.
push 함수를 사용할 경우, 결제 완료 후 라우터가 변경되더라도 유저가 뒤로가기를 했을 경우 아임포트 모듈이 다시 렌더링됩니다. 하지만 replace 함수를 사용하면, 결제 완료 후 라우터가 변경되고 유저가 뒤로가기를 하면 원래 결제하기 직전 화면으로 넘어가게 됩니다.

### 잘못된 사용 예제
```javascript
function callback(response) {
  navigation.push('Result', response); // [에러] push 함수 사용
}
```

### 올바른 사용 예제
```javascript
function callback(response) {
  navigation.replace('Result', response);
}
```

### 결과에 따라 로직 작성하기
콜백 함수의 첫번째 인자(response)는 결제/본인인증 결과를 담고 있는 오브젝트로 아래와 같이 구성되어 있습니다. 자세한 내용은 아임포트 공식 문서 [IMP.request_pay - param, rsp 객체 - Callback 함수의 rsp 객제](https://docs.iamport.kr/tech/imp#callback)를 참고해주세요.

| key           |  Description       | 
| ------------- | ------------------ | 
| success       | 성공 여부            |
| imp_uid       | 아임포트 번호         |
| merchant_uid  | 주문번호             |
| error_msg     | 실패한 경우, 에러메시지  |

response에 따라 결제/본인인증 성공/실패 여부를 판단해 아래와 같이 각기 다른 로직을 구성할 수 있습니다. 아래 코드는 예시일 뿐 실제 결제 성공/실패여부는 결제 유효성 검사 후 아임포트 REST API로 결제내역을 조회해 판단해야 합니다. 자세한 내용은 아임포트 공식 문서 [일반결제 연동하기 - STEP5. 서버에서 거래 검증 및 데이터 동기화](https://docs.iamport.kr/implementation/payment#server-side-logic)를 참고해주세요.

```javascript
import React from 'react';
import { View, Text } from 'react-native';

function Result({ navigation }) {
  const success = navigation.getParam('success');
  const imp_uid = navigation.getParma('imp_uid');
  const merchant_uid = navigation.getParma('merchant_uid');

  return (
    <View>
      <Text>{`결제/본인인증에 ${success ? '성공' : '실패'}하였습니다.`}</Text>
      <View>
        <View>
          <Text>아임포트 번호</Text>
          <Text>{imp_uid || '없음'}</Text>
        </View>
        <View>
          <Text>주문 번호</Text>
          <Text>{merchant_uid || '없음'}</Text>
        </View>
        {
          !success && 
          <View>
            <Text>에러 메시지</Text>
            <Text>{error_msg || '없음'}</Text>
          </View>
        }
      </View>
    </View>
  );
}

export default Result;
```