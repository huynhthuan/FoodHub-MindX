import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {getScreenWidth, getStatusOrder} from '../../utilities/helpers';
import {useAppDispatch, useAppSelector} from '../../hook';
import WooApi from '../../api/wooApi';
import {showToast} from '../../redux/slices/toastSlice';
import {setOrderUpcommingLoading} from '../../redux/slices/orderUpcommingLoading';

export interface IItemOrderUpcoming {
  id: number;
  getOrdersUpcomming: () => void;
}

const ItemOrderUpcoming = ({id, getOrdersUpcomming}: IItemOrderUpcoming) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const entitieOrders = useAppSelector(state => state.orderSlice.entities);
  const order: any = entitieOrders[id];
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useAppDispatch();

  if (!order) return null;

  const cancelOrder = React.useCallback(() => {
    setIsVisible(false);
    dispatch(
      setOrderUpcommingLoading({
        isLoading: true,
      }),
    );

    console.log('ID order cancel', id);

    WooApi.put('orders/' + order.id, {
      status: 'cancelled',
    })
      .then((data: any) => {
        getOrdersUpcomming();
        dispatch(
          setOrderUpcommingLoading({
            isLoading: false,
          }),
        );
      })
      .catch((error: any) => {
        dispatch(
          setOrderUpcommingLoading({
            isLoading: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra. Vui lòng thử lại !',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [id]);

  return (
    <View bg-dark padding-18 marginB-20 style={styles.container}>
      <View row spread marginB-24>
        <View row bottom>
          <View center style={styles.imageWrap} marginR-15>
            <Image
              assetName="avatar"
              assetGroup="images"
              style={styles.image}
            />
          </View>
          <View>
            <View row spread marginB-9>
              <Text gray2 textRegular style={styles.text}>
                {order.line_items.length} đồ ăn
              </Text>
            </View>

            <Text
              white
              marginB-11
              textSemiBold
              style={styles.name}
              onPress={() => {
                navigation.navigate('AgencyDetails');
              }}>
              Food Hub{' '}
              <Image
                assetName="verify"
                width={8}
                height={8}
                assetGroup="icons"
              />
            </Text>
          </View>
        </View>

        <Text yellow textRegular style={styles.price}>
          #{order.id}
        </Text>
      </View>

      <View row spread marginB-21>
        <View>
          <Text gray2 textBold marginB-11>
            Dự kiến thời gian giao
          </Text>
          <View row bottom>
            <Text white textRegular style={styles.time}>
              25
            </Text>
            <Text white textRegular style={styles.timeUnit}>
              phút
            </Text>
          </View>
        </View>

        <View right>
          <Text gray2 marginB-5>
            Tình trạng
          </Text>
          <Text textBold style={styles.textStatus}>
            {getStatusOrder(order.status)}
          </Text>
        </View>
      </View>

      <View row spread>
        <Button
          bg-dark4
          style={styles.btn}
          onPress={() => {
            setIsVisible(true);
          }}>
          <Text white textMedium style={styles.btnText}>
            Hủy đơn
          </Text>
        </Button>
        <Button bg-primary style={styles.btn}>
          <Text white textMedium style={styles.btnText}>
            Kiểm tra
          </Text>
        </Button>
      </View>

      <Incubator.Toast
        visible={isVisible}
        position={'bottom'}
        message={'Bạn có chắc chắn muốn hủy đơn hàng?'}
        action={{
          label: 'Đồng ý',
          onPress: () => {
            cancelOrder();
          },
          labelProps: {
            style: {
              fontFamily: 'SofiaPro-Medium',
            },
          },
        }}
        zIndex={99}
        preset={Incubator.ToastPresets.GENERAL}
        onDismiss={() => {
          setIsVisible(false);
        }}
        autoDismiss={5000}
        messageStyle={{
          fontFamily: 'SofiaPro-Medium',
          fontSize: 16,
        }}
      />
    </View>
  );
};

export default ItemOrderUpcoming;

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    lineHeight: 15,
  },
  container: {
    borderRadius: 18.21,
  },
  price: {
    fontSize: 16,
  },
  imageWrap: {
    width: 65,
    height: 65,
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    marginHorizontal: 9,
  },
  dotStatus: {
    width: 7,
    height: 7,
    borderRadius: 100,
    backgroundColor: '#4EE476',
  },
  textStatus: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 19.6,
  },
  btn: {
    width: (getScreenWidth() - 86) / 2 - 9,
    height: 43,
  },
  btnText: {
    fontSize: 15,
  },
  time: {
    fontSize: 39.27,
    lineHeight: 39.27,
    marginRight: 5,
  },
  timeUnit: {
    fontSize: 15,
    lineHeight: 39.27,
  },
});
