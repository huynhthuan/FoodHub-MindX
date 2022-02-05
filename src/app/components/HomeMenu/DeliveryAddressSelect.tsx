import {Image, Picker, PickerItemValue, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const address = [
  {label: 'ABAP1', value: 'ABAP1'},
  {label: 'ABAP2', value: 'ABAP2'},
  {label: 'ABAP3', value: 'ABAP3'},
];

const DeliveryAddressSelect = () => {
  const [addressDelivery, setAddressDelivery] = React.useState('');

  return (
    <Picker
      placeholder="Favorite Language"
      value={addressDelivery}
      enableModalBlur={false}
      onChange={(item: string) => setAddressDelivery(item)}
      topBarProps={{title: 'Select Delivery Address'}}
      style={styles.boxAddress}
      showSearch
      searchPlaceholder={'Search your delivery address'}
      renderPicker={(value: PickerItemValue, label: string) => (
        <View center>
          <Text white style={styles.title}>
            Deliver to{' '}
            <Image
              assetName="arrowDownNormal"
              width={8.64}
              height={4.32}
              assetGroup="icons"
            />
          </Text>
          <Text primary style={styles.address}>
            {label ? label : 'Select Delivery Address'}
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
