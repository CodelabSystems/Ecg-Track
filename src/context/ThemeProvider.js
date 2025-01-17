import React, {createContext, useState, useEffect, useMemo} from 'react';
import {Appearance} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';
// Define custom themes with onboarding background colors
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: '#4a51a3', // Deep Blue
    blackGrey: '#2F2F2F',
    lightGrey: 'rgba(246, 246, 245, 0.835)',
    onlightGrey: 'rgba(57, 57, 57, 0.752)',
    transpgrey: 'rgba(228, 228, 227, 0.835)',

    green: '#a2dea4',
    error: '#dea4aa',

    sheetGreen: '#c8e9ca',
    appColor: '#78B3CE',
    appLight: '#cde5f5',
    rate: '#FFD700',
  },
  roundness: 6,
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    sheetGreen: '#163717',
    appColor: '#78B3CE',
    appLight: '#cde5f5',
    rate: '#FFD700',
  },
  roundness: 6,
};

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, [ThemeContext]);


  const currentTheme = useMemo(
    () => (theme === 'dark' ? darkTheme : lightTheme),
    [theme]
  );
  

  return (
    <ThemeContext.Provider value={{theme: currentTheme}}>
 
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
