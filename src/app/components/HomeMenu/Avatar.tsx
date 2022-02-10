import {DrawerProps, Image, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SideMenuStackList} from '../../screens/DashBoard';
import {MainStackParamList} from '../../../../App';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../hook';

export interface IAvatar {
  customStyle?: StyleProp<ViewStyle>;
}

const Avatar = ({customStyle}: IAvatar) => {
  const navigationDrawer =
    useNavigation<DrawerNavigationProp<SideMenuStackList>>();
  const userState = useAppSelector(state => state.userSlice);

  return (
    <TouchableOpacity
      onPress={() => {
        navigationDrawer.navigate('MyProfile');
      }}>
      <View style={[styles.avatar, customStyle]}>
        <FastImage
          style={styles.image}
          source={{
            uri: userState.avatar_url
              ? userState.avatar_url
              : 'https://secure.gravatar.com/avatar/c2b06ae950033b392998ada50767b50e?s=96&d=mm&r=g',
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
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
  image: {
    width: '100%',
    height: '100%',
  },
});
