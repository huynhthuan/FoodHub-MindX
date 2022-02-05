import {Image, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {SideMenuStackList} from '../../screens/DashBoard';

export interface IAvatar {
  customStyle?: StyleProp<ViewStyle>;
}

const Avatar = ({customStyle}: IAvatar) => {
  const navigation = useNavigation<DrawerNavigationProp<SideMenuStackList>>();

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
