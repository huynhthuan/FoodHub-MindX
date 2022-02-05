import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Quantity from '../../components/Cart/Quantity';
import AddOnItem from '../../components/Item/Food/AddOnItem';
import {getScreenWidth} from '../../utilities/helpers';

const addOnList = new Array(4).fill(null);

const FoodDetails = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <View marginB-22 style={styles.imageWrap}>
          <Image
            assetName="avatar"
            assetGroup="images"
            style={styles.image}></Image>
          <View style={styles.favorite}>
            <Image assetName="like" assetGroup="icons" />
          </View>
        </View>
        <Text white marginB-16 style={styles.title}>
          Ground Beef Tacos
        </Text>
        <View marginB-16 row style={styles.reviewWrap}>
          <Image
            assetName="star"
            assetGroup="icons"
            width={17.78}
            height={17}
            marginR-8
          />
          <Text white style={styles.rate}>
            4.5
          </Text>

          <Text style={styles.count}>(25+)</Text>

          <Text primary underline marginL-7 style={styles.reviewLink}>
            See Review
          </Text>
        </View>

        <View row spread marginB-19>
          <View row style={styles.priceWrap}>
            <Text white style={styles.currency}>
              $
            </Text>
            <Text white style={styles.price}>
              9.50
            </Text>
          </View>

          <Quantity />
        </View>
        <Text marginB-26 style={styles.desc}>
          Brown the beef better. Lean ground beef – I like to use 85% lean
          angus. Garlic – use fresh chopped. Spices – chili powder, cumin, onion
          powder.
        </Text>
        <Text marginB-10 white style={styles.sectionTitle}>
          Choice of Add On
        </Text>
        <View marginB-137>
          {addOnList.map((item, index) => (
            <AddOnItem key={index} />
          ))}
        </View>
      </ScrollView>
      <Button bg-primary style={styles.btnAddCart}>
        <View center style={styles.iconWrap}>
          <Image
            assetName="cart"
            assetGroup="icons"
            width={16}
            height={17}
            tintColor="#FE724C"
          />
        </View>
        <Text white style={styles.addCartText}>
          Add to cart
        </Text>
      </Button>
    </>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
    paddingHorizontal: 25,
    paddingTop: 27,
  },
  reviewWrap: {
    alignItems: 'center',
  },
  rate: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 14,
    marginRight: 7,
  },
  count: {
    fontFamily: 'SofiaPro',
    fontSize: 14,
    color: '#9796A1',
  },
  sectionTitle: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 18,
    lineHeight: 18,
  },
  imageWrap: {
    height: 206,
    overflow: 'hidden',
    borderRadius: 14,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favorite: {
    position: 'absolute',
    right: 16,
    top: 15,
    zIndex: 22,
  },
  title: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 31,
    lineHeight: 35.65,
  },
  reviewLink: {
    fontSize: 12,
  },
  currency: {
    fontSize: 17,
    lineHeight: 17,
    fontFamily: 'SofiaPro-Medium',
  },
  price: {
    fontSize: 31,
    fontFamily: 'SofiaPro-Medium',
  },
  priceWrap: {
    alignItems: 'flex-end',
  },
  desc: {
    color: '#9796A1',
    fontFamily: 'SofiaPro',
    lineHeight: 22.5,
  },
  btnAddCart: {
    width: 167,
    height: 53,
    position: 'absolute',
    bottom: 38,
    left: getScreenWidth() / 2,
    transform: [{translateX: -167 / 2}],
    paddingRight: 6,
    paddingLeft: 6,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    marginRight: 6,
  },
  addCartText: {
    fontFamily: 'SofiaPro',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
