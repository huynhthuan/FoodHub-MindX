import {Button, Slider, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import ItemCategoryFilter from '../../components/Filter/ItemCategoryFilter';
import ItemSortFilter from '../../components/Filter/ItemSortFilter';
import ItemRatingFilter from '../../components/Filter/ItemRatingFilter';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {getScreenWidth} from '../../utilities/helpers';

const Filter = () => {
  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    React.useState([0, 100]);
  const nonCollidingMultiSliderValuesChange = values =>
    setNonCollidingMultiSliderValue(values);

  return (
    <View flex-1 bg-primaryDark paddingT-70>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 156,
        }}>
        <View paddingH-25>
          <Text marginB-19 textSemiBold white style={styles.title}>
            Category
          </Text>
        </View>

        <View row paddingH-25 style={styles.filterBox}>
          {_.map(
            ['Fast food', 'Breakfast', 'Aisa', 'Mexican', 'Pizza', 'Donat'],
            (option, index) => (
              <ItemCategoryFilter key={index} label={option} />
            ),
          )}
        </View>

        <View paddingH-25>
          <Text marginB-19 textSemiBold white style={styles.title}>
            Sort by
          </Text>
        </View>

        <View row paddingH-25 style={styles.filterBox}>
          {_.map(
            [
              'Popular',
              'Free delivery',
              'Neaerst me',
              'Cost low to high',
              'Delivery time',
            ],
            (option, index) => (
              <ItemSortFilter key={index} label={option} />
            ),
          )}
        </View>

        <View paddingH-25>
          <Text marginB-19 textSemiBold white style={styles.title}>
            Rating
          </Text>
        </View>

        <View paddingH-25 row style={styles.filterBox}>
          {_.map(['5', '4', '3', '2', '1'], (option, index) => (
            <ItemRatingFilter key={index} label={option} />
          ))}
        </View>

        <View row paddingH-25 spread marginB-19>
          <Text textSemiBold white style={styles.title}>
            Price range
          </Text>
          <Text white textLight style={styles.priceRange}>
            {'$' + nonCollidingMultiSliderValue[0]} -{' '}
            {'$' + nonCollidingMultiSliderValue[1]}
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
            max={100}
            step={1}
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
        <Button bg-dark4 style={styles.btn}>
          <Text white textSemiBold style={styles.text}>
            Reset
          </Text>
        </Button>
        <Button bg-primary style={styles.btn}>
          <Text white textSemiBold style={styles.text}>
            Apply
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
    lineHeight: 18,
  },
  filterBox: {
    flexWrap: 'wrap',
  },
  slider: {
    marginVertical: 6,
  },
  priceRange: {
    fontSize: 18,
    lineHeight: 18,
  },
  btn: {
    width: (getScreenWidth() - 50) / 2 - 10,
    height: 57,
  },
  text: {
    fontSize: 15,
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 28,
    left: 25,
    right: 25,
  },
});
