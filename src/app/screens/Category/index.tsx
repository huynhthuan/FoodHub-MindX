import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ItemFood from '../../components/Item/Food/ItemFood';
import {getScreenWidth} from '../../utilities/helpers';

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

  return (
    <View flex-1 bg-primaryDark paddingT-96>
      <View style={styles.imageWrap}>
        <Image
          assetName="categoryDecor"
          assetGroup="images"
          style={styles.image}
        />
      </View>
      <View paddingH-25>
        <Text white textBold style={styles.title} marginB-25>
          Fast Food
        </Text>
        <Text gray2 textRegular style={styles.desc} marginB-30>
          80 type of pizza
        </Text>
      </View>
      <View row spread marginB-20 paddingH-25 centerV>
        <View row>
          <Text white textRegular marginR-5>
            Sort by:
          </Text>
          <Text textMedium primary>
            Popular
          </Text>
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
