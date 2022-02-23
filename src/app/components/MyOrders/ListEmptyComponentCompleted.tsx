import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const ListEmptyComponentCompleted = () => {
  return (
    <View flex-1 paddingT-119>
      <View center>
        <Image assetName="myorderEmpty" assetGroup="images" marginB-44 />
      </View>
      <Text textSemiBold white style={styles.title} marginB-12 center>
        Bạn chưa đặt đơn hàng nào.
      </Text>
      <Text gray2 textRegular style={styles.desc} center>
        Hãy ăn thêm nhiều nhaaa!!!
      </Text>
    </View>
  );
};

export default ListEmptyComponentCompleted;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 20,
  },
  desc: {
    fontSize: 14,
    lineHeight: 21,
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
