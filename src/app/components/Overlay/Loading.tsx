import {Colors, LoaderScreen, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const Loading = ({isShow = false}: {isShow: boolean}) => {
  return (
    <LoaderScreen
      overlay
      backgroundColor={Colors.primaryDark50}
      containerStyle={isShow ? styles.active : styles.deactive}
    />
  );
};

export default Loading;

const styles = StyleSheet.create({
  active: {
    display: 'flex',
  },
  deactive: {
    display: 'none',
  },
});
