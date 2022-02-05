import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import CategoryItem from './CategoryItem';

const dataCategory = new Array(10).fill(null);

const CategorySwiper = () => {
  const renderItem = React.useCallback(({item}) => <CategoryItem />, []);

  return (
    <FlatList
      style={styles.container}
      data={dataCategory}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CategorySwiper;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});
