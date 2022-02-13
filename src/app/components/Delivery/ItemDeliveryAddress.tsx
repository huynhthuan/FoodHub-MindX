import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {useAppSelector} from '../../hook';

export interface IItemDelivery {
  id: number;
}

const ItemDeliveryAddress = ({id}: IItemDelivery) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const entitieAddress = useAppSelector(
    state => state.deliveryAddressSlice.entities,
  );
  const address = entitieAddress[id];

  if (!address) return null;

  return (
    <TouchableOpacity
      paddingH-25
      onPress={() => {
        navigation.navigate('DeliveryDetails', {
          addressDetail: address,
        });
      }}>
      <View
        bg-dark
        style={styles.container}
        paddingT-17
        paddingL-18
        paddingB-21
        paddingR-32
        marginB-20
        row
        spread>
        <View row marginR-7>
          <View style={styles.imageWrap} center marginR-20>
            <Image
              assetName="addressShipping"
              assetGroup="icons"
              style={styles.image}
            />
          </View>

          <View>
            <Text white textSemiBold marginB-12 style={styles.name}>
              {address.name}
            </Text>
            <Text textSemiBold gray2 style={styles.desc} marginB-9>
              {address.phone}
            </Text>
            <Text textSemiBold gray2 style={styles.desc}>
              {`${address.address}, ${JSON.parse(address.wards).label}, ${
                JSON.parse(address.state).label
              }, ${JSON.parse(address.city).label}`}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DeliveryDetails', {
              addressDetail: address,
            });
          }}>
          <Image assetName="addressOption" assetGroup="icons" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ItemDeliveryAddress;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18.21,
  },
  imageWrap: {
    width: 65,
    height: 65,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: 45.19,
    height: 45.19,
  },
  name: {
    fontSize: 16,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
  desc: {
    fontSize: 13,
    lineHeight: 16.9,
    maxWidth: 178,
  },
});
