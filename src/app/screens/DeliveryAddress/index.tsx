import {Button, Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import ItemDeliveryAddress from '../../components/Delivery/ItemDeliveryAddress';
import _ from 'lodash';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {BASE_URL_WP_API_USER} from '../../api/constants';
import {useAppDispatch, useAppSelector} from '../../hook';
import {deliveryAddressReceived} from '../../redux/slices/deliveryAddressSlice';
import {showToast} from '../../redux/slices/toastSlice';
import axios from 'axios';
import {setLoading} from '../../redux/slices/deliveryAddressLoadingSlice';

const DeliveryAddress = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const userState = useAppSelector(state => state.userSlice);
  const deliveryAddressList = useAppSelector(
    state => state.deliveryAddressSlice.ids,
  );

  const deliveryAddressLoadingState = useAppSelector(
    state => state.deliveryAddressLoadingSlice,
  );

  const renderDeliveryAddress = React.useCallback(
    ({item}) => <ItemDeliveryAddress id={item} />,
    [],
  );

  const dispatch = useAppDispatch();

  const getData = React.useCallback(async () => {
    dispatch(setLoading({isLoading: true}));
    axios
      .get(BASE_URL_WP_API_USER + userState.id, {
        headers: {
          Authorization: 'Bearer ' + userState.token,
        },
      })
      .then(res => {
        if (res.data.acf.shipping_address) {
          dispatch(
            deliveryAddressReceived({
              deliveryAddressList: res.data.acf.shipping_address,
            }),
          );
          dispatch(setLoading({isLoading: false}));
        } else {
          dispatch(
            deliveryAddressReceived({
              deliveryAddressList: [],
            }),
          );
          dispatch(setLoading({isLoading: false}));
        }
      })
      .catch(error => {
        dispatch(setLoading({isLoading: false}));
        dispatch(
          showToast({
            isShown: true,
            msg: `${error.data}`,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container} paddingT-70>
      <FlatList
        data={deliveryAddressList}
        renderItem={renderDeliveryAddress}
        keyExtractor={(item, index) => index.toString()}
        refreshing={deliveryAddressLoadingState.isLoading}
        onRefresh={() => {
          getData();
        }}
        contentContainerStyle={{paddingTop: 20}}
        ListEmptyComponent={
          deliveryAddressList.length === 0 ? (
            <View paddingH-25 center flex-1>
              <Text textSemiBold white marginB-12 marginT-50 center>
                Chưa có địa chỉ giao hàng
              </Text>
              <Text gray2 textRegular center marginB-20>
                Để việc đặt hàng thuận tiện hơn, bạn có thể thêm mới các địa chỉ
                giao hàng mới ở đây!!!
              </Text>
            </View>
          ) : (
            <ActivityIndicator></ActivityIndicator>
          )
        }
      />

      <View paddingH-25 paddingV-10 center>
        <Button
          bg-primary
          style={styles.btn}
          onPress={() => {
            navigation.navigate('AddDeliveryAddress');
          }}>
          <Text textSemiBold white style={styles.btnText}>
            Thêm mới địa chỉ
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D3A',
    flex: 1,
  },
  content: {
    paddingTop: 68,
    paddingBottom: 30,
  },
  btn: {
    height: 60,
    width: 248,
  },
  btnText: {
    textTransform: 'uppercase',
    fontSize: 15,
  },
});
