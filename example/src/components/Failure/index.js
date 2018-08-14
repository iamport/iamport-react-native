
import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

class Failure extends React.Component {
  static nativationOptions = {
    title: 'Failure'
  }

  render() {
    const { navigation } = this.props;
    const error_msg = navigation.getParam('error_msg');
    const imp_uid = navigation.getParam('imp_uid');
    const merchant_uid = navigation.getParam('merchant_uid');
    return (
      <View style={styles.container}>
        <Text style={styles.title}><Text style={styles.emoji}>❗</Text> 결제에 실패하였습니다.</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.name}>아임포트 번호</Text>
            <Text style={styles.value}>{imp_uid || '없음'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.name}>주문 번호</Text>
            <Text style={styles.value}>{merchant_uid || '없음'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.name}>에러 메시지</Text>
            <Text style={styles.value}>{error_msg || '없음'}</Text>
          </View>
        </View>
        <View style={styles.button}>
          <Button 
            title='돌아가기' 
            color='#333'
            onPress={() => navigation.push('Home')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  emoji: {
    color: '#F94733'
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

export default Failure;