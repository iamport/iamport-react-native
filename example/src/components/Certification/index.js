
import React from 'react';

import IMP from 'iamport-react-native';

class Certification extends React.Component {
  static navigationOptions = {
    title: 'Certification'
  }

  callback = (response) => {
    const { navigation } = this.props;
    navigation.push('CertificationResult', response);
  }

  render() {
    const { navigation } = this.props;
    const merchant_uid = navigation.getParam('merchant_uid');
    const min_age = navigation.getParam('min_age');

    const data = { merchant_uid };
    if (min_age) data['min_age'] = min_age;

    return (
      <IMP.Certification 
        userCode={'imp10391932'}
        data={data}
        callback={this.callback}
      />
    );
  }
}

export default Certification;