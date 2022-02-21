import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../hook';
import FastImage from 'react-native-fast-image';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const CategoryItem = ({id}: {id: number}) => {
  const entitieOrders = useAppSelector(state => state.categoriesSlice.entities);
  const category: any = entitieOrders[id];
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  if (!category) return null;

  return (
    <TouchableOpacity
      bg-dark
      centerH
      style={styles.container}
      onPress={() => {
        navigation.navigate('Category', {
          CategoryDetail: category,
        });
      }}>
      <View bg-white marginB-15 center style={styles.imagesWrap}>
        <FastImage
          source={{
            uri: category.image.src,
            priority: FastImage.priority.high,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <Text white center style={styles.name}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingTop: 7,
    paddingBottom: 17.61,
    width: 58,
    marginRight: 12,
  },
  imagesWrap: {
    width: 46,
    height: 46,
    borderRadius: 100,
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'SofiaPro',
    fontSize: 11,
    paddingHorizontal: 5,
  },
});
