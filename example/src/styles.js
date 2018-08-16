
import { StyleSheet } from 'react-native';

/* 타이틀 */
const title = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'  
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,  
  }
});

/* 버튼 */
const button = StyleSheet.create({
  box: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 30,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#00bfff',
    borderRadius: 3,
  },
  text: {
    fontWeight: 'bold', 
    textAlign: 'center', 
    fontSize: 14,  
  }
});

/* 결제하기/본인인증 하기 버튼 */
const actionButton = StyleSheet.create({
  box: {
    ...button.box,
    backgroundColor: '#00bfff',
    width: 100,
  },
  text: {
    ...button.text,
    color: '#fff'
  }
});

/* 결제/본인인증 정보 */
const info = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  text: {
    width: 60, 
    color: '#888', 
    fontSize: 12, 
  },
  input: {
    height: 40,
    width: 200,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
  },
});

/* 결제/본인인증 결과 */
const result = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  failure: {
    color: '#F94733'
  },
  success: {
    color: '#26D090'
  },
  table: {
    borderColor: '#888',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#888'
  },
  name: {
    flex: 2,
    padding: 10,
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#888',
    backgroundColor: '#f5f5f5',
  },
  value: {
    flex: 3,
    padding: 10,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 3,
    fontSize: 14,
  }
});

const CommonStyles = StyleSheet.create({
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
  picker: { // PG사, 결제수단 선택 목록
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
  closeButton: { // 모달 닫기(X) 버튼
    position: 'absolute',
    marginRight: 30,
    right: 10,
    zIndex: 3,
  },
});

const { background } = CommonStyles;
export {
  title,
  background,
  info,
  button,
  actionButton,
  result,
  CommonStyles
}
