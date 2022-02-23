import {
  Button,
  Image,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import {MainStackParamList} from '../../../../App';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ItemOrder from '../../components/MyOrders/ItemOrder';
import {
  changeHeaderBackground,
  getPaymentMethod,
  getScreenWidth,
  getStatusOrder,
} from '../../utilities/helpers';
import {useAppDispatch, useAppSelector} from '../../hook';
import moment from 'moment';
let numeral = require('numeral');
import WooApi from '../../api/wooApi';
import _ from 'lodash';
import {setLoading} from '../../redux/slices/loadingSlice';
import {showToast} from '../../redux/slices/toastSlice';

const OrderDetailsCompleted = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'OrderDetails'>>();
  const entitieOrders = useAppSelector(
    state => state.orderCompletedSlice.entities,
  );
  const order: any = entitieOrders[route.params.id];
  const [data, setData] = React.useState([]);
  const dispatch = useAppDispatch();

  console.log(order);

  React.useEffect(() => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );
    WooApi.get('products', {
      include: _.map(order.line_items, item => {
        return item.product_id;
      }),
    })
      .then((res: any) => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        setData(res);
      })
      .catch((error: any) => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra. Vui lòng thử lại',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [route.params.id]);

  const getQty = React.useCallback((productId: number) => {
    return _.filter(order.line_items, item => item.product_id === productId)[0]
      .quantity;
  }, []);

  console.log(order.status);

  return (
    <ScrollView
      style={styles.container}
      horizontal={false}
      contentContainerStyle={styles.content}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}
      showsHorizontalScrollIndicator={false}>
      <View row spread marginB-24 paddingH-25>
        <View row>
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
                {moment(order.date_created).format('DD MMM, hh:mm')}
              </Text>
            </View>

            <Text
              white
              marginB-5
              textSemiBold
              style={styles.name}
              onPress={() => {
                navigation.navigate('AgencyDetails');
              }}>
              FoodHub{' '}
              <Image
                assetName="verify"
                width={8}
                height={8}
                assetGroup="icons"
              />
            </Text>

            <View row centerV>
              <View marginR-6 style={styles.dotStatus}></View>
              <Text textRegular style={styles.textStatus}>
                {getStatusOrder(order.status)}
              </Text>
            </View>
          </View>
        </View>

        <Text yellow textRegular style={styles.price}>
          #{order.id}
        </Text>
      </View>

      <View paddingH-25>
        <Text white textSemiBold marginB-15 style={styles.title}>
          Địa chỉ giao hàng
        </Text>
        <Text textMedium gray2 marginB-22 style={styles.shipAddress}>
          {order.shipping.address_1}
        </Text>
        <Text white textSemiBold marginB-15 style={styles.title}>
          Số điện thoại
        </Text>
        <Text textMedium gray2 marginB-22 style={styles.shipAddress}>
          {order.billing.phone}
        </Text>
      </View>

      {/* <View row centerV spread paddingH-25 marginB-32>
          <View row centerV>
            <View style={styles.imagesWrap} marginR-17>
              <Image
                assetName="avatar"
                assetGroup="images"
                style={styles.image}
              />
            </View>
            <View>
              <Text textMedium gray2 marginB-6 style={styles.id}>
                ID: DKS-501F9
              </Text>
              <Text textSemiBold white style={styles.shipName}>
                Jhon Wick
              </Text>
            </View>
          </View>
  
          <View row centerV>
            <Button bg-white round center marginR-10>
              <Image assetName="phone" assetGroup="icons" />
            </Button>
            <Text white textMedium>
              Call
            </Text>
          </View>
        </View> */}

      <View marginB-30>
        <View paddingH-25>
          <Text white textSemiBold marginB-15 style={styles.headerTitle}>
            Các món ăn
          </Text>
        </View>
        <View>
          {data.map((item: any, index: number) => (
            <ItemOrder key={index} data={item} quantity={getQty(item.id)} />
          ))}
        </View>
      </View>

      <View paddingH-25>
        <Text white textSemiBold marginB-15 style={styles.headerTitle}>
          Phương thức thanh toán
        </Text>

        <Text textMedium gray2 marginB-22 style={styles.shipAddress}>
          {getPaymentMethod(order.payment_method)}
        </Text>
      </View>

      <View row centerV spread paddingH-25>
        <Text white textSemiBold style={styles.totalTitle}>
          Tổng cộng
        </Text>

        <View row centerV>
          <Text white textSemiBold style={styles.priceTotal} marginR-6>
            {numeral(order.total).format('0,0')}
          </Text>
          <Text textMedium gray2 style={styles.priceTotalUnit}>
            VNĐ
          </Text>
        </View>
      </View>

      {/* <View row spread marginT-78 paddingH-25>
          <Button white bg-dark4 style={styles.btn}>
            <Text white textSemiBold style={styles.btnText}>
              RATE
            </Text>
          </Button>
          <Button white bg-primary style={styles.btn}>
            <Text white textSemiBold style={styles.btnText}>
              RE-ORDER
            </Text>
          </Button>
        </View> */}
    </ScrollView>
  );
};

export default OrderDetailsCompleted;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D3A',
  },
  content: {
    paddingTop: 70,
    paddingBottom: 33,
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
  price: {
    fontSize: 16,
  },
  name: {
    fontSize: 15,
    lineHeight: 15,
  },
  textStatus: {
    color: '#4EE476',
    fontSize: 12,
  },
  imagesWrap: {
    width: 41.67,
    height: 41.67,
    borderRadius: 14,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
  },
  shipAddress: {
    lineHeight: 19.6,
  },
  id: {
    fontSize: 12,
    lineHeight: 12,
  },
  shipName: {
    fontSize: 16,
    lineHeight: 16,
  },
  listContentStyle: {
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 18,
  },
  priceTotal: {
    fontSize: 21,
  },
  priceTotalUnit: {
    fontSize: 14,
  },
  totalTitle: {
    fontSize: 16,
  },
  btn: {
    height: 57,
    width: (getScreenWidth() - 50) / 2 - 10,
  },
  btnText: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
});
