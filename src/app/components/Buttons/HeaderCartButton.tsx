import {Colors, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const HeaderCartButton = () => {
  return (
    <View bg-dark style={styles.btn} center>
      <Image
        assetName="cart"
        assetGroup="icons"
        width={16.08}
        height={17.64}
        tintColor={'#fff'}
      />
      <Text textSemiBold center white style={styles.text}>
        4
      </Text>
    </View>
  );
};

export default HeaderCartButton;

const styles = StyleSheet.create({
  btn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    marginRight: 9,
  },
  text: {
    fontSize: 9,
    width: 13.92,
    height: 13.88,
    borderRadius: 6,
    backgroundColor: Colors.yellow,
    position: 'absolute',
    top: -2,
    right: -1.5,
  },
});
