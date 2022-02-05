import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const CategoryItem = () => {
  return (
    <View bg-dark centerH style={styles.container}>
      <View bg-white marginB-15 center style={styles.imagesWrap}>
        <Image assetName="avatar" assetGroup="images" />
      </View>
      <Text white center style={styles.name}>
        Burger
      </Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingTop: 7,
    paddingBottom: 17.61,
    width: 58.57,
    marginRight: 12,
  },
  imagesWrap: {
    width: 46,
    height: 46,
    borderRadius: 100,
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'SofiaPro',
    fontSize: 11,
    lineHeight: 11,
  },
});
