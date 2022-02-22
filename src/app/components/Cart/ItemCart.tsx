import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import Quantity from './Quantity';
import {getScreenWidth} from '../../utilities/helpers';
import {
  IproductCart,
  productCartRemoveOne,
  productCartUpdateOne,
} from '../../redux/slices/productCartSlice';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
let numeral = require('numeral');

const ItemCart = ({product}: {product: IproductCart}) => {
  const [qty, setQty] = React.useState(product.quantity);
  const dispatch = useDispatch();
  const plusQty = React.useCallback(() => {
    if (product.quantity === 99) return;
    if (qty) {
      setQty(qty + 1);
    }
  }, [qty]);

  const minusQty = React.useCallback(() => {
    if (qty === 1) return;
    if (qty) {
      setQty(qty - 1);
    }
  }, [qty]);

  React.useEffect(() => {
    dispatch(
      productCartUpdateOne({
        id: product.product_id,
        changes: {
          ...product,
          quantity: qty,
        },
      }),
    );
  }, [qty]);

  return (
    <View row marginB-20 paddingH-25>
      <TouchableOpacity
        style={styles.btnClose}
        center
        onPress={() => {
          dispatch(
            productCartRemoveOne({
              id: product.product_id,
            }),
          );
        }}>
        <Image assetName="cartClose" assetGroup="icons" />
      </TouchableOpacity>
      <View style={styles.imageWrap} marginR-27>
        <FastImage
          source={{
            uri: product.image,
            priority: 'high',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.meta}>
        <Text white textSemiBold marginB-8 style={styles.name}>
          {product.name} <Text primary>x {qty}</Text>
        </Text>
        <View row spread centerV>
          <Text white textSemiBold style={styles.price}>
            {numeral(product.price).format('0,0')} VNĐ
          </Text>

          <Quantity qty={qty} minusQty={minusQty} plusQty={plusQty} />
        </View>
      </View>
    </View>
  );
};

export default ItemCart;

const styles = StyleSheet.create({
  imageWrap: {
    width: 82,
    height: 82,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 18,
    lineHeight: 18,
  },
  addOn: {
    fontSize: 12,
    lineHeight: 12,
  },
  price: {
    fontSize: 16,
  },
  meta: {
    width: getScreenWidth() - 50 - 109,
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 25,
    width: 11.77,
    height: 11.77,
    zIndex: 99,
  },
});
