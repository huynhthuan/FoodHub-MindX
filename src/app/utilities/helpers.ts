import {Dimensions, NativeScrollEvent} from 'react-native';

const getScreenWidth = () => {
  return Dimensions.get('window').width;
};

const getScreenHeight = () => {
  return Dimensions.get('window').height;
};

const changeHeaderBackground = (
  nativeEvent: NativeScrollEvent,
  navigation: any,
) => {
  if (nativeEvent.contentOffset.y > 0) {
    navigation.setOptions({
      headerBackgroundContainerStyle: {
        backgroundColor: '#2D2D3A',
      },
      headerStyle: {
        backgroundColor: '#2D2D3A',
      },
    });
  } else {
    navigation.setOptions({
      headerBackgroundContainerStyle: {
        backgroundColor: 'transparent',
      },
      headerStyle: {
        backgroundColor: 'transparent',
      },
    });
  }
};

export {getScreenHeight, getScreenWidth, changeHeaderBackground};