import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

export interface IItemDelivery {
  data: any;
}

const ItemDeliveryAddress = ({data}: IItemDelivery) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <View paddingH-25>
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
          <View style={styles.imageWrap} marginR-20>
            <Image
              assetName="avatar"
              assetGroup="images"
              style={styles.image}
            />
          </View>

          <View>
            <Text white textSemiBold marginB-12 style={styles.name}>
              Home
            </Text>
            <Text textSemiBold gray2 style={styles.desc} marginB-9>
              542-154-5184
            </Text>
            <Text textSemiBold gray2 style={styles.desc}>
              4261 Kembery Drive, Chicago, LSAdddddddd
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DeliveryDetails');
          }}>
          <Image assetName="addressOption" assetGroup="icons" />
        </TouchableOpacity>
      </View>
    </View>
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
  },
  image: {
    width: '100%',
    height: '100%',
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
