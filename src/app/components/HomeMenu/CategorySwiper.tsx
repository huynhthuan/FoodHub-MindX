import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Incubator} from 'react-native-ui-lib';
import WooApi from '../../api/wooApi';
import {useAppDispatch, useAppSelector} from '../../hook';
import {categoriesReceived} from '../../redux/slices/categoriesSlice';
import {showToast} from '../../redux/slices/toastSlice';
import CategoryItem from './CategoryItem';

const CategorySwiper = () => {
  const renderItem = React.useCallback(
    ({item}) => <CategoryItem id={item} />,
    [],
  );

  const categoriesList = useAppSelector(state => state.categoriesSlice);

  const dispatch = useAppDispatch();

  WooApi.get('products/categories', {
    exclude: [15],
  })
    .then((data: any) => {
      dispatch(
        categoriesReceived({
          categoriesList: JSON.stringify(data),
        }),
      );
    })
    .catch((error: any) => {
      dispatch(
        categoriesReceived({
          categoriesList: JSON.stringify([]),
        }),
      );
      dispatch(
        showToast({
          isShown: true,
          msg: 'Đã có lỗi xảy ra, vui lòng thử lại!',
          preset: Incubator.ToastPresets.FAILURE,
        }),
      );
    });

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={categoriesList.ids}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CategorySwiper;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    marginBottom: 30,
  },
});
