import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {
  Animated,
  FlatList,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import AgencyFeature from './AgencyFeature';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../../App';

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
];

export interface IItemAgencyLarger {
  data?: any;
  customStyle?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
}

const ItemAgency = ({data, customStyle}: IItemAgencyLarger) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const renderItemFeature = React.useCallback(
    (item, index) => <AgencyFeature key={index} itemFeature={item} />,
    [],
  );

  return (
    <View style={[styles.container, customStyle]}>
      <View center bg-white row style={styles.reviewWrap}>
        <Text style={styles.rate}>4.5</Text>
        <Image
          assetName="star"
          assetGroup="icons"
          width={9.89}
          height={9.45}
          marginR-3
        />
        <Text style={styles.count}>(25+)</Text>
      </View>
      <View style={styles.favorite}>
        <Image assetName="like" assetGroup="icons" />
      </View>
      <View marginB-11 style={styles.imagesWrap}>
        <Image assetName="avatar" assetGroup="images" style={styles.images} />
      </View>
      <Text
        white
        marginB-8
        style={styles.name}
        onPress={() => {
          navigation.navigate('AgencyDetails');
        }}>
        McDonald’s{' '}
        <Image assetName="verify" width={8} height={8} assetGroup="icons" />
      </Text>
      <View paddingH-11 marginB-8 row>
        <View row center marginR-8>
          <Image
            assetName="motorcycle"
            width={9.78}
            height={8.11}
            assetGroup="icons"
            marginR-4
          />
          <Text style={styles.metaText}>free delivery</Text>
        </View>
        <View row center>
          <Image
            assetName="clock"
            width={7.68}
            height={8.69}
            marginR-4
            assetGroup="icons"
          />
          <Text style={styles.metaText}>10-15 mins</Text>
        </View>
      </View>
      <View style={styles.agencyList} paddingH-11 row>
        {agencyFeature.map(renderItemFeature)}
      </View>
    </View>
  );
};

export default ItemAgency;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#393948',
    borderRadius: 15,
    paddingBottom: 11,
    overflow: 'hidden',
  },
  reviewWrap: {
    position: 'absolute',
    top: 10,
    left: 11,
    height: 28.7,
    borderRadius: 100,
    zIndex: 22,
    paddingLeft: 8,
    paddingRight: 5,
  },
  rate: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 11.69,
    marginRight: 4.21,
  },
  count: {
    fontFamily: 'SofiaPro',
    fontSize: 8.19,
    color: '#9796A1',
  },
  images: {
    width: '100%',
    height: '100%',
  },
  imagesWrap: {
    height: 136,
    borderRadius: 15,
    overflow: 'hidden',
  },
  name: {
    paddingHorizontal: 11,
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 15,
    lineHeight: 15,
  },
  metaText: {
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: '#ADADB8',
  },
  favorite: {
    position: 'absolute',
    right: 11,
    top: 10,
    zIndex: 22,
  },
  agencyList: {
    flexWrap: 'wrap',
  },
});
