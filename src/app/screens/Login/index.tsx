import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {BASE_URL_JWT_AUTH_GET_TOKEN} from '../../api/constants';
import {useAppDispatch, useAppSelector} from '../../hook';
import {login} from '../../redux/slices/userSlice';
import {setLoading} from '../../redux/slices/loadingSlice';
import {showToast} from '../../redux/slices/toastSlice';

const Login = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [showPass, setShowPass] = React.useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: {email: string; password: string}) => {
    dispatch(setLoading({isShown: true}));

    axios
      .post(BASE_URL_JWT_AUTH_GET_TOKEN, {
        username: data.email,
        password: data.password,
      })
      .then(res => {
        dispatch(setLoading({isShown: false}));
        dispatch(login(res.data));
        navigation.navigate('DashBoard');
      })
      .catch(function (error) {
        dispatch(setLoading({isShown: false}));
        dispatch(
          showToast({
            isShown: true,
            msg: `${error.response.data.message.replace(/<[^>]*>?/gm, '')}`,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  };

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        isShown: true,
        msg: `${data.email ? 'Email: ' + data.email.message : ''}${
          data.password ? '\n' + 'Password: ' + data.password.message : ''
        }`,
        preset: Incubator.ToastPresets.FAILURE,
      }),
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 28,
        }}>
        <View row spread style={styles.decorTop}>
          <Image assetName="signUpDecorTopLeft" assetGroup="images" />
          <Image assetName="signUpDecorTopRight" assetGroup="images" />
        </View>
        <View paddingH-25 paddingT-100>
          <Text white marginB-31 style={styles.title}>
            Login
          </Text>
          <View>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required',
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Incorrect email format.',
                },
              }}
              render={({
                field: {onChange, onBlur, value},
              }: {
                field: {
                  onChange: any;
                  onBlur: any;
                  value: any;
                };
              }) => (
                <Incubator.TextField
                  floatOnFocus={true}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'E-mail'}
                  labelStyle={styles.label}
                  placeholder={'Enter your email'}
                  placeholderTextColor={'#ADADB8'}
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required',
                },
              }}
              render={({
                field: {onChange, onBlur, value},
              }: {
                field: {
                  onChange: any;
                  onBlur: any;
                  value: any;
                };
              }) => (
                <View>
                  <Incubator.TextField
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label={'Password'}
                    labelStyle={styles.label}
                    placeholder={'Password'}
                    placeholderTextColor={'#ADADB8'}
                    secureTextEntry={!showPass}
                  />
                  <TouchableOpacity
                    style={styles.eye}
                    onPressIn={() => {
                      setShowPass(!showPass);
                    }}
                    onPressOut={() => {
                      setShowPass(!showPass);
                    }}>
                    <Image assetName="eye" assetGroup="icons" />
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
          </View>
          <Text
            gray2
            marginB-22
            style={styles.forgotLink}
            onPress={() => {
              navigation.navigate('ResetPassword');
            }}>
            Forgot password?
          </Text>
          <View center marginB-32>
            <Button
              bg-primary
              style={styles.btnLogin}
              onPress={handleSubmit(onSubmit, onInvalid)}>
              <Text white style={styles.btnLoginText}>
                Login
              </Text>
            </Button>
          </View>
          <Text gray3 center>
            Don’t have an account?{' '}
            <Text
              primary
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
  },
  decorTop: {
    width: getScreenWidth(),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bar: {
    width: 84,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  signInText: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 14,
  },
  signInBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signInButtons: {
    width: (getScreenWidth() - 40) / 2 - 7,
    height: 54,
    borderRadius: 27.41,
    paddingHorizontal: 12,
  },
  signInButtonGroup: {
    justifyContent: 'space-between',
  },
  signButtonTitle: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 36.4127,
    lineHeight: 43.7,
  },
  label: {
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
    color: '#ADADB8',
    marginBottom: 12,
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
  eye: {
    position: 'absolute',
    top: 58,
    right: 27.88,
  },
  forgotLink: {
    textAlign: 'right',
    fontFamily: 'SofiaPro-Medium',
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
