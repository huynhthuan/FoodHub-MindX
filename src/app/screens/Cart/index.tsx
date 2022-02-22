import {Button, Colors, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import ItemCart from '../../components/Cart/ItemCart';
import {
  changeHeaderBackground,
  getScreenHeight,
  getScreenWidth,
} from '../../utilities/helpers';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {useAppSelector} from '../../hook';
import ListEmptyCart from '../../components/Cart/ListEmptyCart';
import WooApi from '../../api/wooApi';
import {useDispatch} from 'react-redux';
import {showToast} from '../../redux/slices/toastSlice';
let numeral = require('numeral');

const Cart = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const productCartList = useAppSelector(state => state.productCartSlice);
  const [coupon, setCoupon] = React.useState('');
  const [couponData, setCouponData] = React.useState({});
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const getCoupon = React.useCallback(() => {
    if (coupon === '') {
      dispatch(
        showToast({
          isShown: true,
          msg: 'Mã giảm giá không tồn tại.',
          preset: Incubator.ToastPresets.FAILURE,
        }),
      );
      return;
    }

    WooApi.get('coupons', {
      code: coupon,
    }).then((data: any) => {
      console.log(data);
      if (data.length === 0) {
        dispatch(
          showToast({
            isShown: true,
            msg: 'Mã giảm giá không tồn tại.',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
        return;
      }

      if (data.used_by.includes(userState.id)) {
        dispatch(
          showToast({
            isShown: true,
            msg: 'Bạn đã sử dụng mã này.',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
        return;
      }
    });
  }, [coupon]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}>
      {productCartList.ids.length > 0 ? (
        <>
          {_.map(productCartList.entities, (item, index) => {
            if (item !== undefined) {
              return <ItemCart key={index} product={item} />;
            }
          })}

          <View paddingH-25 marginB-10>
            <View
              row
              style={styles.promoWrap}
              bg-dark
              paddingV-10
              paddingR-12
              paddingL-34
              spread
              centerV>
              <View>
                <Incubator.TextField
                  placeholder="Promo Code"
                  placeholderTextColor={Colors.gray2}
                  color={Colors.white}
                  style={styles.textInput}
                  onChangeText={value => {
                    setCoupon(value);
                  }}
                />
              </View>
              <Button
                bg-primary
                onPress={() => {
                  getCoupon();
                }}>
                <Text white textMedium style={styles.btnText}>
                  Áp dụng
                </Text>
              </Button>
            </View>
          </View>

          <View paddingH-25 marginB-82>
            <View style={styles.section} row spread centerV>
              <Text white textMedium style={styles.title}>
                Phí ship
              </Text>
              <View row centerV>
                <Text white textLight style={styles.price} marginR-6>
                  20.000
                </Text>
                <Text gray6 textRegular style={styles.unit}>
                  VNĐ
                </Text>
              </View>
            </View>
            <View style={styles.section} row spread centerV>
              <Text white textMedium style={styles.title}>
                Tổng cộng
              </Text>
              <View row centerV>
                <Text white textRegular marginR-11>
                  ({productCartList.ids.length} đồ ăn)
                </Text>
                <Text white textBold style={styles.price} marginR-6>
                  {numeral(
                    _.reduce(
                      _.map(
                        productCartList.entities,
                        product => product?.price * product?.quantity,
                      ),
                      (sum, n) => sum + n,
                      20000,
                    ),
                  ).format('0,0')}
                </Text>
                <Text gray6 textRegular style={styles.unit}>
                  VNĐ
                </Text>
              </View>
            </View>
          </View>

          <View center>
            <Button bg-primary style={styles.btnCheckOut}>
              <Text white textSemiBold style={styles.btnCheckoutText}>
                Checkout
              </Text>
            </Button>
          </View>
        </>
      ) : (
        <ListEmptyCart />
      )}
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    paddingTop: 69,
    backgroundColor: '#2D2D3A',
    minHeight: getScreenHeight(),
    paddingBottom: 30,
  },
  promoWrap: {
    borderRadius: 100,
    height: 65,
  },
  btnText: {
    fontSize: 15,
  },
  textInput: {
    width: getScreenWidth() - 50 - 12 - 34 - 104,
    height: 20,
    fontFamily: 'SofiaPro',
    fontSize: 17,
  },
  section: {
    height: 64,
    borderBottomColor: Colors.dark4,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 21,
  },
  unit: {
    fontSize: 14,
  },
  btnCheckOut: {
    width: 248,
    height: 57,
  },
  btnCheckoutText: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
});
