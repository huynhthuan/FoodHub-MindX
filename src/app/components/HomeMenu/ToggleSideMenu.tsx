import {Image, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SideMenuStackList} from '../../screens/DashBoard';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const ToggleSideMenu = () => {
  const navigation = useNavigation<DrawerNavigationProp<SideMenuStackList>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}>
      <View center style={styles.toggle}>
        <Image assetName="menuSidebar" assetGroup="icons" />
      </View>
    </TouchableOpacity>
  );
};

export default ToggleSideMenu;

const styles = StyleSheet.create({
  toggle: {
    width: 38,
    height: 38,
    backgroundColor: '#393948',
    borderRadius: 12,
  },
});
