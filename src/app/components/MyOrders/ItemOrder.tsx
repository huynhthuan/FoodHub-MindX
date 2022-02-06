import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface IIemOrder {
  data: any;
}

const ItemOrder = ({data}: IIemOrder) => {
  return (
    <View row marginB-20 paddingH-25>
      <View style={styles.imageWrap} marginR-27>
        <Image assetName="avatar" assetGroup="images" style={styles.image} />
      </View>
      <View>
        <Text white textSemiBold marginB-8 style={styles.name}>
          Red n hot pizza <Text primary>x 1</Text>
        </Text>
        <Text gray2 textLight marginB-10 style={styles.addOn}>
          Spicy chicken <Text primary>x 1</Text>, beef <Text primary>x 1</Text>
        </Text>
        <Text white textSemiBold style={styles.price}>
          $9.50
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
