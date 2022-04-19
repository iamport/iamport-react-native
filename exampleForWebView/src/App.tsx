import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Certification from './Certification';
import Payment from './Payment';

interface HomeParams {
  type: string;
  response: any;
}

interface MessageParams {
  userCode: string;
  data: any;
}

export type RootStackParamList = {
  Home: HomeParams | undefined;
  Certification: MessageParams | undefined;
  Payment: MessageParams | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="Certification"
          component={Certification}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="Payment"
          component={Payment}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
