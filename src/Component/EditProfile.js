import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Animated,
} from 'react-native';
import {TextInput, Button, useTheme} from 'react-native-paper';
import Header from '../Component/Header';
import CustomText from '../customText/CustomText';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../utils/Toast';
import {fonts} from '../customText/fonts';
import {useAuthContext} from '../context/GlobaContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
export default function EditProfile({route}) {
  const {propsData, fromuser, fromdoctor} = route.params || {};
  const {userDetail, CheckDataBase, Checknetinfo, setCount} = useAuthContext();
  const [userData, setUserData] = useState(
    fromuser || fromdoctor ? userDetail : propsData,
  );
  const theme = useTheme();
  let navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});
  let screenName = 'Edit Detail';

  // Prepare the initial form state
  const initialForm = {
    name: userData?.name || '',
    profile_image: userData?.profile_image || '',
  };
  // Conditionally add the 'specialist' field if the user is a doctor
  if (userDetail?.role === 'doctor') {
    initialForm.specialist = userData?.specialist || '';
    initialForm.availableTime = userData?.availableTime || '';
  }
  // Initialize state with the prepared object
  const [form, setForm] = useState(initialForm);

  // Handle input changes for both top-level and nested fields
  const handleInputChange = (field, value, nestedField = null) => {
    if (nestedField) {
      // Update nested fields (e.g., diagnosis type and status)
      setForm(prevForm => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          [nestedField]: value,
        },
      }));
    } else {
      // Update top-level fields
      setForm(prevForm => ({
        ...prevForm,
        [field]: value,
      }));
    }
  };
  // Simple validation function
  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (form.specialist && !form.specialist)
      newErrors.specialist = 'Specialist is required';
    if (
      userDetail?.role == 'doctor' &&
      form?.availableTime?.to < form?.availableTime?.from
    )
      newErrors.availableTime = 'To Time Must be future time than From time';
    else if (!/^\d{10}$/.test(form.contact))
      newErrors.contact = 'Contact number must be 10 digits';
    setErrors(newErrors);
    setSpinner(false);
    return Object.keys(newErrors).length === 0;
  };

  const [fromTime, setFromTime] = useState(new Date());

  const [toTime, setToTime] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const handleFromChange = (event, selectedTime) => {
    setShowFromPicker(false);
  };
  const handleToChange = (event, selectedTime) => {
    setShowToPicker(false);
    if (selectedTime) {
      setToTime(selectedTime);
      // Update the form state with the new "to" time
      setForm(prev => ({
        ...prev,
        availableTime: {
          ...prev.availableTime, // Ensure existing "availableTime" properties are retained
          to: selectedTime.getTime(), // Update only the "to" field
        },
      }));
    }

  const [visible, setVisible] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [previmage, setPrevimage] = useState(null);
  // Function to handle opening the modal with animation
 
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  // Function to pick an image from the library
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        setSelectedImageUri(imageUri);
      }
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Header screenName={screenName} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <TouchableOpacity
            onPress={handlePrevImage}
            activeOpacity={0.8}
            style={styles.imageView}>
            {selectedImageUri ? (
              <Image
                source={{uri: selectedImageUri}}
                style={[
                  styles.profileImage,
                  {borderColor: theme.colors.onBackground},
                ]}
              />
            ) : form?.profile_image?.imageUri ? (
              <Image
                source={{uri: form?.profile_image?.imageUri}}
                style={[
                  styles.profileImage,
                  {borderColor: theme.colors.appcolor},
                ]}
              />
            ) : (
              <Image
                source={require('../../assets/image/defaultAvtar.jpg')}
                style={[
                  styles.profileImage,
                  {borderColor: theme.colors.onBackground},
                ]}
              />
            )}

            <TouchableOpacity onPress={selectImage} style={[styles.editView]}>
              <Iconify
                icon="basil:edit-outline"
                size={25}
                color={theme.colors.outline}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TextInput
            label="Name"
            value={form.name}
            onChangeText={value => handleInputChange('name', value)}
            style={styles.input}
            contentStyle={styles.inputContent}
            mode="outlined"
          />

          {errors.name && (
            <CustomText
              style={[
                styles.errorText,
                {color: theme.colors.error, fontFamily: fonts.Light},
              ]}>
              {errors.name}
            </CustomText>
          )}

          {userDetail?.role == 'doctor' && (
            <>
              <TextInput
                label="Specialist"
                value={form?.specialist}
                onChangeText={value => handleInputChange('specialist', value)}
                style={styles.input}
                contentStyle={styles.inputContent}
                mode="outlined"
              />

              {errors.specialist && (
                <CustomText
                  style={[
                    styles.errorText,
                    {color: theme.colors.error, fontFamily: fonts.Light},
                  ]}>
                  {errors.specialist}
                </CustomText>
              )}
            </>
          )}

          <TextInput
            label="Email"
            value={form.email}
            onChangeText={value => handleInputChange('email', value)}
            style={styles.input}
            contentStyle={styles.inputContent}
            mode="outlined"
            keyboardType="email-address"
          />

          {errors.email && (
            <CustomText
              style={[
                styles.errorText,
                {color: theme.colors.error, fontFamily: fonts.Light},
              ]}>
              {errors.email}
            </CustomText>
          )}

          <TextInput
            label="Password"
            value={form.password}
            onChangeText={value => handleInputChange('password', value)}
            style={styles.input}
            contentStyle={styles.inputContent}
            mode="outlined"
            secureTextEntry
          />

          {errors.password && (
            <CustomText
              style={[
                styles.errorText,
                {color: theme.colors.error, fontFamily: fonts.Light},
              ]}>
              {errors.password}
            </CustomText>
          )}

          <TextInput
            label="Contact Number"
            value={form.contact}
            onChangeText={value => handleInputChange('contact', value)}
            style={styles.input}
            contentStyle={styles.inputContent}
            mode="outlined"
            keyboardType="phone-pad"
          />

          {errors.contact && (
            <CustomText
              style={[
                styles.errorText,
                {color: theme.colors.error, fontFamily: fonts.Light},
              ]}>
              {errors.contact}
            </CustomText>
          )}

          {fromdoctor && userDetail?.role == 'doctor' ? (
            <View style={styles.avlTimeView}>
              <CustomText style={[styles.title, {fontFamily: fonts.SemiBold}]}>
                Available Time
              </CustomText>

              <View style={styles.avlTimeChildView}>
                {/* From Time */}
                <View style={styles.timeContainer}>
                  <CustomText
                    style={[styles.label, {fontFamily: fonts.Medium}]}>
                    From:{' '}
                  </CustomText>
                  <Button
                    style={{backgroundColor: theme.colors.transpgrey}}
                    onPress={() => setShowFromPicker(true)}>
                    <CustomText
                      style={[styles.label, {fontFamily: fonts.Regular}]}>
                      {
                        form?.availableTime?.from
                          ? moment(Number(form?.availableTime?.from)).format(
                              'hh:mm A',
                            ) // Convert to Number and format
                          : moment(fromTime).format('hh:mm A') // Fallback to fromTime
                      }
                    </CustomText>
                  </Button>
                  {showFromPicker && (
                    <DateTimePicker
                      value={fromTime}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={handleFromChange}
                    />
                  )}
                </View>

                {/* To Time */}
                <View style={[styles.timeContainer]}>
                  <CustomText
                    style={[styles.label, {fontFamily: fonts.Medium}]}>
                    To:{' '}
                  </CustomText>
                  <Button
                    style={{backgroundColor: theme.colors.transpgrey}}
                    onPress={() => setShowToPicker(true)}>
                    <CustomText
                      style={[styles.label, {fontFamily: fonts.Regular}]}>
                      {
                        form?.availableTime?.to
                          ? moment(Number(form?.availableTime?.to)).format(
                              'hh:mm A',
                            ) // Convert to Number and format
                          : moment(toTime).format('hh:mm A') // Fallback to fromTime
                      }
                    </CustomText>
                  </Button>
                  {showToPicker && (
                    <DateTimePicker
                      value={toTime}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={handleToChange}
                    />
                  )}
                </View>
              </View>

              {errors.availableTime && (
                <CustomText
                  style={[
                    styles.errorText,
                    {
                      color: theme.colors.error,
                      fontFamily: fonts.Light,
                      top: 10,
                    },
                  ]}>
                  {errors.availableTime}
                </CustomText>
              )}
            </View>
          ) : (
            <></>
          )}

          <TextInput
            numberOfLines={2}
            label="Address"
            value={form.address}
            onChangeText={value => handleInputChange('address', value)}
            style={[styles.input, {height: 100}]}
            contentStyle={styles.inputContent}
            mode="outlined"
          />
          {errors.address && (
            <CustomText
              style={[
                styles.errorText,
                {color: theme.colors.error, fontFamily: fonts.Light},
              ]}>
              {errors.address}
            </CustomText>
          )}

          <TouchableOpacity
            onPress={spinner ? () => {} : handleSubmit}
            style={[
              styles.button,
              {backgroundColor: theme.colors.onBackground},
            ]}>
            {!spinner ? (
              <CustomText
                style={[
                  {
                    color: theme.colors.background,
                    fontSize: 16,
                    fontFamily: fonts.SemiBold,
                  },
                ]}>
                Submit
              </CustomText>
            ) : (
              <ActivityIndicator size={24} color={theme.colors.background} />
            )}
          </TouchableOpacity>

          <ImageModal
            visible={visible}
            image={previmage}
            opacityAnim={opacityAnim}
            setVisible={setVisible}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  inputContent: {
    fontFamily: 'Poppins-Regular', // Replace with the actual font family name
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 12,
    bottom: 10,
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 15,
    alignSelf: 'center',
  },
  editView: {
    alignSelf: 'flex-end',
    right: 14,
    top: -10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    borderWidth: 1,
  },
  avlTimeView: {
    paddingVertical: 16,
    borderRadius: 8,
  },
  avlTimeChildView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Medium',
    fontSize: 18,
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    top: -2,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Regular',
  },
});
