import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {getScreenWidth} from '../../utilities/helpers';

export interface IItemOrderUpcoming {
  data: any;
}

const ItemOrderUpcoming = ({data}: IItemOrderUpcoming) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <View bg-dark padding-18 marginB-20 style={styles.container}>
      <View row spread marginB-24>
        <View row bottom>
          <View center style={styles.imageWrap} marginR-15>
            <Image
              assetName="avatar"
              assetGroup="images"
              style={styles.image}
            />
          </View>
          <View>
            <View row spread marginB-9>
              <Text gray2 textRegular style={styles.text}>
                3 Items
              </Text>
            </View>

            <Text
              white
              marginB-11
              textSemiBold
              style={styles.name}
              onPress={() => {
                navigation.navigate('AgencyDetails');
              }}>
              McDonald’s{' '}
              <Image
                assetName="verify"
                width={8}
                height={8}
                assetGroup="icons"
              />
            </Text>
          </View>
        </View>

        <Text yellow textRegular style={styles.price}>
          #2641000
        </Text>
      </View>

      <View row spread marginB-21>
        <View>
          <Text gray2 textBold marginB-11>
            Estimated Arrival
          </Text>
          <View row bottom>
            <Text white textRegular style={styles.time}>
              25
            </Text>
            <Text white textRegular style={styles.timeUnit}>
              min
            </Text>
          </View>
        </View>

        <View right>
          <Text gray2 marginB-5>
            Now
          </Text>
          <Text textBold style={styles.textStatus}>
            Food on the way
          </Text>
        </View>
      </View>

      <View row spread>
        <Button bg-dark4 style={styles.btn}>
          <Text white textMedium style={styles.btnText}>
            Cancel
          </Text>
        </Button>
        <Button bg-primary style={styles.btn}>
          <Text white textMedium style={styles.btnText}>
            Track Order
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ItemOrderUpcoming;

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    lineHeight: 15,
  },
  container: {
    borderRadius: 18.21,
  },
  price: {
    fontSize: 16,
  },
  imageWrap: {
    width: 65,
    height: 65,
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    marginHorizontal: 9,
  },
  dotStatus: {
    width: 7,
    height: 7,
    borderRadius: 100,
    backgroundColor: '#4EE476',
  },
  textStatus: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 19.6,
  },
  btn: {
    width: (getScreenWidth() - 86) / 2 - 9,
    height: 43,
  },
  btnText: {
    fontSize: 15,
  },
  time: {
    fontSize: 39.27,
    lineHeight: 39.27,
    marginRight: 5,
  },
  timeUnit: {
    fontSize: 15,
    lineHeight: 39.27,
  },
});
