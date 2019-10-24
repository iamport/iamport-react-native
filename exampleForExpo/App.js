import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Container } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Header from './src/Header';
import Home from './src/Home';
import PaymentTest from './src/PaymentTest';
import Payment from './src/Payment';
import PaymentResult from './src/PaymentResult';
import CertificationTest from './src/CertificationTest';
import Certification from './src/Certification';
import CertificationResult from './src/CertificationResult';

import NavigationService from './src/NavigationService';

const noHeader = {
  headerStyle: {
    height: 0,
  },
};

const hideHeader = {
  header: null,
};

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: noHeader,
  },
  PaymentTest: {
    screen: PaymentTest,
    navigationOptions: hideHeader,
  },
  Payment: {
    screen: Payment,
    navigationOptions: noHeader,
  },
  PaymentResult: {
    screen: PaymentResult,
    navigationOptions: hideHeader,
  },
  CertificationTest: {
    screen: CertificationTest,
    navigationOptions: hideHeader,
  },
  Certification: {
    screen: Certification,
    navigationOptions: noHeader,
  },
  CertificationResult: {
    screen: CertificationResult,
    navigationOptions: hideHeader,
  },
}, {
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  const [isHeaderShow, setIsHeaderShow] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Home');

  useEffect(() => {
    loadFont();
  }, []);

  useEffect(() => {
    let headerTitle = '';
    let isHeaderShow = true;
    if (currentScreen === 'PaymentTest') {
      headerTitle = '아임포트 결제 테스트';
    } else if (currentScreen === 'CertificationTest') {
      headerTitle = '아임포트 본인인증 테스트';
    } else {
      isHeaderShow = false;
    }

    setIsHeaderShow(isHeaderShow);
    setHeaderTitle(headerTitle);
  }, [currentScreen]);

  function handleNavigation(prevState, newState) {
    const { routes } = newState;
    const { routeName } = routes[routes.length - 1];
    if (currentScreen !== routeName) {
      setCurrentScreen(routeName);
    }
  }

  async function loadFont() {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }

  return (
    <Container>
      {isHeaderShow && <Header title={headerTitle} />}
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={handleNavigation}
      />
    </Container>
  );
}
