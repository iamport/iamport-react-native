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
  PaymentResult: IMPData.PaymentResponse;
};

const RootStack = createStackNavigator<RootStackParamList>();

function IamportNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        // screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Certification"
          component={Certification}
        />
        <RootStack.Screen
          options={{
            headerTitle: '아임포트 본인인증 테스트',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#344e81',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerTintColor: '#fff',
            headerBackTitle: ' ',
          }}
          name="CertificationTest"
          component={CertificationTest}
        />
        <RootStack.Screen
          options={{
            headerTitle: '아임포트 본인인증 결과',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#344e81',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerLeft: () => null,
          }}
          name="CertificationResult"
          component={CertificationResult}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Payment"
          component={Payment}
        />
        <RootStack.Screen
          options={{
            headerTitle: '아임포트 결제 테스트',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#344e81',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerTintColor: '#fff',
            headerBackTitle: ' ',
          }}
          name="PaymentTest"
          component={PaymentTest}
        />
        <RootStack.Screen
          options={{
            headerTitle: '아임포트 결제 결과',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#344e81',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerTintColor: '#fff',
            headerLeft: () => null,
          }}
          name="PaymentResult"
          component={PaymentResult}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export { RootStack, IamportNavigation };
