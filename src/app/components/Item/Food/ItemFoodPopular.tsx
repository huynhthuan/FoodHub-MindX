import {
  Image,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React, {useState} from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../../App';
import {useAppDispatch, useAppSelector} from '../../../hook';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {BASE_URL_WP_API_USER} from '../../../api/constants';
import {setLoading} from '../../../redux/slices/loadingSlice';
import {logout, updateProductLike} from '../../../redux/slices/userSlice';
import {showToast} from '../../../redux/slices/toastSlice';
import _ from 'lodash';
import {
  favoritesAddOne,
  favoritesRemoveOne,
} from '../../../redux/slices/favoriteSlice';
import {getScreenWidth} from '../../../utilities/helpers';
let numeral = require('numeral');

export interface IItemFoodLarger {
  id: number;
  customStyle?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
}

const ItemFoodPopular = ({id, customStyle}: IItemFoodLarger) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const entitieProduct = useAppSelector(
    state => state.productPopularSlice.entities,
  );
  const product: any = entitieProduct[id];
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.userSlice);
  const [isLike, setIsLike] = React.useState(false);

  if (!product) return null;

  React.useEffect(() => {
    if (userState.product_like?.split(',')) {
      if (userState.product_like?.split(',').includes(id.toString())) {
        setIsLike(true);
      }
    }
  }, [id]);

  const updateProductLikeUser = React.useCallback((productLike: string) => {
    axios
      .post(
        BASE_URL_WP_API_USER + userState.id,
        {
          acf: {
            product_like: productLike,
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + userState.token,
          },
        },
      )
      .then(res => {
        console.log('done', res.data.acf.product_like);
        dispatch(updateProductLike(productLike));
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
      })
      .catch(error => {
        console.log(error);
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        if (error.response?.data?.data.status === 403) {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Phiên đăng nhập của bạn đã hết hạn. Vui Lòng đăng nhập lại!',
              preset: Incubator.ToastPresets.OFFLINE,
            }),
          );
          dispatch(logout());
          return;
        }

        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra. Vui lòng thử lại !',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, []);

  const likeProduct = React.useCallback(() => {
    let newProductLine = [];
    let productLike = userState.product_like?.split(',');

    dispatch(
      setLoading({
        isShown: true,
      }),
    );

    if (userState.product_like?.split(',')) {
      if (isLike) {
        if (productLike) {
          let index = productLike.indexOf(id.toString());
          productLike.splice(index, 1);
          setIsLike(false);
          updateProductLikeUser(productLike.join(','));
          dispatch(
            favoritesRemoveOne({
              productId: id,
            }),
          );
        }
      } else {
        if (productLike) {
          productLike.push(id.toString());
          setIsLike(true);
          updateProductLikeUser(productLike.join(','));
          dispatch(
            favoritesAddOne({
              product: JSON.stringify(entitieProduct[id]),
            }),
          );
        }
      }
    } else {
      newProductLine.push(id.toString());
      setIsLike(true);
      updateProductLikeUser(newProductLine.join(','));
      dispatch(
        favoritesAddOne({
          product: JSON.stringify(entitieProduct[id]),
        }),
      );
    }
  }, [isLike, userState.product_like]);

  return (
    <View style={[styles.container, customStyle]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Reviews', {foodData: product});
        }}
        center
        bg-dark4
        row
        style={styles.reviewWrap}>
        <Text white style={styles.rate}>
          {product.average_rating}
        </Text>

        <Image
          assetName="star"
          assetGroup="icons"
          width={9.89}
          height={9.45}
          marginR-3
        />
        <Text style={styles.count}>({product.rating_count}+)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favorite}
        onPress={() => {
          likeProduct();
        }}>
        {isLike ? (
          <Image assetName="like" tintColor="red" assetGroup="icons" />
        ) : (
          <Image assetName="like" assetGroup="icons" />
        )}
      </TouchableOpacity>
      <View marginB-22 style={styles.imagesWrap}>
        <FastImage
          source={{
            uri: product.images[0]?.src,
            priority: 'high',
          }}
          style={styles.images}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FoodDetails', {foodId: id});
        }}>
        <Text white marginB-8 style={styles.name}>
          {product.name}
        </Text>
      </TouchableOpacity>
      <View paddingH-10>
        <Text white style={styles.priceText}>
          {numeral(product.price).format('0,0')} VNĐ
        </Text>
        {product.sale_price ? (
          <Text white style={styles.salePrice}>
            {numeral(product.regular_price).format('0,0')} VNĐ
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default ItemFoodPopular;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#393948',
    borderRadius: 15,
    paddingBottom: 11,
    overflow: 'hidden',
    width: getScreenWidth() / 2 - 25 - 10,
    marginRight: 20,
  },
  reviewWrap: {
    position: 'absolute',
    top: 136 - 28.7 / 2,
    left: 11,
    height: 28.7,
    borderRadius: 100,
    zIndex: 22,
    paddingLeft: 8,
    paddingRight: 5,
  },
  rate: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 11.69,
    marginRight: 4.21,
  },
  count: {
    fontFamily: 'SofiaPro',
    fontSize: 8.19,
    color: '#9796A1',
  },
  images: {
    width: '100%',
    height: '100%',
  },
  imagesWrap: {
    height: 136,
    borderRadius: 15,
    overflow: 'hidden',
  },
  name: {
    paddingHorizontal: 11,
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 15,
    lineHeight: 15,
  },
  metaText: {
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: '#ADADB8',
  },
  desc: {
    paddingHorizontal: 11,
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: '#ADADB8',
  },
  priceWrap: {
    height: 28,
    borderRadius: 100,
    paddingHorizontal: 8,
    position: 'absolute',
    top: 10,
    left: 11,
    zIndex: 22,
  },
  priceText: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 19,
    lineHeight: 26,
  },
  favorite: {
    position: 'absolute',
    right: 11,
    top: 10,
    zIndex: 22,
  },
  salePrice: {
    textDecorationLine: 'line-through',
  },
});
