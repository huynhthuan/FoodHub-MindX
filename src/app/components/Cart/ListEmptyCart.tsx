import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const ListEmptyCart = () => {
  return (
    <View flex-1 paddingT-119>
      <View center>
        <Image assetName="myorderEmpty" assetGroup="images" marginB-44 />
      </View>
      <Text textSemiBold white style={styles.title} marginB-12 center>
        Bạn chưa có sản phẩm trong giỏ hàng
      </Text>
      <Text gray2 textRegular style={styles.desc} center>
        Hãy thêm nhiều đồ ăn nha.
      </Text>
    </View>
  );
};

export default ListEmptyCart;

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
