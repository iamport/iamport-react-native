import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Certification from './Certification';
import CertificationTest from './CertificationTest';
import CertificationResult from './CertificationResult';
import Payment from './Payment';
import PaymentTest from './PaymentTest';
import PaymentResult from './PaymentResult';

const RootStack = createStackNavigator();

export default function IamportNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Certification" component={Certification} />
        <RootStack.Screen
          name="CertificationTest"
          component={CertificationTest}
        />
        <RootStack.Screen
          name="CertificationResult"
          component={CertificationResult}
        />
        <RootStack.Screen name="Payment" component={Payment} />
        <RootStack.Screen name="PaymentTest" component={PaymentTest} />
        <RootStack.Screen name="PaymentResult" component={PaymentResult} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
