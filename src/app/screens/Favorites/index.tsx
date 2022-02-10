import {
  TabController,
  TabControllerItemProps,
  Text,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import ItemFood from '../../components/Item/Food/ItemFood';
import ItemAgency from '../../components/Item/Agency/ItemAgency';
import ListEmptyComponent from '../../components/MyOrders/ListEmptyComponent';

const items: TabControllerItemProps[] = [
  {
    label: 'Food',
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

const Favorites = () => {
  const renderItemFood = React.useCallback(
    ({item}) => <ItemFood customStyle={{marginBottom: 20}} data={item} />,
    [],
  );

  const renderItemAgency = React.useCallback(
    ({item}) => <ItemAgency customStyle={{marginBottom: 20}} data={item} />,
    [],
  );

  return (
    <View flex-1 bg-primaryDark paddingT-74>
      <TabController items={items} initialIndex={0} asCarousel={false}>
        <View paddingH-25>
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
        </View>

        <View marginT-30 flex>
          <TabController.TabPage index={0}>
            <FlatList
              data={data}
              renderItem={renderItemFood}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContentStyle}
              ListEmptyComponent={ListEmptyComponent}
            />
          </TabController.TabPage>

          <TabController.TabPage index={1}>
            <FlatList
              data={data}
              renderItem={renderItemAgency}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContentStyle}
              ListEmptyComponent={ListEmptyComponent}
            />
          </TabController.TabPage>
        </View>
      </TabController>
    </View>
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
    flex: data.length === 0 ? 1 : undefined,
  },
});
