import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface IBoardingItem {
  image?: string;
  title?: string;
  desc?: string;
}

const BoardingItem = ({image, title, desc}: IBoardingItem) => {
  return (
    <View bg-primaryDark padding-20 flex-1 centerH centerV spread>
      <View>
        <Image assetName="onboarding1" assetGroup="images" />
      </View>
      <View center>
        <Text white marginB-12 center style={styles.title}>
          Browse your menu and order directly
        </Text>
        <Text gray marginB-130 center style={styles.desc}>
          Our app can send you everywhere, even space. For only $2.99 per month
        </Text>
      </View>
    </View>
  );
};

export default BoardingItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 38.4737,
    fontFamily: 'SofiaPro',
    lineHeight: 44.63,
  },
  desc: {
    fontSize: 17,
    fontFamily: 'SofiaPro',
    lineHeight: 27.2,
  },
});
