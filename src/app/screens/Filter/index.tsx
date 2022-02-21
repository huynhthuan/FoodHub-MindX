import {Button, Slider, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import ItemCategoryFilter from '../../components/Filter/ItemCategoryFilter';
import ItemSortFilter from '../../components/Filter/ItemSortFilter';
import ItemRatingFilter from '../../components/Filter/ItemRatingFilter';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {getScreenWidth} from '../../utilities/helpers';
import {useAppSelector} from '../../hook';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const Filter = () => {
  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    React.useState([0, 1000000]);
  const nonCollidingMultiSliderValuesChange = (values: any) =>
    setNonCollidingMultiSliderValue(values);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const categoriesList = useAppSelector(state => state.categoriesSlice);
  const [category, setCategory] = React.useState([]);
  const [rate, setRate] = React.useState([]);

  return (
    <View flex-1 bg-primaryDark paddingT-70>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 156,
        }}>
        <View paddingH-25>
          <Text marginB-19 textSemiBold white style={styles.title}>
            Danh mục
          </Text>
        </View>

        <View row paddingH-25 style={styles.filterBox}>
          {_.map(categoriesList.entities, (option, index) => (
            <ItemCategoryFilter
              setCategory={setCategory}
              key={index}
              data={option}
            />
          ))}
        </View>

        <View paddingH-25>
          <Text marginB-19 textSemiBold white style={styles.title}>
            Đánh giá
          </Text>
        </View>

        <View paddingH-25 row style={styles.filterBox}>
          {_.map([5, 4, 3, 2, 1], (option, index) => (
            <ItemRatingFilter setRate={setRate} key={index} label={option} />
          ))}
        </View>

        <View row paddingH-25 spread marginB-19>
          <Text textSemiBold white style={styles.title}>
            Khoảng giá
          </Text>
          <Text white textLight style={styles.priceRange}>
            {nonCollidingMultiSliderValue[0]} VNĐ -{' '}
            {nonCollidingMultiSliderValue[1]} VNĐ
          </Text>
        </View>

        <View paddingH-35>
          <MultiSlider
            values={[
              nonCollidingMultiSliderValue[0],
              nonCollidingMultiSliderValue[1],
            ]}
            sliderLength={getScreenWidth() - 70}
            onValuesChange={nonCollidingMultiSliderValuesChange}
            min={0}
            max={1000000}
            step={100000}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={40}
            trackStyle={{backgroundColor: '#474755'}}
            markerStyle={{
              backgroundColor: '#FE724C',
            }}
            selectedStyle={{
              backgroundColor: '#FE724C',
            }}
          />
        </View>
      </ScrollView>

      <View row spread style={styles.buttonGroup}>
        <Button
          bg-primary
          style={styles.btn}
          onPress={() => {
            navigation.navigate('FilterFood', {
              filterData: {
                category: category,
                rate: rate,
                min_price: nonCollidingMultiSliderValue[0],
                max_price: nonCollidingMultiSliderValue[1],
              },
            });
          }}>
          <Text white textSemiBold style={styles.text}>
            Lọc
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  filterBox: {
    flexWrap: 'wrap',
  },
  slider: {
    marginVertical: 6,
  },
  priceRange: {
    fontSize: 14,
  },
  btn: {
    width: getScreenWidth() - 50,
    height: 57,
  },
  text: {
    fontSize: 18,
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 28,
    left: 25,
    right: 25,
  },
});
