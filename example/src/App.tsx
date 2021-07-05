import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { IamportNavigation } from './NavigationService';

function App() {
  return (
    <NativeBaseProvider>
      <IamportNavigation />
    </NativeBaseProvider>
  );
}

export default App;
