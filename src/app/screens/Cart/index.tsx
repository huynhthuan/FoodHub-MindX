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

const Cart = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}>
      {_.map([1, 2, 3, 4, 5, 6], (item, index) => (
        <ItemCart key={index} />
      ))}

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
            />
          </View>
          <Button bg-primary>
            <Text white textMedium style={styles.btnText}>
              Apply
            </Text>
          </Button>
        </View>
      </View>

      <View paddingH-25 marginB-82>
        <View style={styles.section} row spread centerV>
          <Text white textMedium style={styles.title}>
            Subtotal
          </Text>
          <View row centerV>
            <Text white textLight style={styles.price} marginR-6>
              $52.50
            </Text>
            <Text gray6 textRegular style={styles.unit}>
              USD
            </Text>
          </View>
        </View>
        <View style={styles.section} row spread centerV>
          <Text white textMedium style={styles.title}>
            Tax and Fees
          </Text>
          <View row centerV>
            <Text white textLight style={styles.price} marginR-6>
              $52.50
            </Text>
            <Text gray6 textRegular style={styles.unit}>
              USD
            </Text>
          </View>
        </View>
        <View style={styles.section} row spread centerV>
          <Text white textMedium style={styles.title}>
            Delivery
          </Text>
          <View row centerV>
            <Text white textLight style={styles.price} marginR-6>
              $52.50
            </Text>
            <Text gray6 textRegular style={styles.unit}>
              USD
            </Text>
          </View>
        </View>
        <View style={styles.section} row spread centerV>
          <Text white textMedium style={styles.title}>
            Total
          </Text>
          <View row centerV>
            <Text white textRegular marginR-11>
              (3 items)
            </Text>
            <Text white textBold style={styles.price} marginR-6>
              $52.50
            </Text>
            <Text gray6 textRegular style={styles.unit}>
              USD
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
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    paddingTop: 69,
    backgroundColor: Colors.primaryDark,
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
