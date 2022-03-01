import {
  Image,
  Incubator,
  Picker,
  PickerItemValue,
  Text,
  View,
} from 'react-native-ui-lib';
import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ItemFood from '../../components/Item/Food/ItemFood';
import {getScreenWidth} from '../../utilities/helpers';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {
  BASE_URL_WOOCOMMERCE,
  BASE_URL_WP_MEDIA,
  BASE_URL_WP_PRODUCT_CAT,
  WOO_KEY,
  WOO_SECRET,
} from '../../api/constants';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from '../../hook';
import {productAddMany, productReceived} from '../../redux/slices/productSlice';
import {showToast} from '../../redux/slices/toastSlice';
import ListEmptyItem from '../../components/Item/Food/ListEmptyItem';

const Category = () => {
  const renderItemCategory = React.useCallback(
    ({item}) => <ItemFood customStyle={{marginBottom: 20}} id={item} />,
    [],
  );

  const [sort, setSort] = useState({order: 'desc', orderBy: 'popularity'});
  const [sortLabel, setSortLabel] = useState('desc-popularity');
  const route = useRoute<RouteProp<MainStackParamList, 'Category'>>();
  const [imageDecor, setImageDecor] = React.useState('');
  const dispatch = useAppDispatch();
  const productList = useAppSelector(state => state.productSlice);
  const [productLoading, setProductLoading] = React.useState(false);

  const [page, setPage] = React.useState(1);

  const getProduct = React.useCallback(() => {
    setPage(1);
    dispatch(
      productReceived({
        productList: JSON.stringify([]),
      }),
    );
    setImageDecor('');
    axios
      .get(BASE_URL_WP_PRODUCT_CAT + route.params.CategoryDetail.id)
      .then(res => {
        if (res.data.acf.category_image_decore_top) {
          axios
            .get(BASE_URL_WP_MEDIA + res.data.acf.category_image_decore_top)
            .then(res => {
              setImageDecor(res.data.guid.rendered);
            });
        }
      });

    setProductLoading(true);

    axios
      .get(BASE_URL_WOOCOMMERCE + 'products', {
        params: {
          category: route.params.CategoryDetail.id,
          page: 1,
          order: sort.order,
          orderby: sort.orderBy,
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        dispatch(
          productReceived({
            productList: JSON.stringify(res.data),
          }),
        );
        setProductLoading(false);
      })
      .catch((error: any) => {
        dispatch(
          productReceived({
            productList: JSON.stringify([]),
          }),
        );
        setProductLoading(false);
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại!',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [route.params.CategoryDetail.id, sort]);

  React.useEffect(() => {
    getProduct();
  }, [route.params.CategoryDetail.id, sort]);

  React.useEffect(() => {
    setProductLoading(true);
    axios
      .get(BASE_URL_WOOCOMMERCE + 'products', {
        params: {
          category: route.params.CategoryDetail.id,
          page,
          order: sort.order,
          orderby: sort.orderBy,
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        dispatch(
          productAddMany({
            productList: JSON.stringify(res.data),
          }),
        );
        setProductLoading(false);
      })
      .catch((error: any) => {
        setProductLoading(false);
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại!',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [page]);

  return (
    <View flex-1 bg-primaryDark paddingT-96>
      <View style={styles.imageWrap}>
        {imageDecor === '' ? (
          <Image
            assetName="categoryDecor"
            assetGroup="images"
            style={styles.image}
          />
        ) : (
          <FastImage
            source={{
              uri: imageDecor,
              priority: FastImage.priority.high,
            }}
            style={{
              width: 271,
              height: 333,
            }}
          />
        )}
      </View>

      <View paddingH-25>
        <Text white textBold style={styles.title} marginB-25>
          {route.params.CategoryDetail.name}
        </Text>
        <Text gray2 textRegular style={styles.desc} marginB-30>
          {route.params.CategoryDetail.count} món ăn của{' '}
          {route.params.CategoryDetail.name}
        </Text>
      </View>

      <View row spread marginB-20 paddingH-25 centerV>
        <View row>
          <Text white textRegular marginR-5>
            Sắp xếp theo:
          </Text>

          <Picker
            value={sortLabel}
            placeholder={'Placeholder'}
            onChange={(item: any) => {
              let sortArr = item.value.split('-');
              setSort({order: sortArr[0], orderBy: sortArr[1]});
              setSortLabel(item);
            }}
            renderPicker={(value: PickerItemValue, label: string) => (
              <Text textMedium primary>
                {label}
              </Text>
            )}>
            <Picker.Item
              key={'asc-price'}
              label="Giá thấp đến cao"
              value={'asc-price'}></Picker.Item>
            <Picker.Item
              key={'desc-price'}
              label="Giá cao đến thấp"
              value={'desc-price'}></Picker.Item>
            <Picker.Item
              key={'asc-title'}
              label="A-Z"
              value={'asc-title'}></Picker.Item>
            <Picker.Item
              key={'desc-title'}
              label="Z-A"
              value={'desc-title'}></Picker.Item>
            <Picker.Item
              key={'desc-rating'}
              label="Đánh giá"
              value={'desc-rating'}></Picker.Item>
            <Picker.Item
              key={'desc-popularity'}
              label="Phổ biến"
              value={'desc-popularity'}></Picker.Item>
          </Picker>
        </View>
      </View>

      <FlatList
        data={productList.ids}
        renderItem={renderItemCategory}
        contentContainerStyle={styles.content}
        refreshing={productLoading}
        onRefresh={() => {
          getProduct();
        }}
        ListEmptyComponent={ListEmptyItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setPage(page + 1);
        }}
        numColumns={2}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  imageWrap: {
    width: 271,
    height: 333,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 45,
    maxWidth: (getScreenWidth() - 50) / 2,
  },
  desc: {
    fontSize: 19,
    lineHeight: 22.8,
    textTransform: 'lowercase',
    maxWidth: 150,
  },
  btn: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40,
  },
});
