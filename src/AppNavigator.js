import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/stack';
import onBoardingScreen from './Screen/onBoarding/onBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from './context/GlobaContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import Parent from './Screen/Parent';
import Login from './Screen/Auth/Login';
import Register from './Screen/Auth/Register';
import DoctorList from './Screen/Admin/DoctorList';
import UserList from './Screen/Admin/UserList';
import ControlDoctor from './Screen/Admin/ControlDoctor';
import SingleDoctor from './Screen/Doctor/SingleDoctor';
import BookDoctor from './Screen/Doctor/BookDoctor';
import UAProfile from './Screen/UAProfile';
import HeartPredictionPage from './Screen/User/Prediction';
import UploadForm from './Screen/User/UploadForm';
import AboutPage from './Screen/About';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const {isLogin, userDetail} = useAuthContext();
  let theme = useTheme();
  const [initialScreen,setInitialScreen]=useState("Onboarding")
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        {isLogin || userDetail == null ? (
          <>
           <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Onboarding"
              component={onBoardingScreen}
              options={{headerShown: false}}
            />
           
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Spinner"
              component={Spinner}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Parent"
              component={Parent}
              options={{headerShown: false}}
            />

            {/* Admin */}

            <Stack.Screen
              name="DoctorList"
              component={DoctorList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Prediction"
              component={HeartPredictionPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FormUpload"
              component={UploadForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ControlDoctor"
              component={ControlDoctor}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="UserList"
              component={UserList}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="ControlUser"
              component={ControlUser}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SingleDoctor"
              component={SingleDoctor}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BookDoctor"
              component={BookDoctor}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SingleDetail"
              component={UAProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutPage}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1d', // Dark royal theme
    justifyContent: 'center',
    alignItems: 'center',
  },
});
