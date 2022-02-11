import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {useAppDispatch} from '../../hook';
import {
  BASE_URL_JWT_AUTH_GET_TOKEN,
  BASE_URL_WP_JSON_GET_NONCE,
  BASE_URL_WP_JSON_SIGN_UP,
} from '../../api/constants';
import {setLoading} from '../../redux/slices/loadingSlice';
import {showToast} from '../../redux/slices/toastSlice';
import {login} from '../../redux/slices/userSlice';

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [showPass, setShowPass] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: any) => {
    dispatch(setLoading({isShown: true}));

    axios
      .get(BASE_URL_WP_JSON_GET_NONCE, {
        params: {
          controller: 'user',
          method: 'register',
        },
      })
      .then(res => {
        axios
          .get(BASE_URL_WP_JSON_SIGN_UP, {
            params: {
              username: data.userName,
              user_pass: data.password,
              email: data.email,
              nonce: res.data.nonce,
            },
          })
          .then(res => {
            if (res.data.status === 'ok') {
              axios
                .post(BASE_URL_JWT_AUTH_GET_TOKEN, {
                  username: data.email,
                  password: data.password,
                })
                .then(res => {
                  dispatch(setLoading({isShown: false}));
                  dispatch(login(res.data));
                  dispatch(
                    showToast({
                      isShown: true,
                      msg: 'Sign up successfully!!!\nWelcome to FoodHub',
                      preset: Incubator.ToastPresets.SUCCESS,
                    }),
                  );
                  navigation.navigate('BindPhone');
                });
            } else {
              dispatch(setLoading({isShown: false}));
              dispatch(
                showToast({
                  isShown: true,
                  msg: res.data.error,
                  preset: Incubator.ToastPresets.FAILURE,
                }),
              );
            }
          })
          .catch(error => {
            dispatch(setLoading({isShown: false}));
            dispatch(
              showToast({
                isShown: true,
                msg: error,
                preset: Incubator.ToastPresets.FAILURE,
              }),
            );
          });
      })
      .catch(error => {
        dispatch(setLoading({isShown: false}));
        dispatch(
          showToast({
            isShown: true,
            msg: error,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  };

  const onInvalid = (data: any) => {
    setIsVisible(true);
    setErrorMessage(
      `${data.userName ? 'Full name: ' + data.userName.message + '\n' : ''}${
        data.email ? 'Email: ' + data.email.message + '\n' : ''
      }${data.password ? 'Password: ' + data.password.message + '\n' : ''}`,
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{paddingBottom: 28}}>
        <View row spread style={styles.decorTop}>
          <Image assetName="signUpDecorTopLeft" assetGroup="images" />
          <Image assetName="signUpDecorTopRight" assetGroup="images" />
        </View>
        <View paddingH-25 paddingT-100>
          <Text white marginB-31 style={styles.title}>
            Sign Up
          </Text>
          <View>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                minLength: {
                  value: 2,
                  message: 'Username must have at least 2 characters.',
                },
                maxLength: {
                  value: 32,
                  message: 'Username must have a maximum of 32 characters.',
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
                  label={'User name'}
                  labelStyle={styles.label}
                  placeholder={'Enter user name'}
                  placeholderTextColor={'#ADADB8'}
                />
              )}
              name="userName"
            />

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
                  message: 'This field is required.',
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    'Password must be at least 8 characters, including 1 uppercase letter, 1 number and 1 special character.',
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
                    placeholder={'Enter your password'}
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
          <View center marginB-32>
            <Button
              bg-primary
              style={styles.btnLogin}
              onPress={handleSubmit(onSubmit, onInvalid)}>
              <Text white style={styles.btnLoginText}>
                SIGN UP
              </Text>
            </Button>
          </View>
          <Text gray3 center marginB-30>
            Already have an account?{' '}
            <Text
              primary
              onPress={() => {
                navigation.navigate('Login');
              }}>
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <Incubator.Toast
        visible={isVisible}
        position={'bottom'}
        message={errorMessage}
        action={{
          label: 'Close',
          onPress: () => setIsVisible(false),
          labelProps: {
            style: {
              fontFamily: 'SofiaPro-Medium',
            },
          },
        }}
        zIndex={99}
        preset={Incubator.ToastPresets.FAILURE}
        onDismiss={() => {
          setIsVisible(false);
        }}
        autoDismiss={3500}
        messageStyle={{
          fontFamily: 'SofiaPro-Medium',
          fontSize: 16,
        }}
      />
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
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
