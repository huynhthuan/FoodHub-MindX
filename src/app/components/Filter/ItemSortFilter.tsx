import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface ISort {
  label: string;
}

const ItemSortFilter = ({label}: ISort) => {
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
      <Text textMedium white style={styles.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemSortFilter;

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
