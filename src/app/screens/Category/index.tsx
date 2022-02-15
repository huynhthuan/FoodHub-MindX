import {
  Button,
  Image,
  Incubator,
  Picker,
  PickerItemValue,
  Text,
  View,
  WheelPicker,
} from 'react-native-ui-lib';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ItemFood from '../../components/Item/Food/ItemFood';
import {getScreenWidth} from '../../utilities/helpers';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {BASE_URL_WP_MEDIA, BASE_URL_WP_PRODUCT_CAT} from '../../api/constants';
import _ from 'lodash';

const data = [
  {
    name: 'Burger',
    id: '1',
  },
  {
    name: 'Chicken',
    id: '2',
  },
  {
    name: 'Fast Food',
    id: '3',
  },
  {
    name: 'Fast Food Hub',
    id: '4',
  },
  {
    name: 'Burger',
    id: '5',
  },
  {
    name: 'Chicken',
    id: '6',
  },
  {
    name: 'Fast Food',
    id: '7',
  },
  {
    name: 'Fast Food Hub',
    id: '8',
  },
];

const Category = () => {
  const renderItemCategory = React.useCallback(
    ({item}) => <ItemFood customStyle={{marginBottom: 20}} data={item} />,
    [],
  );

  const [sort, setSort] = useState('');

  const route = useRoute<RouteProp<MainStackParamList, 'Category'>>();

  const [imageDecor, setImageDecor] = React.useState('');

  React.useEffect(() => {
    console.log('Category ID', route.params.CategoryDetail.id);
    setImageDecor('');
    axios
      .get(BASE_URL_WP_PRODUCT_CAT + route.params.CategoryDetail.id)
      .then(res => {
        console.log(imageDecor);
        if (res.data.acf.category_image_decore_top) {
          axios
            .get(BASE_URL_WP_MEDIA + res.data.acf.category_image_decore_top)
            .then(res => {
              console.log(res.data.guid.rendered);
              setImageDecor(res.data.guid.rendered);
            });
        }
      });
  }, []);

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
          {route.params.CategoryDetail.count} type of{' '}
          {route.params.CategoryDetail.name}
        </Text>
      </View>
      <View row spread marginB-20 paddingH-25 centerV>
        <View row>
          <Text white textRegular marginR-5>
            Sắp xếp theo:
          </Text>

          <Picker
            value={sort}
            placeholder={'Placeholder'}
            onChange={(item: string) => {
              setSort(item);
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
              value={'desc-popularity '}></Picker.Item>
          </Picker>
        </View>

        <View>
          <Button style={styles.btn}>
            <Image assetName="fillter" assetGroup="icons" />
          </Button>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItemCategory}
        contentContainerStyle={styles.content}
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
    lineHeight: 49.5,
    maxWidth: (getScreenWidth() - 50) / 2,
  },
  desc: {
    fontSize: 19,
    lineHeight: 22.8,
    textTransform: 'lowercase',
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
