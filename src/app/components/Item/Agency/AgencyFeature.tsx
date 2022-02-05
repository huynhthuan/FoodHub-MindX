import {Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface IItemAgencyFeature {
  itemFeature: any;
}

const AgencyFeature = ({itemFeature}: IItemAgencyFeature) => {
  return (
    <View marginR-8 marginB-8 style={styles.container}>
      <Text white style={styles.name}>
        {itemFeature.name}
      </Text>
    </View>
  );
};

export default AgencyFeature;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#474755',
    borderRadius: 5,
    paddingLeft: 6,
    paddingRight: 6,
    height: 22,
  },
  name: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'SofiaPro',
    textTransform: 'uppercase',
  },
});
