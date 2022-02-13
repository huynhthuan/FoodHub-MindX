import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {MainStackParamList} from '../../../../App';
import FormAddDeliveryAddress from '../../components/Delivery/FormAddDeliveryAddress';
import {changeHeaderBackground} from '../../utilities/helpers';

const AddDeliveryAddress = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}>
      <FormAddDeliveryAddress />
    </ScrollView>
  );
};

export default AddDeliveryAddress;

const styles = StyleSheet.create({
  content: {
    paddingTop: 72,
    paddingBottom: 30,
    paddingHorizontal: 25,
    backgroundColor: '#2D2D3A',
  },
});
