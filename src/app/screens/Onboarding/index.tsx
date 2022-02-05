import {Button, Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import BoardingItem from '../../components/Onboarding/BoardingItem';
import {getScreenHeight, getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const dataOnboarding = new Array(3).fill(null);

const Onboarding = () => {
  const swiperRef = React.useRef(null);
  const [swiperIndex, setSwiperIndex] = React.useState(0);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const nextSlide = React.useCallback(() => {
    setSwiperIndex(swiperIndex + 1);
    if (swiperIndex + 1 > 2) {
      navigation.navigate('Welcome');
      return;
    }
    swiperRef?.current?.scrollTo(swiperIndex + 1);
  }, [swiperIndex]);

  return (
    <View flex-1>
      <Swiper
        ref={swiperRef}
        activeDot={<View style={styles.activeDot} />}
        dot={<View style={styles.dot} />}
        paginationStyle={styles.pagination}
        showsButtons={false}
        loop={false}
        onIndexChanged={index => {
          setSwiperIndex(index);
        }}>
        {dataOnboarding.map((item, index) => (
          <BoardingItem key={index} />
        ))}
      </Swiper>
      <Button
        round={true}
        style={styles.buttonNext}
        onPress={() => {
          nextSlide();
        }}>
        <Image assetName="arrowRight" assetGroup="icons" />
      </Button>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  buttonNext: {
    width: 67,
    height: 67,
    backgroundColor: '#FE724C',
    position: 'absolute',
    bottom: 20,
    left: getScreenWidth() / 2,
    transform: [
      {
        translateX: -67 / 2,
      },
    ],
  },
  activeDot: {
    width: 25,
    height: 5,
    borderRadius: 25,
    backgroundColor: '#FFC529',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 197, 41, 0.4)',
    marginHorizontal: 3,
  },
  pagination: {
    position: 'absolute',
    top: 100,
  },
});
