import {Button, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';
import axios from 'axios';
import {BASE_URL_JSON, BASE_URL_WP_API} from '../../api/constants';
import {setLoading} from '../../redux/slices/loadingSlice';

const ContactUs = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.userSlice);

  const onSubmit = (data: any) => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );
    axios
      .get(BASE_URL_JSON + 'helpers/sendContact', {
        params: {
          post_title: `Email: ${userState.user_email} | SĐT: ${userState.phone}`,
          post_content: data.content,
        },
      })
      .then(res => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        setValue('content', '');
        dispatch(
          showToast({
            msg: 'Gửi liên hệ thành công! Chúng tôi sẽ phản hồi lại bạn sau',
            preset: Incubator.ToastPresets.SUCCESS,
            isShown: true,
          }),
        );
      })
      .catch(error => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        dispatch(
          showToast({
            msg: 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
            preset: Incubator.ToastPresets.FAILURE,
            isShown: true,
          }),
        );
        console.log(error);
      });
  };

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        isShown: true,
        msg: `${data.content ? 'Nội dung: ' + data.content.message : ''}`,
        preset: Incubator.ToastPresets.FAILURE,
      }),
    );
  };

  return (
    <View flex-1 bg-primaryDark paddingT-74>
      <View paddingH-25 marginB-57>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Trường này không được bỏ trống.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Incubator.TextField
              spellCheck={false}
              textAlignVertical={'top'}
              multiline={true}
              containerStyle={styles.textArea}
              style={styles.textAreaWrap}
              value={value}
              onChangeText={onChange}
              placeholder={'Nhập nội dung liên hệ của bạn tại đây...'}
            />
          )}
          name="content"
        />
      </View>
      <View paddingH-25 center>
        <Button
          style={styles.btn}
          bg-primary
          center
          onPress={handleSubmit(onSubmit, onInvalid)}>
          <Text textSemiBold white style={styles.btnText}>
            Gửi đánh giá
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  textArea: {
    height: 300,
    backgroundColor: '#393948',
    borderRadius: 18.21,
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  textAreaWrap: {
    color: '#fff',
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
  },
  btn: {
    width: '100%',
  },
  btnText: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
