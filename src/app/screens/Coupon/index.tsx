import {Incubator, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getScreenHeight} from '../../utilities/helpers';
import {useAppDispatch, useAppSelector} from '../../hook';
import WooApi from '../../api/wooApi';
import {couponAddMany, couponReceived} from '../../redux/slices/couponSlice';
import {showToast} from '../../redux/slices/toastSlice';
import CouponItem from '../../components/Coupons/CouponItem';

const Coupon = () => {
  const couponList = useAppSelector(state => state.coupontSlice);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const renderCoupon = React.useCallback(
    ({item}) => <CouponItem id={item} />,
    [],
  );

  const getCoupon = React.useCallback(() => {
    dispatch(
      couponReceived({
        couponList: JSON.stringify([]),
      }),
    );
    setIsLoading(true);
    WooApi.get('coupons')
      .then((data: any) => {
        setIsLoading(false);
        dispatch(
          couponReceived({
            couponList: JSON.stringify(data),
          }),
        );
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoading(false);
        dispatch(
          showToast({
            msg: 'Đã có lỗi xảy ra. Vui lòng thử lại',
            preset: Incubator.ToastPresets.FAILURE,
            isShown: true,
          }),
        );
      });
  }, []);

  React.useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      WooApi.get('coupons', {
        page,
      })
        .then((data: any) => {
          setIsLoading(false);
          dispatch(
            couponAddMany({
              couponList: JSON.stringify(data),
            }),
          );
        })
        .catch((error: any) => {
          console.log(error);

          setIsLoading(false);
          dispatch(
            showToast({
              msg: 'Đã có lỗi xảy ra. Vui lòng thử lại',
              preset: Incubator.ToastPresets.FAILURE,
              isShown: true,
            }),
          );
        });
    }
  }, [page]);

  React.useEffect(() => {
    getCoupon();
  }, []);

  return (
    <View bg-primaryDark paddingT-74>
      <FlatList
        contentContainerStyle={styles.container}
        data={couponList.ids}
        renderItem={renderCoupon}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => {
          getCoupon();
        }}
        refreshing={isLoading}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setPage(page + 1);
        }}
      />
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  container: {
    minHeight: getScreenHeight(),
    paddingHorizontal: 25,
  },
});
