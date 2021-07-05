import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Certification from './Certification';
import CertificationTest from './CertificationTest';
import CertificationResult from './CertificationResult';
import Payment from './Payment';
import PaymentTest from './PaymentTest';
import PaymentResult from './PaymentResult';
import type { IMPData } from 'iamport-react-native';

export interface CertificationParams {
  params: IMPData.CertificationData;
  tierCode?: string;
}

export interface PaymentParams {
  params: IMPData.PaymentData;
  tierCode?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Certification: CertificationParams | undefined;
  CertificationTest: undefined;
  CertificationResult: any;
  Payment: PaymentParams | undefined;
  PaymentTest: undefined;
  PaymentResult: any;
};

const RootStack = createStackNavigator<RootStackParamList>();

function IamportNavigation() {
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

export { RootStack, IamportNavigation };
