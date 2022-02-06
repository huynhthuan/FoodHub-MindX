import {Button, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ItemDeliveryAddress from '../../components/Delivery/ItemDeliveryAddress';
import _ from 'lodash';
import {changeHeaderBackground, getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const DeliveryAddress = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}>
      {_.map([1, 2, 3, 4, 5, 6], (item, index) => (
        <ItemDeliveryAddress key={index} data={item} />
      ))}

      <View paddingH-25 center>
        <Button
          bg-primary
          style={styles.btn}
          onPress={() => {
            navigation.navigate('AddDeliveryAddress');
          }}>
          <Text textSemiBold white style={styles.btnText}>
            Add new Address
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D3A',
  },
  content: {
    paddingTop: 68,
    paddingBottom: 30,
  },
  btn: {
    height: 60,
    width: 248,
  },
  btnText: {
    textTransform: 'uppercase',
    fontSize: 15,
  },
});
