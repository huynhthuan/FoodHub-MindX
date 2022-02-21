import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

export interface ICategory {
  data: any[] | undefined;
  setCategory: any;
}

const ItemCategoryFilter = ({data, setCategory}: ICategory) => {
  const [isSelect, setIsSelect] = React.useState(false);

  React.useEffect(() => {
    if (isSelect) {
      setCategory((prev: any) => [...prev, data?.id]);
    } else {
      setCategory((prev: any) => {
        prev.splice(prev.indexOf(data?.id), 1);
        return prev;
      });
    }
  }, [isSelect]);

  return (
    <TouchableOpacity
      centerV
      row
      marginR-10
      marginB-16
      paddingR-12
      paddingL-4
      paddingV-4
      style={isSelect ? [styles.wrap, styles.active] : styles.wrap}
      onPress={() => {
        setIsSelect(!isSelect);
      }}>
      <View center marginR-7 bg-white style={styles.imageWrap}>
        <FastImage
          source={{
            uri: data?.image.src,
            priority: 'high',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <Text textMedium white style={styles.text}>
        {data?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemCategoryFilter;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
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
