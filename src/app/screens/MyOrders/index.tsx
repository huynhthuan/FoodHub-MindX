import {TabController, TabControllerItemProps, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import ItemOrderHistory from '../../components/MyOrders/ItemOrderHistory';
import ItemOrderUpcoming from '../../components/MyOrders/ItemOrderUpcoming';

const items: TabControllerItemProps[] = [
  {
    label: 'Upcoming',
    style: {
      height: 47,
      borderBottomWidth: 0,
    },
    width: (getScreenWidth() - 50) / 2,
  },
  {
    label: 'History',
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

const MyOrders = () => {
  const renderItemOrderHistory = React.useCallback(
    ({item}) => <ItemOrderHistory data={item} />,
    [],
  );

  const renderItemOrderUpcoming = React.useCallback(
    ({item}) => <ItemOrderUpcoming data={item} />,
    [],
  );

  return (
    <View flex-1 bg-primaryDark paddingT-70>
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
              renderItem={renderItemOrderUpcoming}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingHorizontal: 25,
              }}
            />
          </TabController.TabPage>

          <TabController.TabPage index={1}>
            <FlatList
              data={data}
              renderItem={renderItemOrderHistory}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingHorizontal: 25,
              }}
            />
          </TabController.TabPage>
        </View>
      </TabController>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  tabBar: {
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 4,
    borderRadius: 23.5,
    borderColor: '#474755',
  },
});
