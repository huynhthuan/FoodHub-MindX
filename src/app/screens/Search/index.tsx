import {
  TabController,
  Text,
  View,
  TabControllerItemProps,
} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import SearchBar from '../../components/HomeMenu/SearchBar';
import {getScreenWidth} from '../../utilities/helpers';
import ItemSearchAgency from '../../components/Item/Agency/ItemSearchAgency';
import ItemFood from '../../components/Item/Food/ItemFood';
import RecentSearchItem from '../../components/Search/RecentSearchItem';
import _ from 'lodash';

const items: TabControllerItemProps[] = [
  {
    label: 'Food Items',
    style: {
      height: 47,
      borderBottomWidth: 0,
    },
    width: (getScreenWidth() - 50) / 2,
  },
  {
    label: 'Agency',
    style: {
      height: 47,
    },
    width: (getScreenWidth() - 50) / 2,
  },
];

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

const Search = () => {
  const renderItemSearchAgency = React.useCallback(
    ({item}) => <ItemSearchAgency data={item} />,
    [],
  );

  const renderItemSearchFood = React.useCallback(
    ({item}) => (
      <ItemFood
        customStyle={{
          width: (getScreenWidth() - 50) / 2 - 10,
          marginRight: 19,
          marginBottom: 19,
        }}
        data={item}
      />
    ),
    [],
  );

  return (
    <View flex bg-primaryDark paddingT-80 paddingH-25>
      <SearchBar showSoftInputOnFocus={true} autofocus={true} />
      <View>
        <Text marginB-19 white style={styles.titleRecent}>
          Recent search
        </Text>
        {_.map([1, 2, 3], (item, index) => (
          <RecentSearchItem key={index} />
        ))}
      </View>
      <View flex>
        <TabController items={items} initialIndex={0} asCarousel={false}>
          <View style={styles.tabBar}>
            <TabController.TabBar
              enableShadow={false}
              items={items}
              containerWidth={getScreenWidth() - 50}
              spreadItems={false}
              labelColor="#ffffff"
              labelStyle={{
                fontFamily: 'SofiaPro',
                fontSize: 14,
              }}
              selectedLabelStyle={{
                fontFamily: 'SofiaPro',
                fontSize: 14,
              }}
              backgroundColor={'#2D2D3A'}></TabController.TabBar>
          </View>

          <View marginT-42 flex>
            <TabController.TabPage index={0}>
              <Text white marginB-16 style={styles.title}>
                Found 56 results
              </Text>
              <FlatList
                data={data}
                renderItem={renderItemSearchFood}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
              />
            </TabController.TabPage>

            <TabController.TabPage index={1}>
              <Text white marginB-16 style={styles.title}>
                Found 56 results
              </Text>
              <FlatList
                data={data}
                renderItem={renderItemSearchAgency}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
              />
            </TabController.TabPage>
          </View>
        </TabController>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  tabBar: {
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 4,
    borderRadius: 23.5,
    borderColor: '#474755',
  },
  title: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 31,
    lineHeight: 35.65,
  },
  titleRecent: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 18,
    lineHeight: 18,
  },
});
