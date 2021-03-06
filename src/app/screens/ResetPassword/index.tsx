import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {BASE_URL_RESETPASS_GET_CODE} from '../../api/constants';
import {useAppDispatch} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';
import {setLoading} from '../../redux/slices/loadingSlice';

const ResetPassword = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: any) => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );
    axios
      .post(BASE_URL_RESETPASS_GET_CODE, {
        email: data.email,
      })
      .then((res: any) => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        dispatch(
          showToast({
            msg: 'Chúng tôi đã gửi mã xác nhận qua email của bạn. Vui lòng kiểm tra email.',
            preset: Incubator.ToastPresets.SUCCESS,
            isShown: true,
          }),
        );
        navigation.navigate('SetNewPassword', {email: data.email});
      })
      .catch((error: any) => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        let msg = 'Đã có lỗi xảy ra. Vui lòng thử lại!';
        switch (error.response.status) {
          case 500:
            msg = 'Không tìm thấy người dùng với địa chỉ email này.';
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
          Lấy lại mật khẩu
        </Text>
        <Text gray2 marginB-32 style={styles.desc}>
          Hãy nhập email của tài khoản của bạn để nhận mật khẩu mới
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
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
              />
            )}
            name="email"
          />

          <View center>
            <Button
              bg-primary
              style={styles.btnLogin}
              onPress={handleSubmit(onSubmit, onInvalid)}>
              <Text white style={styles.btnLoginText}>
                Gửi mật khẩu mới
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPassword;

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
