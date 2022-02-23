import {Assets, Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../utilities/helpers';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import moment from 'moment';
import {updateCouponCart} from '../../redux/slices/couponCartSlice';
import {useAppDispatch} from '../../hook';

const CouponDetails = () => {
  const route = useRoute<RouteProp<MainStackParamList, 'CouponDetails'>>();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Image assetName="couponBG" assetGroup="images" />
          <View center style={styles.meta}>
            <Text textMedium white bg-primary style={styles.code} marginB-8>
              {route.params.couponData.code}
            </Text>
            <Text textBold primary style={styles.title} marginB-5>
              {route.params.couponData.description}
            </Text>
            {route.params.couponData.date_expires !== null ? (
              <Text gray textRegular style={styles.desc}>
                Sử dụng đến:{' '}
                {moment(route.params.couponData.date_expires).format('D.M.Y')}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View center>
          <View style={styles.bar} marginT-80 marginB-20></View>
        </View>
        <View paddingH-25>
          <RenderHTML
            contentWidth={getScreenWidth() - 50}
            systemFonts={['SofiaPro-Bold', 'SofiaPro-Medium', 'SofiaPro']}
            source={{
              html: `<div style="color: white; line-height: 20px;font-family: 'SofiaPro'; font-size: 16px;">${route.params.couponData.acf.desc}</div>`,
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.btnWrap}>
        <Button
          bg-primary
          onPress={() => {
            dispatch(
              updateCouponCart({
                code: route.params.couponData.code,
                amount: Number(route.params.couponData.amount),
                desc: route.params.couponData.description,
              }),
            );
            navigation.navigate('Cart');
          }}>
          <Text white textMedium style={styles.btnText}>
            Chọn
          </Text>
        </Button>
      </View>
    </>
  );
};

export default CouponDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D3A',
    minHeight: getScreenHeight(),
    paddingBottom: 100,
  },
  meta: {
    backgroundColor: '#393948',
    padding: 10,
    textAlign: 'center',
    position: 'absolute',
    width: getScreenWidth() - 50,
    elevation: 10,
    bottom: -60,
    left: '50%',
    borderRadius: 10,
    transform: [
      {
        translateX: -((getScreenWidth() - 50) / 2),
      },
    ],
  },
  code: {
    borderRadius: 20,
    paddingHorizontal: 10,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
  },
  desc: {
    fontSize: 14,
  },
  btnWrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: '#2D2D3A',
    paddingTop: 20,
  },
  btnText: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
  bar: {
    width: getScreenWidth() - 50,
    height: 2,
    backgroundColor: '#393948',
  },
});
