import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../../App';

export interface IItemFoodLarger {
  data?: any;
  customStyle?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
}

const ItemFood = ({data, customStyle}: IItemFoodLarger) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <View style={[styles.container, customStyle]}>
      <View center bg-dark4 row style={styles.reviewWrap}>
        <Text white style={styles.rate}>
          4.5
        </Text>
        <Image
          assetName="star"
          assetGroup="icons"
          width={9.89}
          height={9.45}
          marginR-3
        />
        <Text style={styles.count}>(25+)</Text>
      </View>
      <View style={styles.favorite}>
        <Image assetName="like" assetGroup="icons" />
      </View>
      <View bg-white row style={styles.priceWrap}>
        <Text primaryDark style={styles.priceText}>
          10.35
        </Text>
      </View>
      <View marginB-22 style={styles.imagesWrap}>
        <Image assetName="avatar" assetGroup="images" style={styles.images} />
      </View>
      <Text
        white
        marginB-8
        style={styles.name}
        onPress={() => {
          navigation.navigate('FoodDetails');
        }}>
        Chicken Hawaiian
      </Text>
      <Text style={styles.desc}>Chicken, Cheese and pineapple</Text>
    </View>
  );
};

export default ItemFood;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#393948',
    borderRadius: 15,
    paddingBottom: 11,
    overflow: 'hidden',
  },
  reviewWrap: {
    position: 'absolute',
    top: 136 - 28.7 / 2,
    left: 11,
    height: 28.7,
    borderRadius: 100,
    zIndex: 22,
    paddingLeft: 8,
    paddingRight: 5,
  },
  rate: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 11.69,
    marginRight: 4.21,
  },
  count: {
    fontFamily: 'SofiaPro',
    fontSize: 8.19,
    color: '#9796A1',
  },
  images: {
    width: '100%',
    height: '100%',
  },
  imagesWrap: {
    height: 136,
    borderRadius: 15,
    overflow: 'hidden',
  },
  name: {
    paddingHorizontal: 11,
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 15,
    lineHeight: 15,
  },
  metaText: {
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: '#ADADB8',
  },
  desc: {
    paddingHorizontal: 11,
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: '#ADADB8',
  },
  priceWrap: {
    height: 28,
    borderRadius: 100,
    paddingHorizontal: 8,
    position: 'absolute',
    top: 10,
    left: 11,
    zIndex: 22,
  },
  priceText: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 20.25,
    lineHeight: 26,
  },
  favorite: {
    position: 'absolute',
    right: 11,
    top: 10,
    zIndex: 22,
  },
});
