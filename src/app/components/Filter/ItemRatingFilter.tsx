import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface IRating {
  label: string;
}

const ItemRatingFilter = ({label}: IRating) => {
  const [isSelect, setIsSelect] = React.useState(false);

  return (
    <TouchableOpacity
      centerV
      row
      marginR-10
      marginB-16
      paddingR-16
      paddingL-16
      paddingV-4
      style={isSelect ? [styles.wrap, styles.active] : styles.wrap}
      onPress={() => {
        setIsSelect(!isSelect);
      }}>
      <View row>
        <Text marginR-4 textMedium white style={styles.text}>
          {label}
        </Text>
        <Image
          assetName="star"
          assetGroup="icons"
          tintColor={isSelect ? '#fff' : '#ADADB8'}
          width={12}
          height={11}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemRatingFilter;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    lineHeight: 13,
  },
  imageWrap: {
    width: 31.03,
    height: 31.03,
    borderRadius: 100,
    overflow: 'hidden',
  },
  wrap: {
    borderRadius: 100,
    height: 40,
  },
  active: {
    backgroundColor: '#393948',
  },
});
