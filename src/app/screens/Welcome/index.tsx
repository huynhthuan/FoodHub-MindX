import {Assets, Button, Text, View, Image} from 'react-native-ui-lib';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {getScreenWidth} from '../../utilities/helpers';

const Welcome = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <ImageBackground
      source={Assets.images.welcomeBg}
      resizeMode="cover"
      style={styles.backgroundImg}>
      <View paddingB-54 style={styles.container}>
        <View marginB-187>
          <Text style={styles.title1}>Chào mừng đến</Text>
          <Text marginB-19 style={styles.title2}>
            FoodHub
          </Text>
          <Text dark3 style={styles.welcomeDesc}>
            Thực phẩm yêu thích của bạn được giao nhanh chóng tại cửa của bạn.
          </Text>
        </View>

        <Button
          marginB-28
          style={styles.startButton}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text white style={styles.startButtonText}>
            Bắt đầu với email của bạn
          </Text>
        </Button>

        <View center>
          <Text white style={styles.signInDescText}>
            Bạn có sẵn sàng để tạo một tài khoản?{' '}
            <Text
              underline={true}
              style={styles.signInDescText}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              Đăng nhập
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  signInDescText: {
    fontFamily: 'SofiaPro',
  },
  title1: {
    fontFamily: 'SofiaPro-Bold',
    color: '#111719',
    fontSize: 53,
    lineHeight: 57.6,
  },
  title2: {
    fontFamily: 'SofiaPro-Bold',
    color: '#FE724C',
    fontSize: 53,
    lineHeight: 57.6,
  },
  welcomeDesc: {
    fontFamily: 'SofiaPro',
    lineHeight: 27,
    fontSize: 18,
  },
  bar: {
    width: 84,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  signInText: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 14,
  },
  signInBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signInButtons: {
    width: (getScreenWidth() - 60) / 2 - 7,
    height: 54,
    borderRadius: 27.41,
    paddingHorizontal: 12,
  },
  signInButtonGroup: {
    justifyContent: 'space-between',
  },
  signButtonTitle: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  startButton: {
    height: 54,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  startButtonText: {
    borderStyle: 'solid',
    fontFamily: 'SofiaPro-Medium',
    fontSize: 17,
  },
});
