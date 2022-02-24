import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {
  BASE_URL_RESETPASS_GET_CODE,
  BASE_URL_RESETPASS_SET_PASS,
} from '../../api/constants';
import {useAppDispatch} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';
import {setLoading} from '../../redux/slices/loadingSlice';

const SetNewPassword = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<MainStackParamList, 'SetNewPassword'>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: route.params.email,
      code: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );
    axios
      .post(BASE_URL_RESETPASS_SET_PASS, {
        email: data.email,
        code: data.code,
        password: data.password,
      })
      .then((res: any) => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        dispatch(
          showToast({
            msg: 'Đặt lại mật khẩu thành công. Vui lòng thử đăng nhập lại!',
            preset: Incubator.ToastPresets.SUCCESS,
            isShown: true,
          }),
        );
        navigation.navigate('Login');
      })
      .catch((error: any) => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        let msg = 'Đã có lỗi xảy ra. Vui lòng thử lại!';
        console.log(error.response);

        switch (error.response.data.code) {
          case 'bad_email':
            msg = 'Không tìm thấy người dùng với địa chỉ email này.';
          case 'bad_request':
            msg = 'Mã đặt lại được cung cấp không hợp lệ. Bạn còn 2 lần thử.';
            break;
        }
        dispatch(
          showToast({
            msg,
            preset: Incubator.ToastPresets.FAILURE,
            isShown: true,
          }),
        );
      });
  };

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        msg: `${data.email ? data.email.message : ''}`,
        preset: Incubator.ToastPresets.FAILURE,
        isShown: true,
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
          Đặt lại mật khẩu
        </Text>
        <Text gray2 marginB-32 style={styles.desc}>
          Hãy nhập mật khẩu với và mã code đã nhận được ở email{' '}
          <Text primary textBold>
            {route.params.email}
          </Text>
        </Text>
        <View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Trường này không được bỏ trống',
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Định dạng email chưa đúng.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Incubator.TextField
                floatOnFocus={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                labelStyle={styles.label}
                placeholder={'Nhập email của bạn'}
                placeholderTextColor={'#ADADB8'}
                editable={false}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Trường này không được bỏ trống',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Incubator.TextField
                floatOnFocus={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                labelStyle={styles.label}
                placeholder={'Nhập code nhận ở email của bạn'}
                placeholderTextColor={'#ADADB8'}
              />
            )}
            name="code"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Trường này không được bỏ trống',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  'Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 ký tự viết hoa, 1 số và 1 ký tự đặc biệt.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Incubator.TextField
                floatOnFocus={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                labelStyle={styles.label}
                placeholder={'Nhập mật khẩu mới của bạn'}
                placeholderTextColor={'#ADADB8'}
                secureTextEntry={true}
              />
            )}
            name="password"
          />

          <View center>
            <Button
              bg-primary
              style={styles.btnLogin}
              onPress={handleSubmit(onSubmit, onInvalid)}>
              <Text white style={styles.btnLoginText}>
                Đặt lại mật khẩu
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SetNewPassword;

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
  label: {
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
    color: '#ADADB8',
    marginBottom: 12,
  },
});
