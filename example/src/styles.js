
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // 아임포트 결제테스트
  titleContainer: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // 결제 정보 입력 background
  background: {
    backgroundColor: '#fff', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    width: '90%',
    paddingTop: 20, 
    paddingBottom: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff'
  },
  // 결제 정보 입력 row
  row: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  // 테스트 결제 취소 안내 메시지
  warnContainer: {
    width: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 60,
    marginBottom: 10,
  },
  warn: {
    color: '#fa5f60',
    fontSize: 12
  },
  // 가상계좌 (YYYYMMSS) 메시지
  vbankMsgContainer: {
    width: 260,
    top: 0,
    paddingRight: 10,
    left: '50%',
    marginLeft: -130,
    marginBottom: 10,
    position: 'absolute',
    zIndex: 0,
  },
  vbankMsg: {
    height: 40,
    lineHeight: 40,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  // 결제정보 타이틀
  text: {
    width: 60,
    color: '#888',
    fontSize: 12,
  },
  // 결제정보 입력필드
  input: {
    height: 40,
    width: 200,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
  },
  // PG사, 결제수단 선택 목록
  picker: {
    backgroundColor: 'white',
    height: 200,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 3,
    borderColor: '#888',
    borderWidth: 1,
  },
  dropdown: {
    position: 'absolute',
    right: 10,
    top: (38 - 16)/2
  },
  // 모달 닫기(X) 버튼
  closeButton: {
    position: 'absolute',
    marginRight: 30,
    right: 10,
    zIndex: 3,
  },
  // 결제하기 버튼
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#00bfff',
    marginTop: 30,
    marginBottom: 30,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    width: 100,
    borderWidth: 1,
    borderColor: '#00bfff',
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    fontSize: 16
  },
});