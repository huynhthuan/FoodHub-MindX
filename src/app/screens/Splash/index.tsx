import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const Splash = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <View flex centerH centerV bg-primary>
      <Image assetName="logo" assetGroup="images" />
      <Button
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <Text>Start</Text>
      </Button>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
