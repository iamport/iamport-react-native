import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IamportNavigation } from './NavigationService';

function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <IamportNavigation />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

export default App;
