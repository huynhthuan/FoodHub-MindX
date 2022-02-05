import {Text, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import SearchBar from '../../components/HomeMenu/SearchBar';
import CategorySwiper from '../../components/HomeMenu/CategorySwiper';
import ItemFood from '../../components/Item/Food/ItemFood';
import ItemAgency from '../../components/Item/Agency/ItemAgency';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const dataAgency = [
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
];

const Home = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const renderItemAgency = React.useCallback(
    ({item}) => (
      <ItemAgency
        customStyle={{
          width: 266,
          marginRight: 15,
        }}
        data={item}
      />
    ),
    [],
  );

  const renderItemFood = React.useCallback(
    ({item}) => (
      <ItemFood
        customStyle={{
          width: 154,
          marginRight: 15,
        }}
        data={item}
      />
    ),
    [],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      onScroll={({nativeEvent}) => {
        if (nativeEvent.contentOffset.y > 0) {
          navigation.setOptions({
            headerBackgroundContainerStyle: {
              backgroundColor: '#474755',
            },
          });
        } else {
          navigation.setOptions({
            headerBackgroundContainerStyle: {
              backgroundColor: 'transparent',
            },
          });
        }
      }}>
      <View paddingT-70>
        <View paddingH-25>
          <Text marginB-29 white style={styles.title}>
            What would you like to order
          </Text>
        </View>

        <View paddingH-25>
          <SearchBar
            showSoftInputOnFocus={false}
            autofocus={false}
            onPressInCustom={() => {
              navigation.navigate('Search');
            }}
          />
        </View>

        <View paddingL-25>
          <CategorySwiper />
        </View>

        <View paddingH-25>
          <Text marginB-15 white style={styles.sectionTitle}>
            Featured agency
          </Text>
        </View>

        <View paddingL-25>
          <FlatList
            renderItem={renderItemAgency}
            data={dataAgency}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            keyExtractor={item => item.id}
          />
        </View>

        <View paddingH-25>
          <Text marginB-15 white style={styles.sectionTitle}>
            Popular dishes
          </Text>
        </View>

        <View paddingL-25>
          <FlatList
            renderItem={renderItemFood}
            data={dataAgency}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 30,
    lineHeight: 30,
    maxWidth: 272,
  },
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
  },
  list: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 18,
    lineHeight: 18,
  },
});
