import {StyleSheet} from 'react-native';
import React from 'react';
import {Incubator} from 'react-native-ui-lib';
import {useAppDispatch, useAppSelector} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';

const ToastCustom = ({
  isVisible,
  msg,
  preset,
}: {
  isVisible: boolean;
  msg: string;
  preset: Incubator.ToastPresets;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Incubator.Toast
      visible={isVisible}
      position={'bottom'}
      message={msg}
      action={{
        label: 'Đóng',
        onPress: () => {
          dispatch(
            showToast({
              isShown: false,
              msg: '',
              preset: Incubator.ToastPresets.FAILURE,
            }),
          );
        },
        labelProps: {
          style: {
            fontFamily: 'SofiaPro-Medium',
          },
        },
      }}
      zIndex={99}
      preset={preset}
      onDismiss={() => {
        dispatch(
          showToast({
            isShown: false,
            msg: '',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      }}
      autoDismiss={3500}
      messageStyle={{
        fontFamily: 'SofiaPro-Medium',
        fontSize: 16,
      }}
    />
  );
};

export default ToastCustom;

const styles = StyleSheet.create({});
