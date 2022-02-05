import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import AgencyFeature from '../../components/Item/Agency/AgencyFeature';
import ItemFood from '../../components/Item/Food/ItemFood';

const agencyFeature = [
  {
    name: 'Burger',
    id: '1',
  },
  {
    name: 'Chicken',
    id: '2',
  },
  {
    name: 'Fast Food',
    id: '3',
  },
  {
    name: 'Fast Food Hub',
    id: '4',
  },
  {
    name: 'Fast Food Hub',
    id: '5',
  },
];

const AgencyDetails = () => {
  const renderItemFeature = React.useCallback(
    (item, index) => <AgencyFeature key={index} itemFeature={item} />,
    [],
  );

  const renderItemFood = React.useCallback(
    ({item}) => (
      <ItemFood
        customStyle={{
          width: 266,
          marginRight: 15,
        }}
        data={item}
      />
    ),
    [],
  );

  const renderItemFood2 = React.useCallback(
    ({item}) => (
      <ItemFood
        customStyle={{
          width: 154,
          marginRight: 15,
        }}
        data={item}
      />
    ),
    [],
  );

  return (
    <ScrollView style={styles.container}>
      <View marginB-65>
        <View style={styles.imageWrap}>
          <Image
            assetName="avatar"
            assetGroup="images"
            style={styles.image}></Image>
        </View>
        <View center style={styles.agencyLogoWrap}>
          <Image
            assetGroup="images"
            assetName="avatar"
            style={styles.agencyImage}
          />
          <View center style={styles.agencyVerifyWrap}>
            <Image
              assetName="verify"
              width={15.16}
              height={15.16}
              assetGroup="icons"
            />
          </View>
        </View>
      </View>

      <Text center marginB-8 white style={styles.agencyTitle}>
        Pizza Hut
      </Text>
      <Text center marginB-16 gray2 style={styles.agencyAddress}>
        4102 Pretty View Lanenda
      </Text>
      <View center row marginB-16 style={styles.agencyFeature}>
        {agencyFeature.map(renderItemFeature)}
      </View>

      <View center paddingH-11 marginB-10 row>
        <View row center marginR-8>
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

      <View center marginB-32 row style={styles.reviewWrap}>
        <Image
          assetName="star"
          assetGroup="icons"
          width={17.78}
          height={17}
          marginR-8
        />
        <Text white style={styles.rate}>
          4.5
        </Text>

        <Text style={styles.count}>(25+)</Text>

        <Text primary underline marginL-7>
          See Review
        </Text>
      </View>

      <Text marginB-15 white style={styles.sectionTitle}>
        Featured items
      </Text>
      <FlatList
        renderItem={renderItemFood}
        data={agencyFeature}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        keyExtractor={item => item.id}
      />

      <Text marginB-15 white style={styles.sectionTitle}>
        Pizza
      </Text>
      <FlatList
        renderItem={renderItemFood2}
        data={agencyFeature}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={[styles.list]}
        keyExtractor={item => item.id}
      />
      <Text marginB-15 white style={styles.sectionTitle}>
        Donut
      </Text>
      <FlatList
        renderItem={renderItemFood2}
        data={agencyFeature}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={[styles.list, {marginBottom: 40}]}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

export default AgencyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
    paddingHorizontal: 25,
    paddingTop: 27,
  },
  reviewWrap: {
    alignItems: 'center',
  },
  rate: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 14,
    marginRight: 7,
  },
  count: {
    fontFamily: 'SofiaPro',
    fontSize: 14,
    color: '#9796A1',
  },
  sectionTitle: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 18,
    lineHeight: 18,
  },
  imageWrap: {
    height: 146,
    overflow: 'hidden',
    borderRadius: 14,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  metaText: {
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
    color: '#ADADB8',
  },
  agencyFeature: {
    flexWrap: 'wrap',
  },
  agencyLogoWrap: {
    width: 104,
    height: 104,
    borderRadius: 200,
    backgroundColor: '#2D2D3A',
    position: 'absolute',
    bottom: -104 / 2,
    left: (getScreenWidth() - 50) / 2,
    transform: [
      {
        translateX: -104 / 2,
      },
    ],
  },
  agencyImage: {
    width: 81.5,
    height: 81.5,
    borderRadius: 200,
    overflow: 'hidden',
  },
  agencyVerifyWrap: {
    position: 'absolute',
    width: 21.55,
    height: 21.55,
    borderRadius: 100,
    backgroundColor: '#2D2D3A',
    bottom: 16.19,
    right: 17.19,
  },
  agencyTitle: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 20,
    lineHeight: 20,
  },
  agencyAddress: {
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
  },
  list: {
    marginBottom: 30,
  },
});
