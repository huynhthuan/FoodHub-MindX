import {Button, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {getScreenWidth} from '../../utilities/helpers';
import {useAppSelector} from '../../hook';

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

  return (
    <TouchableOpacity
      bg-dark
      padding-18
      marginB-20
      style={styles.container}
      onPress={() => {
        navigation.navigate('OrderDetails');
      }}>
      <View row spread marginB-24>
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
                20 Jun, 10:30
              </Text>
              <View style={styles.dot}></View>
              <Text gray2 textRegular style={styles.text}>
                3 Items
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
              McDonald’s{' '}
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
                Order Delivered
              </Text>
            </View>
          </View>
        </View>

        <Text yellow textRegular style={styles.price}>
          $15.30 {order.id}
        </Text>
      </View>
      <View row spread>
        <Button bg-dark4 style={styles.btn}>
          <Text white textMedium style={styles.btnText}>
            Rate
          </Text>
        </Button>
        <Button bg-primary style={styles.btn}>
          <Text white textMedium style={styles.btnText}>
            Re-Order
          </Text>
        </Button>
      </View>
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
