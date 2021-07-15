import React from 'react';
import { NativeBaseProvider } from 'native-base';
import IamportNavigation from './NavigationService';

export default function App() {
  return (
    <NativeBaseProvider>
      <IamportNavigation />
    </NativeBaseProvider>
  );
}
