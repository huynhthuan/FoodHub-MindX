import {
  Image,
  Incubator,
  Picker,
  PickerItemValue,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/slices/loadingSlice';
import axios from 'axios';
import {BASE_URL_WP_API_USER} from '../../api/constants';
import {useAppDispatch, useAppSelector} from '../../hook';
import {showToast} from '../../redux/slices/toastSlice';
import {selectDeliveryAddressReceived} from '../../redux/slices/addressSelectSlice';
import {setAddressChoseen} from '../../redux/slices/addressChoseenSlice';

const DeliveryAddressSelect = () => {
  const [addressDelivery, setAddressDelivery] = React.useState('');
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();
  const selectAddress = useAppSelector(
    state => state.selectDeliveryAddressSlice,
  );

  const entitieAddress = useAppSelector(
    state => state.selectDeliveryAddressSlice.entities,
  );

  const getDataAddress = React.useCallback(async () => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );
    axios
      .get(BASE_URL_WP_API_USER + userState.id, {
        headers: {
          Authorization: 'Bearer ' + userState.token,
        },
      })
      .then(res => {
        if (res.data.acf.shipping_address !== null) {
          dispatch(
            selectDeliveryAddressReceived({
              deliveryAddressList: res.data.acf.shipping_address,
            }),
          );
        }
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
      })
      .catch(error => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
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
    getDataAddress();
  }, []);

  return (
    <Picker
      placeholder="Favorite Language"
      value={addressDelivery}
      enableModalBlur={false}
      onChange={(item: any) => {
        console.log(item);
        setAddressDelivery(item);
        dispatch(
          setAddressChoseen({
            id: item.value,
          }),
        );
      }}
      topBarProps={{title: 'Chọn địa chỉ giao hàng'}}
      style={styles.boxAddress}
      showSearch
      searchPlaceholder={'Tìm địa chỉ giao hàng'}
      renderPicker={(value: PickerItemValue, label: string) => (
        <TouchableOpacity center>
          <Text white style={styles.title}>
            Giao tới{' '}
            <Image
              assetName="arrowDownNormal"
              width={8.64}
              height={4.32}
              assetGroup="icons"
            />
          </Text>
          <Text primary style={styles.address}>
            {label ? label : 'Chọn địa chỉ'}
          </Text>
        </TouchableOpacity>
      )}>
      {selectAddress.ids.map((option, index) => (
        <Picker.Item
          key={index}
          label={entitieAddress[option]?.name}
          value={option}
        />
      ))}
    </Picker>
  );
};

export default DeliveryAddressSelect;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 16,
    lineHeight: 19.57,
  },
  address: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 16,
    lineHeight: 19.57,
  },
  boxAddress: {
    color: '#fff',
    backgroundColor: 'black',
    margin: 0,
  },
});
