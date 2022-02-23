import {
  Button,
  Image,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import Quantity from '../../components/Cart/Quantity';
import {changeHeaderBackground, getScreenWidth} from '../../utilities/helpers';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import WooApi from '../../api/wooApi';
import {useAppDispatch, useAppSelector} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';
import RenderHTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import {productCartAddOne} from '../../redux/slices/productCartSlice';
import {logout, updateProductLike} from '../../redux/slices/userSlice';
import {BASE_URL_WP_API_USER} from '../../api/constants';
import axios from 'axios';
import {setLoading} from '../../redux/slices/loadingSlice';
import {
  favoritesAddOne,
  favoritesRemoveOne,
} from '../../redux/slices/favoriteSlice';
let numeral = require('numeral');

const FoodDetails = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<MainStackParamList, 'FoodDetails'>>();
  const productId = route.params.foodId;
  const [data, setData] = React.useState({});

  const navigation =
    useNavigation<NavigationProp<MainStackParamList, 'Reviews'>>();
  const [qty, setQty] = React.useState(1);

  const userState = useAppSelector(state => state.userSlice);
  const [isLike, setIsLike] = React.useState(false);
  const entitieProduct = useAppSelector(state => state.productSlice.entities);

  React.useEffect(() => {
    WooApi.get('products/' + productId)
      .then((data: any) => {
        setData(data);
      })
      .catch((error: any) => {
        dispatch(
          showToast({
            isShown: true,
            msg: `Đã có lỗi xảy ra. Vui lòng thử lại`,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [productId]);

  const plusQty = React.useCallback(() => {
    if (qty === 99) return;
    setQty(qty + 1);
  }, [qty]);

  const minusQty = React.useCallback(() => {
    if (qty === 1) return;
    setQty(qty - 1);
  }, [qty]);

  const addToCart = React.useCallback(() => {
    dispatch(
      productCartAddOne({
        product: {
          product_id: productId,
          quantity: qty,
          price: data.price,
          name: data.name,
          image: data.images[0].src,
        },
      }),
    );
    dispatch(
      showToast({
        msg: 'Thêm vào giỏ hàng thành công',
        preset: Incubator.ToastPresets.SUCCESS,
        isShown: true,
      }),
    );
  }, [qty, productId, data]);

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
          let index = productLike.indexOf(productId.toString());
          productLike.splice(index, 1);
          setIsLike(false);
          updateProductLikeUser(productLike.join(','));
          dispatch(
            favoritesRemoveOne({
              productId: productId,
            }),
          );
        }
      } else {
        if (productLike) {
          productLike.push(productId.toString());
          setIsLike(true);
          updateProductLikeUser(productLike.join(','));
          dispatch(
            favoritesAddOne({
              product: JSON.stringify(entitieProduct[productId]),
            }),
          );
        }
      }
    } else {
      newProductLine.push(productId.toString());
      setIsLike(true);
      updateProductLikeUser(newProductLine.join(','));
      dispatch(
        favoritesAddOne({
          product: JSON.stringify(entitieProduct[productId]),
        }),
      );
    }
  }, [isLike, userState.product_like]);

  React.useEffect(() => {
    if (userState.product_like?.split(',')) {
      if (userState.product_like?.split(',').includes(productId.toString())) {
        setIsLike(true);
      }
    }
  }, [productId]);

  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={({nativeEvent}) => {
          changeHeaderBackground(nativeEvent, navigation);
        }}>
        {data.id ? (
          <>
            <View marginB-22 style={styles.imageWrap}>
              <FastImage
                source={{
                  uri: data.images[0]?.src,
                  priority: 'high',
                }}
                style={styles.image}
              />
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
            </View>
            <Text white marginB-16 style={styles.title}>
              {data.name}
            </Text>
            <View marginB-16 row style={styles.reviewWrap}>
              <Image
                assetName="star"
                assetGroup="icons"
                width={17.78}
                height={17}
                marginR-8
              />
              <Text white style={styles.rate}>
                {data.average_rating}
              </Text>

              <Text style={styles.count}>({data.rating_count}+)</Text>

              <TouchableOpacity>
                <Text
                  primary
                  underline
                  marginL-7
                  style={styles.reviewLink}
                  onPress={() => {
                    navigation.navigate('Reviews', {
                      foodData: data,
                    });
                  }}>
                  Xem đánh giá
                </Text>
              </TouchableOpacity>
            </View>

            <View row spread marginB-19>
              <View style={styles.priceWrap}>
                <Text white style={styles.price}>
                  {numeral(data.price).format('0,0')} VNĐ
                </Text>
                {data.sale_price ? (
                  <Text white style={styles.salePrice}>
                    {numeral(data.regular_price).format('0,0')} VNĐ
                  </Text>
                ) : (
                  <></>
                )}
              </View>

              <Quantity qty={qty} minusQty={minusQty} plusQty={plusQty} />
            </View>
            <View marginB-137>
              <RenderHTML
                contentWidth={getScreenWidth() - 50}
                systemFonts={['SofiaPro-Bold', 'SofiaPro-Medium', 'SofiaPro']}
                source={{
                  html: `<div style="color: white; line-height: 20px;font-family: 'SofiaPro'">${data.description}</div>`,
                }}
              />
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" color="#fff" />
        )}
      </ScrollView>
      {data.id ? (
        <Button
          bg-primary
          style={styles.btnAddCart}
          onPress={() => {
            addToCart();
          }}>
          <View center style={styles.iconWrap}>
            <Image
              assetName="cart"
              assetGroup="icons"
              width={16}
              height={17}
              tintColor="#FE724C"
            />
          </View>
          <Text white textBold style={styles.addCartText}>
            Thêm vào giỏ hàng
          </Text>
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
    paddingHorizontal: 25,
    paddingTop: 74,
  },
  reviewWrap: {
    alignItems: 'center',
  },
  rate: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 14,
    marginRight: 7,
  },
  count: {
    fontFamily: 'SofiaPro',
    fontSize: 14,
    color: '#9796A1',
  },
  sectionTitle: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 18,
    lineHeight: 18,
  },
  imageWrap: {
    height: 206,
    overflow: 'hidden',
    borderRadius: 14,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favorite: {
    position: 'absolute',
    right: 16,
    top: 15,
    zIndex: 22,
  },
  title: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 31,
    lineHeight: 35.65,
  },
  reviewLink: {
    fontSize: 12,
  },
  currency: {
    fontSize: 17,
    lineHeight: 17,
    fontFamily: 'SofiaPro-Medium',
  },
  price: {
    fontSize: 31,
    fontFamily: 'SofiaPro-Medium',
  },
  priceWrap: {
    alignItems: 'flex-start',
  },
  desc: {
    color: '#9796A1',
    fontFamily: 'SofiaPro',
    lineHeight: 22.5,
  },
  btnAddCart: {
    width: 220,
    height: 53,
    position: 'absolute',
    bottom: 38,
    left: getScreenWidth() / 2,
    transform: [{translateX: -220 / 2}],
    paddingRight: 6,
    paddingLeft: 6,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    marginRight: 6,
  },
  addCartText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  salePrice: {
    textDecorationLine: 'line-through',
  },
});
