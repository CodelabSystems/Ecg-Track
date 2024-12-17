import React, {useContext, useEffect} from 'react';
import {AuthContextProvider} from '../.././src/context/GlobaContext';
import AppNavigator from './src/AppNavigator';
import {ThemeContext, ThemeProvider} from './src/context/ThemeProvider';

export default function App() {
  return (
    <>
        <ThemeProvider>
          <AppWithTheme />
        </ThemeProvider>
    </>
  );
}

function AppWithTheme() {
  if (!theme) {
    return ; // or a loading spinner if desired
  }
  return (
    <>
      <AuthContextProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </AuthContextProvider>
    </>
  );
}
