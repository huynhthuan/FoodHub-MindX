import {Checkbox, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';

const AddOnItem = () => {
  const [isCheck, setIsCheck] = React.useState(false);

  return (
    <View spread centerV row marginB-12>
      <View row centerV>
        <View marginR-18 style={styles.imageWrap}>
          <Image assetGroup="images" assetName="avatar" style={styles.image} />
        </View>
        <Text white style={styles.name}>
          Pepper julienned
        </Text>
      </View>
      <View row centerV>
        <Text white style={styles.price} marginR-19>
          +$2.30
        </Text>
        <Checkbox value={isCheck} onValueChange={value => setIsCheck(value)} />
      </View>
    </View>
  );
};

export default AddOnItem;

const styles = StyleSheet.create({
  imageWrap: {
    width: 39.17,
    height: 39.17,
    overflow: 'hidden',
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 14,
  },
  price: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 14,
  },
});
