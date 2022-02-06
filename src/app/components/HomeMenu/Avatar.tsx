import {Image, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

export interface IAvatar {
  customStyle?: StyleProp<ViewStyle>;
}

const Avatar = ({customStyle}: IAvatar) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MyProfile');
      }}>
      <View style={[styles.avatar, customStyle]}>
        <Image assetName="avatar" assetGroup="images" />
      </View>
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
