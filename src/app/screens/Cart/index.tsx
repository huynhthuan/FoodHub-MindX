import {
  Button,
  Colors,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
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
import {useAppDispatch, useAppSelector} from '../../hook';
import ListEmptyCart from '../../components/Cart/ListEmptyCart';
import {showToast} from '../../redux/slices/toastSlice';
import {setLoading} from '../../redux/slices/loadingSlice';
import moment from 'moment';
import {EntityId} from '@reduxjs/toolkit';
import {BASE_URL_WOOCOMMERCE, WOO_KEY, WOO_SECRET} from '../../api/constants';
import axios from 'axios';
let numeral = require('numeral');

const Cart = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const productCartList = useAppSelector(state => state.productCartSlice);
  const couponCart = useAppSelector(state => state.couponCartSlice);
  const [couponInCart, setCouponInCart] = React.useState({
    code: '',
    amount: 0,
    desc: '',
  });
  const [total, setTotal] = React.useState(0);
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let total = _.reduce(
      _.map(
        productCartList.entities,
        product => product?.price * product?.quantity,
      ),
      (sum, n) => sum + n,
      20000,
    );

    total -= couponInCart.amount;
    console.log(total);

    if (total < 0) {
      setTotal(0);
    } else {
      setTotal(numeral(total).format('0,0'));
    }
  }, [productCartList.ids, couponInCart.amount, productCartList.entities]);

  const getTotalIncart = React.useCallback(() => {
    let total = _.reduce(
      _.map(
        productCartList.entities,
        product => product?.price * product?.quantity,
      ),
      (sum, n) => sum + n,
      0,
    );

    return total;
  }, [productCartList.ids, productCartList.entities]);

  const checkProductIncludes = React.useCallback(
    (idsAvaible: EntityId[]) => {
      console.log(idsAvaible, productCartList.ids);
      let isAllproductAvaible = false;
      productCartList.ids.forEach(id => {
        if (idsAvaible.includes(id)) {
          isAllproductAvaible = true;
          return;
        }
      });
      return isAllproductAvaible;
    },
    [productCartList.ids],
  );

  const getCoupon = React.useCallback(() => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );

    axios
      .get(BASE_URL_WOOCOMMERCE + 'coupons', {
        params: {
          code: couponCart.code,
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        let couponData = res.data[0];
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        if (res.data.length === 0) {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Mã giảm giá không tồn tại.',
              preset: Incubator.ToastPresets.FAILURE,
            }),
          );
          return;
        }

        if (couponData.used_by.includes(userState.id)) {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Bạn đã sử dụng mã này.',
              preset: Incubator.ToastPresets.FAILURE,
            }),
          );
          return;
        }

        if (couponData.date_expires !== null) {
          if (!moment().isBefore(couponData.date_expires)) {
            dispatch(
              showToast({
                isShown: true,
                msg: 'Mã đã hết hạn sử dụng.',
                preset: Incubator.ToastPresets.FAILURE,
              }),
            );
            return;
          }
        }

        if (getTotalIncart() < Number(couponData.minimum_amount)) {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Giá trị đơn hàng tối thiểu chưa đủ điều kiện.',
              preset: Incubator.ToastPresets.FAILURE,
            }),
          );
          return;
        }

        if (Number(couponData.maximum_amount) > 0) {
          if (getTotalIncart() > Number(couponData.maximum_amount)) {
            dispatch(
              showToast({
                isShown: true,
                msg: 'Giá trị đơn hàng vượt mức tối đa.',
                preset: Incubator.ToastPresets.FAILURE,
              }),
            );
            return;
          }
        }

        if (couponData.product_ids.length > 0) {
          if (!checkProductIncludes(couponData.product_ids)) {
            dispatch(
              showToast({
                isShown: true,
                msg: 'Chưa có món ăn theo điều kiện của mã giảm giá.',
                preset: Incubator.ToastPresets.FAILURE,
              }),
            );
            return;
          }
        }

        setCouponInCart({
          amount: couponData.amount,
          desc: couponData.description,
          code: couponData.code,
        });

        dispatch(
          showToast({
            isShown: true,
            msg: 'Áp dụng mã giảm giá thành công.',
            preset: Incubator.ToastPresets.SUCCESS,
          }),
        );
      });
  }, [couponCart]);

  React.useEffect(() => {
    setCouponInCart({
      code: '',
      amount: 0,
      desc: '',
    });
  }, [couponCart.code]);

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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Coupon');
              }}
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
                  placeholder="Chọn mã giảm giá"
                  placeholderTextColor={Colors.gray2}
                  color={Colors.white}
                  style={styles.textInput}
                  value={couponCart.code}
                  editable={false}
                  onChange={value => {
                    console.log(value);
                  }}
                  onChangeText={value => {
                    console.log(value);
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
            </TouchableOpacity>
          </View>

          <View paddingH-25 marginB-82>
            <View style={styles.section} row spread centerV>
              <View>
                <Text white textMedium style={styles.title}>
                  Tạm tính
                </Text>
                <Text gray2 textRegular style={styles.unit}>
                  {productCartList.ids.length} món
                </Text>
              </View>
              <View row centerV>
                <Text white textLight style={styles.price} marginR-6>
                  {numeral(getTotalIncart()).format('0,0')}
                </Text>
                <Text gray6 textRegular style={styles.unit}>
                  VNĐ
                </Text>
              </View>
            </View>
            <View style={styles.section} row spread centerV>
              <Text white textMedium style={styles.title}>
                Phí ship
              </Text>
              <View row centerV>
                <Text white textLight style={styles.price} marginR-6>
                  20,000
                </Text>
                <Text gray6 textRegular style={styles.unit}>
                  VNĐ
                </Text>
              </View>
            </View>
            {couponInCart.code !== '' ? (
              <View style={styles.section} row spread centerV>
                <View paddingV-5>
                  <Text white textMedium style={styles.title}>
                    Mã giảm giá
                  </Text>
                  <Text gray2 textRegular style={styles.unit}>
                    {couponInCart.code}
                  </Text>
                  <Text primary textBold style={styles.unit}>
                    {couponInCart.desc}
                  </Text>
                </View>
                <View row centerV>
                  <Text white textLight style={styles.price} marginR-6>
                    - {numeral(Number(couponInCart.amount)).format('0,0')}
                  </Text>
                  <Text gray6 textRegular style={styles.unit}>
                    VNĐ
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
            <View style={styles.section} row spread centerV>
              <Text white textMedium style={styles.title}>
                Tổng cộng
              </Text>
              <View row centerV>
                <Text white textBold style={styles.price} marginR-6>
                  {total}
                </Text>
                <Text gray6 textRegular style={styles.unit}>
                  VNĐ
                </Text>
              </View>
            </View>
          </View>

          <View center>
            <Button
              bg-primary
              style={styles.btnCheckOut}
              onPress={() => {
                navigation.navigate('Checkout', {
                  orderData: {
                    total,
                  },
                });
              }}>
              <Text white textSemiBold style={styles.btnCheckoutText}>
                Thanh toán
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
    borderBottomColor: '#474755',
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
