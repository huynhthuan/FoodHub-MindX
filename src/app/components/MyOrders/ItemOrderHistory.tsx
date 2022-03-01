import {Button, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {getScreenWidth, getStatusOrder} from '../../utilities/helpers';
import {useAppSelector} from '../../hook';
import moment from 'moment';
let numeral = require('numeral');
export interface IItemOrderHistory {
  id: number;
}

const ItemOrderHistory = ({id}: IItemOrderHistory) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const entitieOrders = useAppSelector(
    state => state.orderCompletedSlice.entities,
  );
  const order: any = entitieOrders[id];

  if (!order) return null;

  console.log(order.status);
  

  return (
    <TouchableOpacity
      bg-dark
      padding-18
      marginB-20
      style={styles.container}
      onPress={() => {
        navigation.navigate('OrderDetailsCompleted', {id: order.id});
      }}>
      <View row spread>
        <View row>
          <View center style={styles.imageWrap} marginR-15>
            <Image
              assetName="avatar"
              assetGroup="images"
              style={styles.image}
            />
          </View>
          <View>
            <View row spread center marginB-9>
              <Text gray2 textRegular style={styles.text}>
                {moment(order.date_created).format('DD/MM/YY')}
              </Text>
              <View style={styles.dot}></View>
              <Text gray2 textRegular style={styles.text}>
                {order.line_items.length} món
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
          {numeral(order.total).format('0,0')} VNĐ
        </Text>
      </View>
      {/* <View row spread>
        <Button bg-dark4 style={styles.btn}>
          <Text white textMedium style={styles.btnText}>
            Đánh giá
          </Text>
        </Button>
        <Button bg-primary style={styles.btn}>
          <Text white textMedium style={styles.btnText}>
            Đặt lại
          </Text>
        </Button>
      </View> */}
    </TouchableOpacity>
  );
};

export default ItemOrderHistory;

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
    color: '#4EE476',
    fontSize: 12,
  },
  btn: {
    width: (getScreenWidth() - 86) / 2 - 9,
    height: 43,
  },
  btnText: {
    fontSize: 15,
  },
});
