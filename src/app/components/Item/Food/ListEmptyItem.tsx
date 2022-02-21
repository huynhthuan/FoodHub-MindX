import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const ListEmptyItem = () => {
  return (
    <View flex-1 paddingT-119>
      <View center>
        <Image assetName="myorderEmpty" assetGroup="images" marginB-44 />
      </View>
      <Text textSemiBold white style={styles.title} marginB-12 center>
        Cập nhật sản phẩm
      </Text>
      <Text gray2 textRegular style={styles.desc} center>
        Chúng tôi đang cập nhật sản phẩm.
      </Text>
    </View>
  );
};

export default ListEmptyItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  desc: {
    fontSize: 14,
  },
  btn: {
    height: 60,
    width: 248,
  },
  textBtn: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
});
