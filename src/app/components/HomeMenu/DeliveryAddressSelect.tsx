import {Image, Picker, PickerItemValue, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const address = [
  {label: 'ABAP1222', value: 'ABAP1'},
  {label: 'ABAP2222', value: 'ABAP2'},
  {label: 'ABAP3222', value: 'ABAP3'},
];

const DeliveryAddressSelect = () => {
  const [addressDelivery, setAddressDelivery] = React.useState('');

  return (
    <Picker
      placeholder="Favorite Language"
      value={addressDelivery}
      enableModalBlur={false}
      onChange={(item: string) => setAddressDelivery(item)}
      topBarProps={{title: 'Chọn địa chỉ giao hàng'}}
      style={styles.boxAddress}
      showSearch
      searchPlaceholder={'Tìm địa chỉ giao hàng'}
      renderPicker={(value: PickerItemValue, label: string) => (
        <View center>
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
        </View>
      )}>
      {address.map(option => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
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
