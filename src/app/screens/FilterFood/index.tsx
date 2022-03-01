import {Incubator, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from '../../hook';
import ListEmptyItem from '../../components/Item/Food/ListEmptyItem';
import {changeHeaderBackground, getScreenHeight} from '../../utilities/helpers';
import {
  productFilterAddMany,
  productFilterReceived,
} from '../../redux/slices/productFilterSlice';
import {showToast} from '../../redux/slices/toastSlice';
import ItemFoodFilter from '../../components/Item/Food/ItemFoodFilter';
import axios from 'axios';
import {BASE_URL_WOOCOMMERCE, WOO_KEY, WOO_SECRET} from '../../api/constants';

const FilterFood = () => {
  const route = useRoute<RouteProp<MainStackParamList, 'FilterFood'>>();
  const dispatch = useAppDispatch();
  const productFilterList = useAppSelector(state => state.productFilterSlice);
  const [refresh, setRefresh] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const renderItemFoodFilter = React.useCallback(
    ({item}) => <ItemFoodFilter id={item} />,
    [],
  );

  const getProductFilter = React.useCallback(() => {
    setRefresh(true);
    setPage(1);
    dispatch(
      productFilterReceived({
        productList: JSON.stringify([]),
      }),
    );
    axios
      .get(BASE_URL_WOOCOMMERCE + 'products', {
        params: {
          category: route.params.filterData.category.join(','),
          min_price: route.params.filterData.min_price.toString(),
          max_price: route.params.filterData.max_price.toString(),
          page: 1,
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        let maxRate = _.max(route.params.filterData.rate)
          ? _.max(route.params.filterData.rate)
          : 5;
        let minRate = _.min(route.params.filterData.rate)
          ? _.min(route.params.filterData.rate)
          : 0;

        let dataFilterRating = _.filter(
          res.data,
          o => o.average_rating >= minRate && o.average_rating <= maxRate,
        );

        dispatch(
          productFilterReceived({
            productList: JSON.stringify(dataFilterRating),
          }),
        );
        setRefresh(false);
      })
      .catch((error: any) => {
        console.log(error);
        setRefresh(false);
        dispatch(
          showToast({
            isShown: true,
            msg: `Đã có lỗi xảy ra. Vui lòng thử lại`,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [route.params.filterData]);

  React.useEffect(() => {
    getProductFilter();
  }, []);

  React.useEffect(() => {
    setRefresh(true);
    axios
      .get(BASE_URL_WOOCOMMERCE + 'products', {
        params: {
          category: route.params.filterData.category.join(','),
          min_price: route.params.filterData.min_price.toString(),
          max_price: route.params.filterData.max_price.toString(),
          page: page,
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        let maxRate = _.max(route.params.filterData.rate)
          ? _.max(route.params.filterData.rate)
          : 5;
        let minRate = _.min(route.params.filterData.rate)
          ? _.min(route.params.filterData.rate)
          : 0;
        let dataFilterRating = _.filter(
          res.data,
          o => o.average_rating >= minRate && o.average_rating <= maxRate,
        );
        dispatch(
          productFilterAddMany({
            productList: JSON.stringify(dataFilterRating),
          }),
        );
        setRefresh(false);
      })
      .catch((error: any) => {
        console.log(error);
        setRefresh(false);
        dispatch(
          showToast({
            isShown: true,
            msg: `Đã có lỗi xảy ra. Vui lòng thử lại`,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [page]);

  return (
    <View paddingT-74 bg-primaryDark>
      <FlatList
        onScroll={event => {
          changeHeaderBackground(event.nativeEvent, navigation);
        }}
        data={productFilterList.ids}
        renderItem={renderItemFoodFilter}
        ListEmptyComponent={ListEmptyItem}
        contentContainerStyle={styles.container}
        refreshing={refresh}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => {
          getProductFilter();
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setPage(page + 1);
        }}
        numColumns={2}
      />
    </View>
  );
};

export default FilterFood;

const styles = StyleSheet.create({
  container: {
    minHeight: getScreenHeight(),
    paddingHorizontal: 25,
  },
});
