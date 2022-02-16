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
        Chuyên mục này chưa có sản phẩm.
      </Text>
      <Text gray2 textRegular style={styles.desc} center>
        Chúng tôi sẽ cập nhật trong thời gian tới.
      </Text>

      <View center>
        <Button bg-primary marginT-30 style={styles.btn}>
          <Text white textSemiBold style={styles.textBtn}>
            Khám phá danh mục khác
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ListEmptyItem;

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
