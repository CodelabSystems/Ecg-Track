import {View, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom';
import {useTheme} from 'react-native-paper';
import {Iconify} from 'react-native-iconify';
import {fonts} from '../../customText/fonts.js';
import CustomText from '../../customText/CustomText.js';
import UAProfile from '../AppNavigator.js';
import Home from './UserHome.js';
import Prediction from '../About.js';

const Bottom = createBottomTabNavigator();
const MyIcons = (route, focused, theme) => {
  let icons;
  let size = 25;

  if (route.name === 'Home') {
    icons = focused ? (
      <Iconify
        icon="solar:home-5-linear"
        size={28}
        color={theme.colors.appColor}
      />
    ) : (
      <Iconify
        icon="solar:home-1-linear"
        size={size}
        color={theme.colors.outline}
      />
    );
  } 
  
  else if (route.name === 'Prediction') {
    icons = focused ? (
      <Iconify
        icon="fluent:10-regular"
        size={30}
        color={theme.colors.appColor}
      />
    ) : (
      <Iconify
        icon="fluent:-20-regular"
        size={26}
        color={theme.colors.outline}
      />
    )}
   else if (route.name === 'Profile') {
    icons = focused ? (
      <Iconify
        icon="person-28-regular"
        size={30}
        color={theme.colors.appColor}
      />
    ) : (
      <Iconify
        icon="fluent:person-28-regular"
        size={26}
        color={theme.colors.outline}
      />
    );
  }

  return (
    <>
      {focused && (
        <View
          style={{backgroundColor: theme.colors.appcolor}}
          className="absolute h-1 w-3/4 bg-appcolor-900 top-[-5] rounded"
        />
      )}
      <View className={`items-center p-1.5 px-5 rounded-full`}>{icons}</View>
    </>
  );
};

const CustomTabBarLabel = ({focused, label, theme}) => {
  // const activeColor = !focused ? 'text-appcolor-400' : 'text-appcolor-200'; // Custom Tailwind color classes
  const activeColor = focused ? theme.colors.appColor : 'grey'; // Custom Tailwind color classes
  return (
    <View style={{alignItems: 'center'}}>
      {focused ? (
        <CustomText
          className={`text-[11px] pb-1`}
          style={{color: activeColor, fontFamily: fonts.SemiBold}}>
          {label}
        </CustomText>
      ) : (
        <CustomText
          className={`text-[11px] pb-1`}
          style={{color: activeColor, fontFamily: fonts.SemiBold}}>
          {label}
        </CustomText>
      )}
    </View>
  );
};

const BottomNavigator = () => {
  const theme = useTheme();
  return (
    <>
      <Bottom.Navigator
        screenOptions={({route}) => ({
          headerShown: false, // Hide headers
          tabBarIcon: ({focused}) => MyIcons(route, focused, theme),
          tabBarHideOnKeyboard:true,
          tabBarActiveTintColor: theme.colors.appcolor, // Active icon color
          tabBarLabel: ({focused}) => (
            <CustomTabBarLabel
              label={route.name}
              focused={focused}
              theme={theme}
            />
          ),
        })}>
        <Bottom.Screen name="Home" component={Home} />
        <Bottom.Screen name="Prediction" component={Prediction} />
        <Bottom.Screen name="Profile" component={UAProfile} />
      </Bottom.Navigator>
    </>
  );
};
export default BottomNavigator;

const styles = StyleSheet.create({
  noConnectionView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  contentView: {
    padding: 2,
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 28,
    textAlign: 'center',
  },
  childText: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  BtnView: {
    borderRadius: 8,
  },
  BtnText: {
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
