import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './Home';
import Payment from './Payment';
import Certification from './Certification';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Payment: {
    screen: Payment,
  },
  Certification: {
    screen: Certification,
  },
}, {
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);
