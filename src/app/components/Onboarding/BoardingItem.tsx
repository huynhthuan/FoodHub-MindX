import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface IBoardingItem {
  image: string;
  titleSlice: string;
  desc: string;
}

const BoardingItem = ({image, titleSlice, desc}: IBoardingItem) => {
  return (
    <View bg-primaryDark padding-20 flex-1 centerH centerV spread>
      <View center>
        <Image assetName={image} assetGroup="images" />
      </View>
      <View center>
        <Text white marginB-12 center style={styles.title}>
          {titleSlice}
        </Text>
        <Text gray marginB-130 center style={styles.desc}>
          {desc}
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
