import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText/CustomText';
import Header from '../../Component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../context/GlobaContext';
import {showToast} from '../../../utils/Toast';
import {fonts} from '../../../customText/fonts';

export default function Login() {
  let theme = useTheme();
  const {setIsLogin, Checknetinfo, setUserDetail} = useAuthContext(confirm);
  let navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleLogin = async () => {
    // AsyncStorage.setItem('IsLogin', 'true');
    // setIsLogin(false);
    setSpinner(true);
    if (!email || !password) {
      showToast('All fields are required !');
      setSpinner(false);
      return;
    }

    const isConnected = await Checknetinfo();
    if (!isConnected) {
      setSpinner(false);
      return;
    }

    await CheckDataBase();
  };
  let screenName = 'Login';
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <>
      <Header screenName={screenName} />
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <CustomText
              style={[
                styles.authHead,
                {fontFamily: fonts.Bold, color: theme.colors.appColor},
              ]}>
              Welcome to
            </CustomText>
            <CustomText
              style={[styles.authHead, {fontFamily: fonts.Bold, bottom: 10}]}>
              ECG Track
            </CustomText>
            <CustomText
              style={{
                fontFamily: fonts.Regular,
              }}>
              Your trusted companion for heart health. Sign in to track your
              ECG, monitor symptoms, and connect with experts.
            </CustomText>
          </View>

          {/* Inputs */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.onBackground,
                  borderColor: theme.colors.onBackground,
                },
              ]}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button
              onPress={spinner ? () => {} : handleLogin}
              mode="contained"
              style={[styles.btn, {backgroundColor: theme.colors.error}]}>
              {spinner ? (
                <ActivityIndicator size={24} color={theme.colors.background} />
              ) : (
                <CustomText
                  style={{
                    color: '#fff',
                    fontFamily: fonts.Bold,
                  }}>
                  Login
                </CustomText>
              )}
            </Button>
          </View>

          <View
            style={{
              marginVertical: 2,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomText style={{fontFamily: fonts.LightItalic}}>
              Don't have an account?{' '}
            </CustomText>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  headingContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
  },

  authHead: {
    fontSize: 30,
    // textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  btn: {
    padding: 4,
    marginTop: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
