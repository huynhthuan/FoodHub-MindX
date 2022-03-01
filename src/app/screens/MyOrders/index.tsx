import {
  Incubator,
  TabController,
  TabControllerItemProps,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import ItemOrderHistory from '../../components/MyOrders/ItemOrderHistory';
import ItemOrderUpcoming from '../../components/MyOrders/ItemOrderUpcoming';
import ListEmptyComponent from '../../components/MyOrders/ListEmptyComponent';
import {useAppDispatch, useAppSelector} from '../../hook';
import {ordersAddMany, ordersReceived} from '../../redux/slices/orderSlice';
import {showToast} from '../../redux/slices/toastSlice';
import {
  ordersCompletedAddMany,
  ordersCompletedReceived,
} from '../../redux/slices/orderCompletedSlice';
import ListEmptyComponentCompleted from '../../components/MyOrders/ListEmptyComponentCompleted';
import _ from 'lodash';
import {setOrderCompletedLoading} from '../../redux/slices/orderCompletedLoading';
import {setOrderUpcommingLoading} from '../../redux/slices/orderUpcommingLoading';
import axios from 'axios';
import {BASE_URL_WOOCOMMERCE, WOO_KEY, WOO_SECRET} from '../../api/constants';

const items: TabControllerItemProps[] = [
  {
    label: 'Đơn đang xử lý',
    style: {
      height: 47,
      borderBottomWidth: 0,
    },
    width: (getScreenWidth() - 50) / 2,
  },
  {
    label: 'Đơn hoàn thành',
    style: {
      height: 47,
    },
    width: (getScreenWidth() - 50) / 2,
  },
];

const MyOrders = () => {
  const userState = useAppSelector(state => state.userSlice);

  const loadingUpcommingOrder = useAppSelector(
    state => state.orderUpcommingLoading,
  );
  const loadingOrderCompleted = useAppSelector(
    state => state.orderCompletedLoading,
  );

  const [indexTab, setIndexTab] = React.useState(0);
  const [pageUpcomming, setPageUpcomming] = React.useState(1);
  const [pageOncompleted, setPageOncompleted] = React.useState(1);

  const dispatch = useAppDispatch();
  const orderUpcommingList = useAppSelector(state => state.orderSlice);
  const orderCompletedList = useAppSelector(state => state.orderCompletedSlice);

  const renderItemOrderUpcoming = React.useCallback(
    ({item}) => (
      <ItemOrderUpcoming getOrdersUpcomming={getOrdersUpcomming} id={item} />
    ),
    [],
  );

  const renderItemOrderHistory = React.useCallback(
    ({item}) => <ItemOrderHistory id={item} />,
    [],
  );

  const getOrdersUpcomming = React.useCallback(() => {
    setPageUpcomming(1);
    dispatch(
      setOrderUpcommingLoading({
        isLoading: true,
      }),
    );

    axios
      .get(BASE_URL_WOOCOMMERCE + 'orders', {
        params: {
          customer: userState.id,
          status: ['on-hold', 'arrival-shipment', 'pending'],
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        dispatch(
          ordersReceived({
            orderList: JSON.stringify(res.data),
          }),
        );
        dispatch(
          setOrderUpcommingLoading({
            isLoading: false,
          }),
        );
      })
      .catch((error: any) => {
        dispatch(
          ordersReceived({
            orderList: JSON.stringify([]),
          }),
        );
        dispatch(
          setOrderUpcommingLoading({
            isLoading: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại!',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, []);

  const orderUpcommingLoadmore = () => {
    dispatch(
      setOrderUpcommingLoading({
        isLoading: true,
      }),
    );
    axios
      .get(BASE_URL_WOOCOMMERCE + 'orders', {
        params: {
          customer: userState.id,
          page: pageUpcomming,
          status: ['on-hold', 'arrival-shipment', 'pending'],
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        dispatch(
          ordersAddMany({
            orderList: JSON.stringify(res.data),
          }),
        );
        dispatch(
          setOrderUpcommingLoading({
            isLoading: false,
          }),
        );
      })
      .catch((error: any) => {
        dispatch(
          setOrderUpcommingLoading({
            isLoading: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại!',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  };

  const getOrdersCompleted = React.useCallback(() => {
    setPageOncompleted(1);
    dispatch(
      setOrderCompletedLoading({
        isLoading: true,
      }),
    );
    axios
      .get(BASE_URL_WOOCOMMERCE + 'orders', {
        params: {
          customer: userState.id,
          page: pageOncompleted,
          status: ['completed', 'cancelled'],
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        console.log(res.data);
        
        dispatch(
          ordersCompletedReceived({
            orderList: JSON.stringify(res.data),
          }),
        );

        dispatch(
          setOrderCompletedLoading({
            isLoading: false,
          }),
        );
      })
      .catch((error: any) => {
        console.log(error);
        
        dispatch(
          ordersCompletedReceived({
            orderList: JSON.stringify([]),
          }),
        );
        dispatch(
          setOrderCompletedLoading({
            isLoading: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại!',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, []);

  const ordersCompletedLoadmore = () => {
    dispatch(
      setOrderCompletedLoading({
        isLoading: true,
      }),
    );
    axios
      .get(BASE_URL_WOOCOMMERCE + 'orders', {
        params: {
          customer: userState.id,
          page: pageOncompleted,
          status: ['completed', 'cancelled'],
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        dispatch(
          ordersCompletedAddMany({
            orderList: JSON.stringify(res.data),
          }),
        );
        dispatch(
          setOrderCompletedLoading({
            isLoading: false,
          }),
        );
      })
      .catch((error: any) => {
        dispatch(
          setOrderCompletedLoading({
            isLoading: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại!',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  };

  React.useEffect(() => {
    if (indexTab === 0) {
      getOrdersUpcomming();
    } else {
      getOrdersCompleted();
    }
  }, [indexTab]);

  React.useEffect(() => {
    if (pageUpcomming > 1) {
      orderUpcommingLoadmore();
    }
  }, [pageUpcomming]);

  React.useEffect(() => {
    if (pageOncompleted > 1) {
      ordersCompletedLoadmore();
    }
  }, [pageOncompleted]);

  return (
    <View flex-1 bg-primaryDark paddingT-70>
      <TabController
        items={items}
        initialIndex={0}
        asCarousel={false}
        onChangeIndex={index => {
          setIndexTab(index);
        }}>
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
              data={orderUpcommingList.ids}
              renderItem={renderItemOrderUpcoming}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContentStyle}
              refreshing={loadingUpcommingOrder.isLoading}
              onRefresh={() => {
                getOrdersUpcomming();
              }}
              ListEmptyComponent={ListEmptyComponent}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                setPageUpcomming(pageUpcomming + 1);
              }}
            />
          </TabController.TabPage>

          <TabController.TabPage index={1}>
            <FlatList
              data={orderCompletedList.ids}
              renderItem={renderItemOrderHistory}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContentStyle}
              refreshing={loadingOrderCompleted.isLoading}
              onRefresh={() => {
                getOrdersCompleted();
              }}
              ListEmptyComponent={ListEmptyComponentCompleted}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                setPageOncompleted(pageOncompleted + 1);
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
  listContentStyle: {
    paddingHorizontal: 25,
  },
});
