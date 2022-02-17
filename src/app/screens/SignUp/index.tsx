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
                      msg: 'Đăng kí thành công!!!\nChào mừng đến với FoodHub',
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
    dispatch(
      showToast({
        isShown: true,
        msg: `${
          data.userName ? 'Họ và tên: ' + data.userName.message + '\n' : ''
        }${data.email ? 'Email: ' + data.email.message + '\n' : ''}${
          data.password ? 'Mật khẩu: ' + data.password.message + '\n' : ''
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
        contentContainerStyle={{paddingBottom: 28}}>
        <View row spread style={styles.decorTop}>
          <Image assetName="signUpDecorTopLeft" assetGroup="images" />
          <Image assetName="signUpDecorTopRight" assetGroup="images" />
        </View>
        <View paddingH-25 paddingT-100>
          <Text white marginB-31 style={styles.title}>
            Đăng kí
          </Text>
          <View>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Trường này không được để trống.',
                },
                minLength: {
                  value: 2,
                  message: 'Tên tài khoản phải ít nhất có 2 kí tự.',
                },
                maxLength: {
                  value: 32,
                  message: 'Tên tài khoản tối đa 32 kí tự.',
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
                  label={'Tên tài khoản'}
                  labelStyle={styles.label}
                  placeholder={'Nhập tên tài khoản'}
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
                  message: 'Trường này không được để trống',
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Định dạng email không đúng.',
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
                  placeholder={'Nhập email của bạn'}
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
                  message: 'Trường này không được để trống.',
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 ký tự viết hoa, 1 số và 1 ký tự đặc biệt.',
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
                    label={'Mật khẩu'}
                    labelStyle={styles.label}
                    placeholder={'Nhập mật khẩu của bạn'}
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
                Đăng kí
              </Text>
            </Button>
          </View>
          <Text gray3 center marginB-30>
            Bạn đã có tài khoản?{' '}
            <Text
              primary
              onPress={() => {
                navigation.navigate('Login');
              }}>
              Đăng nhập
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
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
