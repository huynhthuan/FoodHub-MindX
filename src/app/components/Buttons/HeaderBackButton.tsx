import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {Button, Image} from 'react-native-ui-lib';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

export interface IButtonback {
  customStyle?: StyleProp<ViewStyle>;
}

const HeaderBackButton = ({customStyle}: IButtonback) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Button
      style={[styles.buttonBack, customStyle]}
      centerH
      centerV
      onPress={() => {
        navigation.goBack();
      }}>
      <Image assetName="arrowLeftNormal" assetGroup="icons" />
    </Button>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  buttonBack: {
    width: 38,
    height: 38,
    backgroundColor: '#393948',
    minWidth: 0,
    borderRadius: 11,
  },
});
