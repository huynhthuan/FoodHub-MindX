import {Button, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {useAppSelector} from '../../hook';
import moment from 'moment';

const CouponItem = ({id}: {id: number}) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const entitieCoupon = useAppSelector(state => state.coupontSlice.entities);
  const coupon: any = entitieCoupon[id];

  return (
    <TouchableOpacity
      disabled={false}
      onPress={() => {
        navigation.navigate('CouponDetails', {
          couponData: coupon,
        });
      }}
      row
      paddingV-10
      paddingH-10
      bg-dark
      marginB-20
      spread
      centerV
      style={styles.container}>
      <View style={styles.imageWrap} marginR-10>
        <Image assetName="avatar" assetGroup="images" style={styles.image} />
      </View>
      <View flex-1 marginR-10 paddingB-20>
        <Text textBold primary style={styles.title}>
          {coupon.description}
        </Text>

        {coupon.date_expires !== null ? (
          <Text gray textRegular style={styles.desc}>
            HSD: {moment(coupon.date_expires).format('D.M.Y')}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <Button bg-primary style={styles.btn}>
        <Text textBold white>
          Chọn
        </Text>
      </Button>
    </TouchableOpacity>
  );
};

export default CouponItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderLeftColor: '#FE724C',
    borderLeftWidth: 4,
  },
  imageWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
  },
  desc: {
    fontSize: 14,
  },
  btn: {
    minWidth: 50,
    minHeight: 20,
    maxHeight: 40,
    borderRadius: 14,
  },
});
