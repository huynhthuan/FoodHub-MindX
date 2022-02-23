import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
let numeral = require('numeral');
export interface IIemOrder {
  data: any;
  quantity: number;
}

const ItemOrder = ({data, quantity}: IIemOrder) => {
  return (
    <View row marginB-20 paddingH-25>
      <View style={styles.imageWrap} marginR-27>
        <FastImage
          source={{
            uri: data.images[0].src,
            priority: 'high',
          }}
          style={styles.image}
        />
      </View>
      <View>
        <Text white textSemiBold marginB-8 style={styles.name}>
          {data.name}
          <Text primary> x {quantity}</Text>
        </Text>
        <Text white textSemiBold style={styles.price}>
          {numeral(data.price).format('0,0')} VNĐ
        </Text>
      </View>
    </View>
  );
};

export default ItemOrder;

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
});
