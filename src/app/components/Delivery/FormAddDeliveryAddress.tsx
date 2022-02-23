import {
  Button,
  Colors,
  Image,
  Incubator,
  Picker,
  PickerItemValue,
  Text,
  View,
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
import {HomeMenuStackParamList} from '../../navigation/HomeMenu';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {selectDeliveryAddressAddOne} from '../../redux/slices/addressSelectSlice';

const FormAddDeliveryAddress = () => {
  const provincesState = useAppSelector(state => state.provincesSlice);
  const userState = useAppSelector(state => state.userSlice);
  const deliveryAddressList = useAppSelector(
    state => state.deliveryAddressSlice,
  );
  const dispatch = useDispatch();

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
      name_address: '',
      address_primary: '',
      city: {label: 'Thành phố Hà Nội', value: '1'},
      state: {label: 'Quận Ba Đình', value: '1'},
      wards: {label: 'Phường Phúc Xá', value: '1'},
      phone: '',
      note: '',
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

    axios
      .post(
        BASE_URL_WP_API_USER + userState.id,
        {
          acf: {
            shipping_address: [
              ...oldAddress,
              {
                id: Date.now().toString(),
                name: data.name_address,
                address: data.address_primary,
                city: JSON.stringify(data.city),
                state: JSON.stringify(data.state),
                wards: JSON.stringify(data.wards),
                phone: data.phone,
                shipping_address_note: data.note,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + userState.token,
          },
        },
      )
      .then(res => {
        console.log();

        dispatch(
          deliveryAddressReceived({
            deliveryAddressList: res.data.acf.shipping_address,
          }),
        );
        dispatch(
          selectDeliveryAddressAddOne({
            address:
              res.data.acf.shipping_address[
                res.data.acf.shipping_address.length - 1
              ],
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
            msg: 'Thêm mới địa chỉ giao hàng thành công!',
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

        console.log(error);

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
            ? '\n' + 'Địa chỉ cụ thể: ' + data.address_primary.message
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
        .get('https://provinces.open-api.vn/api/p/' + getValues('city').value, {
          params: {
            depth: 2,
          },
        })
        .then(res => {
          dispatch(setDataState(res.data.districts));
          axios
            .get(
              'https://provinces.open-api.vn/api/d/' + getValues('state').value,
              {
                params: {
                  depth: 2,
                },
              },
            )
            .then(res => {
              dispatch(setDataWards(res.data.wards));
              setLoadingProvinces(false);
            });
        });
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
            message: 'Trường này không được để trống.',
          },
          minLength: {
            value: 2,
            message: 'Tên địa chỉ tối thiểu 2 kí tự.',
          },
          maxLength: {
            value: 32,
            message: 'Tên địa chỉ tối đa 32 kí tự.',
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
            placeholder={'Nhập tên địa chỉ của bạn'}
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
            message: 'Trường này không được để trống.',
          },
          pattern: {
            value: /(\+84|0[3|5|7|8|9])+([0-9]{9})\b/i,
            message: 'Số điện thoại của bạn chưa đúng định dạng.',
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
            placeholder={'Nhập số điện thoại của bạn'}
          />
        )}
        name="phone"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Trường này không được để trống.',
          },
          minLength: {
            value: 2,
            message: 'Địa chỉ cụ thể tối thiểu phải 2 kí tự.',
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
            placeholder={'Nhập địa chỉ cụ thể'}
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
                message: 'Trường này không được để trống.',
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
                  message: 'Trường này không được để trống.',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  value={value.value}
                  enableModalBlur={false}
                  onChange={(select: {label: string; value: string}) => {
                    setLoadingWards(true);
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
                  message: 'Trường này không được để trống.',
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
            Lưu
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default FormAddDeliveryAddress;

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
