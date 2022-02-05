import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import AgencyFeature from './AgencyFeature';
import {getScreenWidth} from '../../../utilities/helpers';

const agencyFeature = [
  {
    name: 'Burger',
    id: '1',
  },
  {
    name: 'Chicken',
    id: '2',
  },
];

const ItemSearchAgency = ({data}: {data: any}) => {
  const renderItemFeature = React.useCallback(
    (item, index) => <AgencyFeature key={index} itemFeature={item} />,
    [],
  );

  return (
    <View marginR-19 style={styles.wrap} marginB-20>
      <View center marginB-28 style={styles.imageWrap}>
        <Image assetName="avatar" assetGroup="images" />
        <Text center style={styles.rate}>
          4.5
        </Text>
      </View>
      <Text marginB-8 style={styles.title}>
        Pizza Hut{' '}
        <Image assetName="verify" assetGroup="icons" width={8} height={8} />
      </Text>

      <View marginB-8 row style={styles.metaWrap}>
        <View row center marginR-8 marginB-8>
          <Image
            assetName="motorcycle"
            width={13.03}
            height={10.81}
            assetGroup="icons"
            marginR-4
          />
          <Text style={styles.metaText}>free delivery</Text>
        </View>
        <View row center>
          <Image
            assetName="clock"
            width={10.24}
            height={11.59}
            marginR-4
            assetGroup="icons"
          />
          <Text style={styles.metaText}>10-15 mins</Text>
        </View>
      </View>

      <View style={styles.agencyList} row>
        {agencyFeature.map(renderItemFeature)}
      </View>
    </View>
  );
};

export default ItemSearchAgency;

const styles = StyleSheet.create({
  metaText: {
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: '#ADADB8',
  },
  agencyList: {
    flexWrap: 'wrap',
  },
  wrap: {
    backgroundColor: '#393948',
    borderRadius: 14,
    paddingTop: 15,
    paddingHorizontal: 11,
    paddingBottom: 11,
    width: (getScreenWidth() - 50) / 2 - 10,
  },
  imageWrap: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 56.61,
    height: 56.61,
  },
  rate: {
    position: 'absolute',
    top: -4.39,
    right: -6.39,
    zIndex: 22,
    width: 18,
    height: 18,
    borderRadius: 5.58,
    backgroundColor: '#FFC529',
    color: '#fff',
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 9,
  },
  title: {
    color: '#fff',
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 15,
    lineHeight: 15,
  },
  metaWrap: {
    flexWrap: 'wrap',
  },
});
