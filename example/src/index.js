/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './components/Home';
import Payment from './components/Payment';
import Failure from './components/Failure';

export default createStackNavigator({
  Home: { screen: Home },
  Payment: { screen: Payment },
  Failure: { screen: Failure }
});

