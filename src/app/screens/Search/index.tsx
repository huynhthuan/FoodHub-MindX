import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from '../../hook';
import {
  productSearchAddMany,
  productSearchReceived,
} from '../../redux/slices/productSearchSlice';
import {showToast} from '../../redux/slices/toastSlice';
import ItemFoodSearch from '../../components/Item/Food/ItemFoodSearch';
import SearchBarOnpage from '../../components/HomeMenu/SearchBarOnpage';
import axios from 'axios';
import {BASE_URL_WOOCOMMERCE, WOO_KEY, WOO_SECRET} from '../../api/constants';

const Search = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(state => state.productSearchSlice);
  const [isLoading, setIsLoading] = React.useState(false);
  const [keyWord, setKeyWord] = React.useState('');
  const [page, setPage] = React.useState(1);

  const renderItemSearchFood = React.useCallback(
    ({item}) => (
      <ItemFoodSearch
        customStyle={{
          width: (getScreenWidth() - 50) / 2 - 10,
          marginRight: 19,
          marginBottom: 19,
        }}
        id={item}
      />
    ),
    [],
  );

  const searchItem = React.useCallback(() => {
    dispatch(
      productSearchReceived({
        productList: JSON.stringify([]),
      }),
    );
    if (keyWord !== '') {
      setIsLoading(true);
      axios
        .get(BASE_URL_WOOCOMMERCE + 'products', {
          params: {
            page: 1,
            search: keyWord,
            consumer_key: WOO_KEY,
            consumer_secret: WOO_SECRET,
          },
        })
        .then(res => {
          setIsLoading(false);
          dispatch(
            productSearchReceived({
              productList: JSON.stringify(res.data),
            }),
          );
        })
        .catch(() => {
          setIsLoading(false);
          dispatch(
            showToast({
              msg: 'Đã có lỗi xảy ra. Vui lòng thử lại!',
              preset: Incubator.ToastPresets.FAILURE,
              isShown: true,
            }),
          );
        });
    }
  }, [keyWord]);

  React.useEffect(() => {
    if (page > 1) {
      console.log('inpage');

      setIsLoading(true);
      axios
        .get(BASE_URL_WOOCOMMERCE + 'products', {
          params: {
            page: page,
            search: keyWord,
            consumer_key: WOO_KEY,
            consumer_secret: WOO_SECRET,
          },
        })
        .then(res => {
          setIsLoading(false);
          dispatch(
            productSearchAddMany({
              productList: JSON.stringify(res.data),
            }),
          );
        })
        .catch(() => {
          setIsLoading(false);
          dispatch(
            showToast({
              msg: 'Đã có lỗi xảy ra. Vui lòng thử lại!',
              preset: Incubator.ToastPresets.FAILURE,
              isShown: true,
            }),
          );
        });
    }
  }, [page]);

  return (
    <View flex bg-primaryDark paddingT-80 paddingH-25>
      <View row spread>
        <SearchBarOnpage
          keyWord={keyWord}
          setKeyWord={setKeyWord}
          showSoftInputOnFocus={true}
          autofocus={true}
        />
        <Button
          style={styles.button}
          onPress={() => {
            searchItem();
          }}>
          <Image assetName="search" assetGroup="icons" />
        </Button>
      </View>
      <View flex>
        <Text white marginB-16 style={styles.title}>
          {keyWord === ''
            ? 'Nhập từ khóa món ăn cần tìm'
            : `Kết quả cho: ${keyWord}`}
        </Text>
        <FlatList
          data={productList.ids}
          renderItem={renderItemSearchFood}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          refreshing={isLoading}
          onRefresh={() => {
            searchItem();
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            setPage(page + 1);
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  tabBar: {
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 4,
    borderRadius: 23.5,
    borderColor: '#474755',
  },
  title: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 24,
  },
  titleRecent: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 18,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#393948',
    borderRadius: 14,
    height: 51,
    width: 51,
    minWidth: 51,
  },
});
