import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hook';
import {changeHeaderBackground, getScreenHeight} from '../../utilities/helpers';
import ItemFoodFavorite from '../../components/Item/Food/ItemFoodFavorite';
import ListEmptyItemFavorite from '../../components/Item/Food/ListEmptyItemFavorite';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {Incubator, View} from 'react-native-ui-lib';
import {showToast} from '../../redux/slices/toastSlice';
import {
  favoritesAddMany,
  favoritesReceived,
} from '../../redux/slices/favoriteSlice';
import axios from 'axios';
import {BASE_URL_WOOCOMMERCE, WOO_KEY, WOO_SECRET} from '../../api/constants';

const Favorites = () => {
  const renderItemFood = React.useCallback(
    ({item}) => <ItemFoodFavorite customStyle={{marginBottom: 20}} id={item} />,
    [],
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const favoriteSList = useAppSelector(state => state.favoritesSlice);
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();

  const getData = React.useCallback(() => {
    setIsLoading(true);
    if (userState.product_like?.split(',')) {
      axios
        .get(BASE_URL_WOOCOMMERCE + 'products', {
          params: {
            include: userState.product_like?.split(','),
            consumer_key: WOO_KEY,
            consumer_secret: WOO_SECRET,
          },
        })
        .then(res => {
          setIsLoading(false);
          dispatch(
            favoritesReceived({
              productList: JSON.stringify(res.data),
            }),
          );
        })
        .catch((error: any) => {
          setIsLoading(false);
          dispatch(
            showToast({
              msg: 'Đã có lỗi xảy ra.Vui lòng thử lại.',
              preset: Incubator.ToastPresets.FAILURE,
              isShown: true,
            }),
          );
        });
    } else {
      setIsLoading(false);
      dispatch(
        favoritesReceived({
          productList: JSON.stringify([]),
        }),
      );
    }
  }, [userState.product_like]);

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      if (userState.product_like?.split(',')) {
        axios
          .get(BASE_URL_WOOCOMMERCE + 'products', {
            params: {
              include: userState.product_like?.split(','),
              page,
              consumer_key: WOO_KEY,
              consumer_secret: WOO_SECRET,
            },
          })
          .then(res => {
            setIsLoading(false);
            dispatch(
              favoritesAddMany({
                productList: JSON.stringify(res.data),
              }),
            );
          })
          .catch((error: any) => {
            setIsLoading(false);
            dispatch(
              showToast({
                msg: 'Đã có lỗi xảy ra.Vui lòng thử lại.',
                preset: Incubator.ToastPresets.FAILURE,
                isShown: true,
              }),
            );
          });
      } else {
        setIsLoading(false);
        dispatch(
          favoritesReceived({
            productList: JSON.stringify([]),
          }),
        );
      }
    }
  }, [page, userState.product_like]);

  return (
    <View bg-primaryDark paddingT-74>
      <FlatList
        onScroll={({nativeEvent}) => {
          changeHeaderBackground(nativeEvent, navigation);
        }}
        data={favoriteSList.ids}
        renderItem={renderItemFood}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContentStyle}
        ListEmptyComponent={ListEmptyItemFavorite}
        refreshing={isLoading}
        onRefresh={() => {
          getData();
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setPage(page + 1);
        }}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  tabBar: {
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 4,
    borderRadius: 23.5,
    borderColor: '#474755',
  },
  listContentStyle: {
    paddingHorizontal: 25,
    minHeight: getScreenHeight(),
  },
});
