import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const Quantity = () => {
  return (
    <View row center>
      <Button center round style={styles.btn}>
        <Image assetName="minus" assetGroup="icons" />
      </Button>
      <Text white style={styles.qty}>
        01
      </Text>
      <Button center round style={styles.btn}>
        <Image assetName="plus" assetGroup="icons" />
      </Button>
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({
  btn: {
    width: 30.6,
    height: 30.6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },
  qty: {
    marginHorizontal: 7,
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 16,
  },
});
