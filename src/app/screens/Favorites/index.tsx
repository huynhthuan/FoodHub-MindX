import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListEmptyComponent from '../../components/MyOrders/ListEmptyComponent';
import {useAppSelector} from '../../hook';
import {useDispatch} from 'react-redux';
import {changeHeaderBackground, getScreenHeight} from '../../utilities/helpers';
import ItemFoodFavorite from '../../components/Item/Food/ItemFoodFavorite';
import ListEmptyItemFavorite from '../../components/Item/Food/ListEmptyItemFavorite';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const Favorites = () => {
  const renderItemFood = React.useCallback(
    ({item}) => <ItemFoodFavorite customStyle={{marginBottom: 20}} id={item} />,
    [],
  );

  const favoriteSList = useAppSelector(state => state.favoritesSlice);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <FlatList
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}
      data={favoriteSList.ids}
      renderItem={renderItemFood}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContentStyle}
      ListEmptyComponent={ListEmptyItemFavorite}
    />
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
    paddingTop: 74,
    backgroundColor: '#2D2D3A',
  },
});
