import {Button, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import {MainStackParamList} from '../../../../App';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ItemOrder from '../../components/MyOrders/ItemOrder';
import {changeHeaderBackground, getScreenWidth} from '../../utilities/helpers';

const data = [
  {
    name: 'Burger',
    id: '1',
  },
  {
    name: 'Chicken',
    id: '2',
  },
  {
    name: 'Fast Food',
    id: '3',
  },
  {
    name: 'Fast Food Hub',
    id: '4',
  },
  {
    name: 'Burger',
    id: '5',
  },
  {
    name: 'Chicken',
    id: '6',
  },
  {
    name: 'Fast Food',
    id: '7',
  },
  {
    name: 'Fast Food Hub',
    id: '8',
  },
];

const OrderDetails = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

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
                20 Jun, 10:30
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
          #2641000
        </Text>
      </View>

      <View paddingH-25>
        <Text white textSemiBold marginB-15 style={styles.title}>
          Details
        </Text>
        <Text textMedium gray2 marginB-22 style={styles.shipAddress}>
          6391 Elgin St. Celina, Delaware 10299
        </Text>
      </View>

      <View row centerV spread paddingH-25 marginB-32>
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
      </View>

      <View marginB-30>
        <View paddingH-25>
          <Text white textSemiBold marginB-15 style={styles.headerTitle}>
            Orders food
          </Text>
        </View>
        <View>
          {data.map((item, index) => (
            <ItemOrder key={index} data={item} />
          ))}
        </View>
      </View>

      <View paddingH-25>
        <Text white textSemiBold marginB-15 style={styles.headerTitle}>
          Payment Method
        </Text>

        <Text textMedium gray2 marginB-22 style={styles.shipAddress}>
          6391 Elgin St. Celina, Delaware 10299
        </Text>
      </View>

      <View row centerV spread paddingH-25>
        <Text white textSemiBold style={styles.totalTitle}>
          Total
        </Text>

        <View row centerV>
          <Text white textSemiBold style={styles.priceTotal} marginR-6>
            $59.08
          </Text>
          <Text textMedium gray2 style={styles.priceTotalUnit}>
            USD
          </Text>
        </View>
      </View>

      <View row spread marginT-78 paddingH-25>
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
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

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
