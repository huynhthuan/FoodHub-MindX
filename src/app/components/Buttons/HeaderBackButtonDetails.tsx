import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Image} from 'react-native-ui-lib';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const HeaderBackButtonDetails = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Button
      style={styles.buttonBack}
      centerH
      centerV
      onPress={() => {
        navigation.goBack();
      }}>
      <Image
        assetName="arrowLeftNormal"
        assetGroup="icons"
        tintColor="#111719"
      />
    </Button>
  );
};

export default HeaderBackButtonDetails;

const styles = StyleSheet.create({
  buttonBack: {
    width: 38,
    height: 38,
    backgroundColor: '#ffffff',
    minWidth: 0,
    borderRadius: 11,
  },
});
