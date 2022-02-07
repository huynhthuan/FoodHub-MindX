import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import Quantity from './Quantity';
import {getScreenWidth} from '../../utilities/helpers';

const ItemCart = () => {
  return (
    <View row marginB-20 paddingH-25>
      <TouchableOpacity style={styles.btnClose} center>
        <Image assetName="cartClose" assetGroup="icons" />
      </TouchableOpacity>
      <View style={styles.imageWrap} marginR-27>
        <Image assetName="avatar" assetGroup="images" style={styles.image} />
      </View>
      <View style={styles.meta}>
        <Text white textSemiBold marginB-8 style={styles.name}>
          Red n hot pizza <Text primary>x 1</Text>
        </Text>
        <Text gray2 textLight marginB-10 style={styles.addOn}>
          Spicy chicken <Text primary>x 1</Text>, beef <Text primary>x 1</Text>
        </Text>
        <View row spread centerV>
          <Text white textSemiBold style={styles.price}>
            $9.50
          </Text>

          <Quantity />
        </View>
      </View>
    </View>
  );
};

export default ItemCart;

const styles = StyleSheet.create({
  imageWrap: {
    width: 82,
    height: 82,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 18,
    lineHeight: 18,
  },
  addOn: {
    fontSize: 12,
    lineHeight: 12,
  },
  price: {
    fontSize: 20.84,
    lineHeight: 23.97,
  },
  meta: {
    width: getScreenWidth() - 50 - 109,
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 25,
    width: 11.77,
    height: 11.77,
    zIndex: 99,
  },
});
