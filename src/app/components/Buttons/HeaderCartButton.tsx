import {Colors, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../hook';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const HeaderCartButton = () => {
  const productCartList = useAppSelector(state => state.productCartSlice);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <TouchableOpacity
      bg-dark
      style={styles.btn}
      center
      onPress={() => {
        navigation.navigate('Cart');
      }}>
      <Image
        assetName="cart"
        assetGroup="icons"
        width={16.08}
        height={17.64}
        tintColor={'#fff'}
      />
      <Text textSemiBold center white style={styles.text}>
        {productCartList.ids.length}
      </Text>
    </TouchableOpacity>
  );
};

export default HeaderCartButton;

const styles = StyleSheet.create({
  btn: {
    width: 38,
    height: 38,
    borderRadius: 12,
  },
  text: {
    fontSize: 9,
    width: 13.92,
    height: 13.88,
    borderRadius: 6,
    backgroundColor: '#FFC529',
    position: 'absolute',
    top: -2,
    right: -1.5,
  },
});
