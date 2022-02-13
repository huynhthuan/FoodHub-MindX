import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FormEditDeliveryAddress from '../../components/Delivery/FormEditDeliveryAddress';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {changeHeaderBackground, getScreenHeight} from '../../utilities/helpers';

const DeliveryDetails = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'DeliveryDetails'>>();
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}>
      <FormEditDeliveryAddress data={route.params.addressDetail} />
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
    minHeight: getScreenHeight(),
  },
});
