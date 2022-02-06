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
        No upcoming orders
      </Text>
      <Text gray2 textRegular style={styles.desc} center>
        No upcoming orders have been placed yer. Disocover and order now
      </Text>

      <Button bg-primary style={styles.btn}>
        <Text white textSemiBold style={styles.textBtn}>
          DISCOVER NOW
        </Text>
      </Button>
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
    position: 'absolute',
    bottom: 30,
    left: (getScreenWidth() - 50) / 2,
    width: 248,
    transform: [
      {
        translateX: -248 / 2,
      },
    ],
  },
  textBtn: {
    fontSize: 15,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
});
