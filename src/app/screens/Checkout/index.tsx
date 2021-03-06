import {
  Button,
  Checkbox,
  ExpandableSection,
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
import {useAppDispatch, useAppSelector} from '../../hook';
import {setLoading} from '../../redux/slices/loadingSlice';
import axios from 'axios';
import {
  BASE_URL_WOOCOMMERCE,
  BASE_URL_WP_API_USER,
  WOO_KEY,
  WOO_SECRET,
} from '../../api/constants';
import {selectDeliveryAddressReceived} from '../../redux/slices/addressSelectSlice';
import {showToast} from '../../redux/slices/toastSlice';
import {setAddressChoseen} from '../../redux/slices/addressChoseenSlice';
import _ from 'lodash';
import {productCartReviced} from '../../redux/slices/productCartSlice';
import {updateCouponCart} from '../../redux/slices/couponCartSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {SideMenuStackList} from '../DashBoard';

const CheckOut = () => {
  const initDataPayment = {
    bacs: false,
    cheque: false,
    cod: false,
    vnpay: false,
  };
  const choseenAddress = useAppSelector(state => state.addressChoseenSlice);
  const [addressDelivery, setAddressDelivery] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState(initDataPayment);
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();
  const selectAddress = useAppSelector(
    state => state.selectDeliveryAddressSlice,
  );

  const productCartList = useAppSelector(state => state.productCartSlice);

  const entitieAddress = useAppSelector(
    state => state.selectDeliveryAddressSlice.entities,
  );
  const coupounCart = useAppSelector(state => state.couponCartSlice);

  const navigationSide = useNavigation<NavigationProp<SideMenuStackList>>();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

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
        setAddressDelivery(choseenAddress.id);
      })
      .catch(error => {
        console.log(error);

        dispatch(
          setLoading({
            isShown: false,
          }),
        );
        dispatch(
          showToast({
            isShown: true,
            msg: `???? c?? l???i x???y ra. Vui l??ng th??? l???i.`,
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, []);

  React.useEffect(() => {
    getDataAddress();
  }, []);

  const addOrder = React.useCallback(() => {
    console.log(choseenAddress.id);

    if (choseenAddress.id !== '0') {
      let method = '';
      _.forEach(paymentMethod, (value, key) => {
        if (value) {
          method = key;
        }
      });

      if (method) {
        dispatch(
          setLoading({
            isShown: true,
          }),
        );

        axios
          .post(
            BASE_URL_WOOCOMMERCE +
              'orders?consumer_key=' +
              WOO_KEY +
              '&consumer_secret=' +
              WOO_SECRET,
            {
              customer_id: userState.id,
              payment_method: method,
              billing: {
                first_name: userState.first_name,
                last_name: userState.last_name,
                address_1: `${entitieAddress[choseenAddress.id]?.address}, ${
                  JSON.parse(entitieAddress[choseenAddress.id]?.wards).label
                }, ${
                  JSON.parse(entitieAddress[choseenAddress.id]?.state).label
                }, ${
                  JSON.parse(entitieAddress[choseenAddress.id]?.city).label
                }`,
                city: JSON.parse(entitieAddress[choseenAddress.id]?.city).label,
                state: JSON.parse(entitieAddress[choseenAddress.id]?.state)
                  .label,
                country: 'Vietnam',
                email: userState.user_email,
                phone: userState.phone
                  ? userState.phone
                  : entitieAddress[choseenAddress.id]?.phone,
                postcode: '100000',
              },
              shipping: {
                first_name: userState.first_name,
                last_name: userState.last_name,
                address_1: `${entitieAddress[choseenAddress.id]?.address}, ${
                  JSON.parse(entitieAddress[choseenAddress.id]?.wards).label
                }, ${
                  JSON.parse(entitieAddress[choseenAddress.id]?.state).label
                }, ${
                  JSON.parse(entitieAddress[choseenAddress.id]?.city).label
                }`,
                city: JSON.parse(entitieAddress[choseenAddress.id]?.city).label,
                state: JSON.parse(entitieAddress[choseenAddress.id]?.state)
                  .label,
                postcode: '100000',
                country: 'Vietnam',
              },
              line_items: _.map(productCartList.entities, item => {
                return {
                  product_id: item?.product_id,
                  quantity: item?.quantity,
                };
              }),
              shipping_lines: [
                {
                  method_id: 'flat_rate',
                  method_title: 'Flat Rate',
                  total: '20000',
                },
              ],
              coupon_lines: coupounCart.code
                ? [
                    {
                      code: coupounCart.code,
                    },
                  ]
                : [],
            },
          )
          .then(res => {
            console.log('Res', res);

            axios
              .post(
                BASE_URL_WOOCOMMERCE +
                  'orders/' +
                  res.data.id +
                  '/notes?consumer_key=' +
                  WOO_KEY +
                  '&consumer_secret=' +
                  WOO_SECRET,
                {
                  note: entitieAddress[choseenAddress.id]
                    ?.shipping_address_note,
                },
              )
              .then(res => {
                dispatch(
                  setLoading({
                    isShown: false,
                  }),
                );
                dispatch(
                  showToast({
                    isShown: true,
                    msg: 'T???o ????n h??ng th??nh c??ng. Vui l??ng ?????i ch??ng t??i li??n l???c!',
                    preset: Incubator.ToastPresets.SUCCESS,
                  }),
                );
                dispatch(
                  productCartReviced({
                    productList: JSON.stringify([]),
                  }),
                );
                dispatch(
                  updateCouponCart({
                    code: '',
                    desc: '',
                    amount: 0,
                  }),
                );
                navigationSide.navigate('MyOrders');
              })
              .catch((error: any) => {
                dispatch(
                  setLoading({
                    isShown: false,
                  }),
                );
                console.log(error);
                dispatch(
                  showToast({
                    isShown: true,
                    msg: 'T???o ????n h??ng th??nh c??ng. Vui l??ng ?????i ch??ng t??i li??n l???c!',
                    preset: Incubator.ToastPresets.SUCCESS,
                  }),
                );
                dispatch(
                  productCartReviced({
                    productList: JSON.stringify([]),
                  }),
                );
                dispatch(
                  updateCouponCart({
                    code: '',
                    desc: '',
                    amount: 0,
                  }),
                );
                navigationSide.navigate('MyOrders');
              });
          })
          .catch(error => {
            dispatch(
              setLoading({
                isShown: false,
              }),
            );
            console.log('err order', error.response.data);
            dispatch(
              showToast({
                isShown: true,
                msg: '???? c?? l???i x???y x???y ra. Vui l??ng th??? l???i!',
                preset: Incubator.ToastPresets.FAILURE,
              }),
            );
          });
      } else {
        dispatch(
          showToast({
            isShown: true,
            msg: 'B???n ph???i ch???n m???t ph????ng th???c thanh to??n',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      }
    } else {
      dispatch(
        showToast({
          isShown: true,
          msg: 'Ch??a ch???n ?????a ch??? giao h??ng. H??y ch???n ?????a ho???c th??m m???i ?????a ch??? r???i thanh to??n.',
          preset: Incubator.ToastPresets.OFFLINE,
        }),
      );
    }
  }, [choseenAddress.id, paymentMethod]);

  return (
    <View flex-1 bg-primaryDark paddingT-74 paddingH-25>
      <View marginB-32>
        <View row spread centerV marginB-18>
          <Text white textBold style={styles.title}>
            Giao h??ng t???i
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddDeliveryAddress');
            }}>
            <Text white textBold primary>
              Th??m m???i ?????a ch???
            </Text>
          </TouchableOpacity>
        </View>
        <View row>
          <View style={styles.map} marginR-27 center>
            <Image assetName="addressShipping" assetGroup="icons" />
          </View>
          <View flex-1>
            <Picker
              placeholder="Favorite Language"
              value={addressDelivery}
              enableModalBlur={false}
              onChange={(item: any) => {
                setAddressDelivery(item);
                console.log(item);

                dispatch(
                  setAddressChoseen({
                    id: item.value,
                  }),
                );
              }}
              topBarProps={{title: 'Ch???n ?????a ch??? giao h??ng'}}
              showSearch
              searchPlaceholder={'T??m ?????a ch??? giao h??ng'}
              renderPicker={(value: PickerItemValue, label: string) => (
                <TouchableOpacity>
                  <View spread row centerV>
                    <Text white textBold style={styles.name}>
                      {label ? label : 'Ch???n ?????a ch???'}
                    </Text>
                  </View>
                  <Text gray2 textMedium style={styles.address}>
                    {label
                      ? `${entitieAddress[choseenAddress.id]?.address}, ${
                          JSON.parse(entitieAddress[choseenAddress.id]?.wards)
                            .label
                        }, ${
                          JSON.parse(entitieAddress[choseenAddress.id]?.state)
                            .label
                        }, ${
                          JSON.parse(entitieAddress[choseenAddress.id]?.city)
                            .label
                        }`
                      : 'Ch???n ?????a ch??? giao h??ng ????? th???c hi???n thanh to??n'}
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
          </View>
        </View>
      </View>
      <View marginB-32>
        <Text white textBold marginB-18 style={styles.title}>
          Ph????ng th???c thanh to??n
        </Text>
        <View>
          {/* <View marginB-10>
            <Checkbox
              value={paymentMethod.vnpay}
              labelStyle={styles.label}
              label={'Thanh to??n qua VNPay'}
              onValueChange={() => {
                setPaymentMethod({
                  ...initDataPayment,
                  vnpay: !paymentMethod.vnpay,
                });
              }}
            />
            <ExpandableSection top={false} expanded={paymentMethod.vnpay}>
              <View paddingL-38>
                <Text white>Thanh to??n ????n h??ng b???ng VnPay ti???n l???i.</Text>
              </View>
            </ExpandableSection>
          </View> */}
          <View marginB-10>
            <Checkbox
              labelStyle={styles.label}
              value={paymentMethod.bacs}
              label={'Chuy???n kho???n ng??n h??ng'}
              onValueChange={() => {
                setPaymentMethod({
                  ...initDataPayment,
                  bacs: !paymentMethod.bacs,
                });
              }}
            />
            <ExpandableSection top={false} expanded={paymentMethod.bacs}>
              <View paddingL-38>
                <Text white marginB-10>
                  Th???c hi???n thanh to??n v??o ngay t??i kho???n ng??n h??ng c???a ch??ng
                  t??i. Vui l??ng s??? d???ng M?? ????n h??ng c???a b???n trong ph???n N???i dung
                  thanh to??n. ????n h??ng s??? ??????c giao sau khi ti???n ???? chuy???n.
                </Text>
                <View row spread>
                  <Text white>Ng??n H??ng:</Text>
                  <Text textBold primary>
                    ABCDEF Bank
                  </Text>
                </View>
                <View row spread>
                  <Text white>S??? t??i kho???n:</Text>
                  <Text textBold primary>
                    253125621595
                  </Text>
                </View>
                <View row spread>
                  <Text white>Ch??? kho???n:</Text>
                  <Text textBold primary>
                    Nguy???n V??n ABC
                  </Text>
                </View>
              </View>
            </ExpandableSection>
          </View>
          <View marginB-10>
            <Checkbox
              labelStyle={styles.label}
              value={paymentMethod.cod}
              label={'Ti???n m???t'}
              onValueChange={() => {
                setPaymentMethod({
                  ...initDataPayment,
                  cod: !paymentMethod.cod,
                });
              }}
            />
            <ExpandableSection top={false} expanded={paymentMethod.cod}>
              <View paddingL-38>
                <Text white marginB-10>
                  Tr??? ti???n m???t khi giao h??ng
                </Text>
              </View>
            </ExpandableSection>
          </View>
          <View marginB-10>
            <Checkbox
              labelStyle={styles.label}
              value={paymentMethod.cheque}
              label={'Ki???m tra thanh to??n'}
              onValueChange={() => {
                setPaymentMethod({
                  ...initDataPayment,
                  cheque: !paymentMethod.cheque,
                });
              }}
            />
            <ExpandableSection top={false} expanded={paymentMethod.cheque}>
              <View paddingL-38>
                <Text white marginB-10>
                  Vui l??ng g???i chi phi???u c???a b???n ?????n T??n c???a h??ng, ???????ng c???a c???a
                  h??ng, Th??? tr???n c???a c???a h??ng, Bang / H???t c???a c???a h??ng, M?? b??u
                  ??i???n c???a h??ng.
                </Text>
              </View>
            </ExpandableSection>
          </View>
        </View>
      </View>

      <View flex-1 bottom paddingB-30>
        <Button
          bg-primary
          onPress={() => {
            addOrder();
          }}>
          <Text white textBold style={styles.addCartText}>
            X??c nh???n ????n h??ng
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontFamily: 'SofiaPro-Medium',
    color: '#FE724C',
  },
  map: {
    width: 88,
    height: 88,
    borderRadius: 10,
    backgroundColor: '#393948',
  },
  name: {
    fontSize: 18,
  },
  address: {
    fontSize: 15,
  },
  addCartText: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
