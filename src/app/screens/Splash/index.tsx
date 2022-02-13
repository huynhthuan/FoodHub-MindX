import {StyleSheet} from 'react-native';
import React from 'react';
import {Image, View} from 'react-native-ui-lib';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const Splash = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2000);
  }, []);

  return (
    <View flex centerH centerV bg-primary>
      <Image assetName="logo" assetGroup="images" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
