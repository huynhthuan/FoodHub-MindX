import {
  Button,
  Image,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {Controller, useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';
import axios from 'axios';
import {BASE_URL} from '../../api/constants';
import {setLoading} from '../../redux/slices/loadingSlice';

const BindPhone = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      phone: '',
    },
  });
  async function verifyPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      dispatch(
        setLoading({
          isShown: false,
        }),
      );
      navigation.navigate('Verification', {confirmation, phoneNumber});
    } catch (error) {
      dispatch(
        setLoading({
          isShown: false,
        }),
      );
      dispatch(
        showToast({
          isShown: true,
          msg: `${error}`,
          preset: Incubator.ToastPresets.FAILURE,
        }),
      );
    }
  }

  const onSubmit = async (data: any) => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );
    axios
      .get(BASE_URL + 'helper/checkExistPhone', {
        params: {
          phone: data.phone,
        },
      })
      .then(res => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        if (res.data.length) {
          dispatch(
            showToast({
              isShown: true,
              msg: `Phone number is exist. Please try other phone number!`,
              preset: Incubator.ToastPresets.FAILURE,
            }),
          );
        } else {
          verifyPhoneNumber(data.phone);
        }
      })
      .catch(error => {
        console.log(error);

        dispatch(
          showToast({
            isShown: true,
            msg: `${error.data}`,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  };

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        isShown: true,
        msg: `${data.phone ? 'Phone: ' + data.phone.message : ''}`,
        preset: Incubator.ToastPresets.FAILURE,
      }),
    );
  };

  return (
    <View flex bg-primaryDark padding-20>
      <View row spread style={styles.decorTop}>
        <Image assetName="signUpDecorTopLeft" assetGroup="images" />
        <Image assetName="signUpDecorTopRight" assetGroup="images" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text white marginB-20 style={styles.title}>
          Bind Phone Number
        </Text>
        <Text gray2 marginB-32 style={styles.desc}>
          Enter your phone number to link with your account.
        </Text>
        <View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required.',
              },
              pattern: {
                value: /(\+84|0[3|5|7|8|9])+([0-9]{9})\b/i,
                message: 'Your phone incorrect format.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Incubator.TextField
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={'#ADADB8'}
                keyboardType="phone-pad"
              />
            )}
            name="phone"
          />

          <View center>
            <Button
              bg-primary
              style={styles.btnLogin}
              onPress={handleSubmit(onSubmit, onInvalid)}>
              <Text white style={styles.btnLoginText}>
                Send
              </Text>
            </Button>
          </View>

          <TouchableOpacity center marginT-10>
            <Text
              textBold
              gray2
              onPress={() => {
                navigation.navigate('DashBoard');
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BindPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  decorTop: {
    width: getScreenWidth(),
    position: 'absolute',
  },
  bar: {
    width: 84,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 36.4127,
    lineHeight: 43.7,
  },
  desc: {
    fontSize: 13,
    maxWidth: 284,
    fontFamily: 'SofiaPro-SemiBold',
    lineHeight: 16.99,
  },
  input: {
    width: '100%',
    height: 65,
    lineHeight: 17,
    backgroundColor: '#393948',
    borderRadius: 14,
    marginBottom: 29,
    paddingHorizontal: 20,
    fontSize: 17,
    color: '#ffffff',
  },
  btnLogin: {
    height: 65,
    borderRadius: 28.5,
    width: 248,
  },
  btnLoginText: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'SofiaPro-SemiBold',
  },
});
