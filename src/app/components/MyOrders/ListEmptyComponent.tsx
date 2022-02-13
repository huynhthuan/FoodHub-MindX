import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../utilities/helpers';

const ListEmptyComponent = () => {
  return (
    <View flex-1 paddingT-119>
      <View center>
        <Image assetName="myorderEmpty" assetGroup="images" marginB-44 />
      </View>
      <Text textSemiBold white style={styles.title} marginB-12 center>
        Không có đơn hàng nào đang được giao đến bạn.
      </Text>
      <Text gray2 textRegular style={styles.desc} center>
        Hãy ăn thêm nhiều nhaaa!!!
      </Text>

      <View center>
        <Button bg-primary marginT-30 style={styles.btn}>
          <Text white textSemiBold style={styles.textBtn}>
            Đặt đồ ngay
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ListEmptyComponent;

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
