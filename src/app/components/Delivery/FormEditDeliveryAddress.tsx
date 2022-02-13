import {
  Button,
  Colors,
  Image,
  Incubator,
  Picker,
  PickerItemValue,
  Text,
  View,
  TouchableOpacity,
} from 'react-native-ui-lib';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {
  deliveryAddressData,
  deliveryAddressReceived,
} from '../../redux/slices/deliveryAddressSlice';
import _ from 'lodash';
import axios from 'axios';
import {useAppSelector} from '../../hook';
import {useDispatch} from 'react-redux';
import {
  cityData,
  setDataCity,
  setDataState,
  setDataWards,
  stateData,
  wardsData,
} from '../../redux/slices/provincesSlice';
import {showToast} from '../../redux/slices/toastSlice';
import {BASE_URL_WP_API_USER} from '../../api/constants';
import {setLoading} from '../../redux/slices/loadingSlice';
import {logout} from '../../redux/slices/userSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {HomeMenuStackParamList} from '../../navigation/HomeMenu';

const FormEditDeliveryAddress = ({
  data = {
    id: '',
    name: '',
    address: '',
    city: JSON.stringify({label: 'Thành phố Hà Nội', value: '1'}),
    state: JSON.stringify({label: 'Quận Ba Đình', value: '1'}),
    wards: JSON.stringify({label: 'Phường Phúc Xá', value: '1'}),
    phone: '',
    shipping_address_note: '',
  },
}: {
  data: deliveryAddressData;
}) => {
  const provincesState = useAppSelector(state => state.provincesSlice);
  const deliveryAddressList = useAppSelector(
    state => state.deliveryAddressSlice,
  );
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useDispatch();

  const cityValue = JSON.parse(data.city);
  const stateValue = JSON.parse(data.state);
  const wardsValue = JSON.parse(data.wards);

  const [loadingProvinces, setLoadingProvinces] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [loadingWards, setLoadingWards] = React.useState(false);

  const navigation =
    useNavigation<BottomTabNavigationProp<HomeMenuStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      id: data.id,
      name_address: data.name,
      address_primary: data.address,
      city: cityValue,
      state: stateValue,
      wards: wardsValue,
      phone: data.phone,
      note: data.shipping_address_note,
    },
  });

  const onSubmit = (data: any) => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );

    const oldAddress = _.map(
      deliveryAddressList.ids,
      id => deliveryAddressList.entities[id],
    );

    _.map(oldAddress, addressItem => {
      if (addressItem?.id === getValues('id')) {
        addressItem.name = data.name_address;
        addressItem.address = data.address_primary;
        addressItem.city = JSON.stringify(data.city);
        addressItem.state = JSON.stringify(data.state);
        addressItem.wards = JSON.stringify(data.wards);
        addressItem.phone = data.phone;
        addressItem.shipping_address_note = data.note;
      }
    });

    axios
      .post(
        BASE_URL_WP_API_USER + userState.id,
        {
          acf: {
            shipping_address: [...oldAddress],
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + userState.token,
          },
        },
      )
      .then(res => {
        dispatch(
          deliveryAddressReceived({
            deliveryAddressList: res.data.acf.shipping_address,
          }),
        );
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: 'Sửa địa chỉ giao hàng thành công!',
            preset: Incubator.ToastPresets.SUCCESS,
          }),
        );
      })
      .catch(error => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        if (error.response?.data?.data.status === 403) {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Phiên đăng nhập của bạn đã hết hạn. Vui Lòng đăng nhập lại!',
              preset: Incubator.ToastPresets.OFFLINE,
            }),
          );
          dispatch(logout());
          return;
        }

        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra. Vui lòng thử lại !',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  };

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        isShown: true,
        msg: `${
          data.name_address ? 'Tên địa chỉ: ' + data.name_address.message : ''
        }${
          data.address_primary
            ? 'Địa chỉ cụ thể: ' + data.address_primary.message
            : ''
        }${data.city ? '\n' + 'Thành phố: ' + data.city.message : ''}${
          data.state ? '\n' + 'Quận/Huyện: ' + data.state.message : ''
        }${data.wards ? '\n' + 'Phường/Xã: ' + data.wards.message : ''}${
          data.phone ? '\n' + 'Số điện thoại: ' + data.phone.message : ''
        }${data.note ? '\n' + 'Ghi chú: ' + data.note.message : ''}`,
        preset: Incubator.ToastPresets.FAILURE,
      }),
    );
  };

  const getDataProvinces = React.useCallback(() => {
    setLoadingProvinces(true);
    axios.get('https://provinces.open-api.vn/api/').then(res => {
      dispatch(setDataCity(res.data));
      axios
        .get('https://provinces.open-api.vn/api/p/' + cityValue.value, {
          params: {
            depth: 2,
          },
        })
        .then(res => {
          dispatch(setDataState(res.data.districts));
          axios
            .get('https://provinces.open-api.vn/api/d/' + stateValue.value, {
              params: {
                depth: 2,
              },
            })
            .then(res => {
              dispatch(setDataWards(res.data.wards));
              setLoadingProvinces(false);
            });
        });
    });
  }, []);

  const deleteAddress = React.useCallback(() => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );

    const oldAddress = _.map(
      deliveryAddressList.ids,
      id => deliveryAddressList.entities[id],
    );

    let newAddressList = _.filter(
      oldAddress,
      addressData => addressData?.id !== getValues('id'),
    );

    axios
      .post(
        BASE_URL_WP_API_USER + userState.id,
        {
          acf: {
            shipping_address: [...newAddressList],
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + userState.token,
          },
        },
      )
      .then(res => {
        dispatch(
          deliveryAddressReceived({
            deliveryAddressList: res.data.acf.shipping_address,
          }),
        );
        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: 'Xóa địa chỉ giao hàng thành công!',
            preset: Incubator.ToastPresets.SUCCESS,
          }),
        );

        navigation.navigate('DeliveryAddress');
      })
      .catch(error => {
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        if (error.response?.data?.data.status === 403) {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Phiên đăng nhập của bạn đã hết hạn. Vui Lòng đăng nhập lại!',
              preset: Incubator.ToastPresets.OFFLINE,
            }),
          );
          dispatch(logout());
          return;
        }

        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra. Vui lòng thử lại !',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, []);

  React.useEffect(() => {
    getDataProvinces();
  }, []);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
          minLength: {
            value: 2,
            message: 'Your name must have at least 2 characters.',
          },
          maxLength: {
            value: 32,
            message: 'Your name must have a maximum of 32 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Incubator.TextField
            floatOnFocus={true}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label={'Tên địa chỉ'}
            labelStyle={styles.label}
            placeholder={'Enter your name address'}
            placeholderTextColor={'#ADADB8'}
          />
        )}
        name="name_address"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
          pattern: {
            value: /(\+84|0[3|5|7|8|9])+([0-9]{9})\b/i,
            message: 'Your phone incorrect format.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Incubator.TextField
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'#ADADB8'}
            keyboardType="phone-pad"
            label="Số điện thoại"
            labelStyle={styles.label}
            placeholder={'Enter your mobile number'}
          />
        )}
        name="phone"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
          minLength: {
            value: 2,
            message: 'Your street must have at least 2 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Incubator.TextField
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'#ADADB8'}
            label="Địa chỉ cụ thể (bao gồm số nhà, ngõ, hẻm)"
            labelStyle={styles.label}
            placeholder={'Enter your street'}
          />
        )}
        name="address_primary"
      />

      {!loadingProvinces ? (
        <>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This field is required.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Picker
                value={value.value}
                enableModalBlur={false}
                onChange={(select: {label: string; value: string}) => {
                  setLoadingState(true);
                  setLoadingWards(true);
                  onChange(select);
                  axios
                    .get(
                      'https://provinces.open-api.vn/api/p/' + select.value,
                      {
                        params: {
                          depth: 2,
                        },
                      },
                    )
                    .then(res => {
                      dispatch(setDataState(res.data.districts));
                      setLoadingState(false);
                    });
                }}
                topBarProps={{title: 'Chọn thành phố'}}
                showSearch
                searchPlaceholder={'Tìm thành phố của bạn'}
                renderPicker={(value: PickerItemValue, label: string) => (
                  <View>
                    <Incubator.TextField
                      style={styles.input}
                      value={label}
                      placeholderTextColor={'#ADADB8'}
                      label="Thành phố"
                      labelStyle={styles.label}
                      placeholder={'Tìm thành phố'}
                    />
                    <Image
                      assetName="arrowRightNormal"
                      assetGroup="icons"
                      style={styles.arrow}
                    />
                  </View>
                )}>
                {provincesState.city.map((city: cityData, index: number) => (
                  <Picker.Item
                    key={city.code}
                    label={city.name}
                    value={city.code.toString()}
                  />
                ))}
              </Picker>
            )}
            name="city"
          />

          {!loadingState ? (
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required.',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  value={value.value}
                  enableModalBlur={false}
                  onChange={(select: {label: string; value: string}) => {
                    onChange(select);
                    axios
                      .get(
                        'https://provinces.open-api.vn/api/d/' + select.value,
                        {
                          params: {
                            depth: 2,
                          },
                        },
                      )
                      .then(res => {
                        dispatch(setDataWards(res.data.wards));
                        setLoadingWards(false);
                      });
                  }}
                  topBarProps={{title: 'Chọn quận/huyện'}}
                  showSearch
                  searchPlaceholder={'Tìm quận/huyện của bạn'}
                  renderPicker={(value: PickerItemValue, label: string) => (
                    <View>
                      <Incubator.TextField
                        style={styles.input}
                        value={label}
                        placeholderTextColor={'#ADADB8'}
                        label="Quận/Huyện"
                        labelStyle={styles.label}
                        placeholder={'Chọn quận/huyện'}
                      />
                      <Image
                        assetName="arrowRightNormal"
                        assetGroup="icons"
                        style={styles.arrow}
                      />
                    </View>
                  )}>
                  {provincesState.states.map(
                    (state: stateData, index: number) => (
                      <Picker.Item
                        key={state.code}
                        label={state.name}
                        value={state.code.toString()}
                      />
                    ),
                  )}
                </Picker>
              )}
              name="state"
            />
          ) : (
            <></>
          )}

          {!loadingWards ? (
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required.',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  value={value.value}
                  enableModalBlur={false}
                  onChange={onChange}
                  topBarProps={{title: 'Chọn xã/phường'}}
                  showSearch
                  searchPlaceholder={'Tìm xã/phường của bạn'}
                  renderPicker={(value: PickerItemValue, label: string) => (
                    <View>
                      <Incubator.TextField
                        style={styles.input}
                        value={label}
                        placeholderTextColor={'#ADADB8'}
                        label="Xã/Phường"
                        labelStyle={styles.label}
                        placeholder={'Chọn xã/phường'}
                      />
                      <Image
                        assetName="arrowRightNormal"
                        assetGroup="icons"
                        style={styles.arrow}
                      />
                    </View>
                  )}>
                  {provincesState.wards.map(
                    (wards: wardsData, index: number) => (
                      <Picker.Item
                        key={wards.code}
                        label={wards.name}
                        value={wards.code.toString()}
                      />
                    ),
                  )}
                </Picker>
              )}
              name="wards"
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <View marginT-10 marginB-10>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: {
            value: 150,
            message: 'Ghi chú tối đã 150 kí tự.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Incubator.TextField
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'#ADADB8'}
            label="Ghi chú"
            labelStyle={styles.label}
            placeholder={
              'Nhập ghi chú của bạn (VD: rẽ trái, rồi rẽ phải, ... )'
            }
            marginB-20
            spellCheck={false}
            textAlignVertical={'top'}
            multiline={true}
            containerStyle={{
              minHeight: 200,
              backgroundColor: Colors.dark,
              borderRadius: 18.21,
              paddingHorizontal: 22,
              paddingVertical: 24,
            }}
            style={{
              color: '#fff',
              fontFamily: 'SofiaPro',
              fontSize: 16,
              lineHeight: 16,
            }}
          />
        )}
        name="note"
      />

      <View center paddingH-25>
        <Button
          bg-primary
          style={styles.btn}
          onPress={handleSubmit(onSubmit, onInvalid)}>
          <Text white textSemiBold style={styles.btnText}>
            Save
          </Text>
        </Button>

        <TouchableOpacity
          onPress={() => {
            deleteAddress();
          }}>
          <Text primary center textBold marginT-10>
            Xóa địa chỉ này
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormEditDeliveryAddress;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 65,
    lineHeight: 17,
    backgroundColor: '#393948',
    borderRadius: 14,
    marginBottom: 29,
    paddingHorizontal: 20,
    fontSize: 17,
    color: '#ffffff',
  },
  btn: {
    height: 60,
    width: 248,
  },
  btnText: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
    color: '#ADADB8',
    marginBottom: 12,
  },
  arrow: {
    position: 'absolute',
    right: 27,
    bottom: 55,
  },
  textArea: {
    height: 200,
  },
});
