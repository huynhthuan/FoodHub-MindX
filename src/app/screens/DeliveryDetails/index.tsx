import {Text, View} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FormDeliveryAddress from '../../components/Delivery/FormDeliveryAddress';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {changeHeaderBackground} from '../../utilities/helpers';

const DeliveryDetails = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}>
      <FormDeliveryAddress />
    </ScrollView>
  );
};

export default DeliveryDetails;

const styles = StyleSheet.create({
  content: {
    paddingTop: 72,
    paddingBottom: 30,
    paddingHorizontal: 25,
    backgroundColor: '#2D2D3A',
  },
});
