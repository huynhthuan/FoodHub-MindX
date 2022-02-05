import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const RecentSearchItem = () => {
  return (
    <View paddingL-7 marginB-26 row style={styles.wrap}>
      <Image marginR-16 assetName="recent" assetGroup="icons" />
      <Text white style={styles.text}>
        Asian noodle salad
      </Text>
    </View>
  );
};

export default RecentSearchItem;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'SofiaPro',
    fontSize: 15.4,
    lineHeight: 15.4,
  },
});
