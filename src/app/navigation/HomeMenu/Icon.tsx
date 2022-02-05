import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ImageStyle, StyleProp, StyleSheet} from 'react-native';

export interface IIconHomeMenu {
  iconName: string;
  focused: boolean;
  styleCustom?: StyleProp<ImageStyle>;
}

const Icon = ({iconName, focused, styleCustom}: IIconHomeMenu) => {
  return (
    <Image
      assetName={iconName}
      style={[
        styles.icon,
        {tintColor: focused ? '#ffffff' : 'rgba(173, 173, 184, 0.7)'},
        styleCustom,
      ]}
      assetGroup="icons"
    />
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {},
});
