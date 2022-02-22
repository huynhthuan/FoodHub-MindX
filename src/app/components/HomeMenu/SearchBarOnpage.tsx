import {Button, Image, Incubator, View} from 'react-native-ui-lib';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {getScreenWidth} from '../../utilities/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

export interface ISearchBox {
  onPressInCustom?: () => void;
  showSoftInputOnFocus?: boolean;
  autofocus?: boolean;
  setKeyWord: any;
  keyWord: string;
}
const SearchBarOnpage = ({
  onPressInCustom,
  showSoftInputOnFocus = false,
  autofocus = false,
  setKeyWord,
  keyWord,
}: ISearchBox) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <View marginB-30 row spread style={styles.container}>
      <View style={styles.search}>
        <Image assetName="search" assetGroup="icons" style={styles.icon} />
        <Incubator.TextField
          onChange={({nativeEvent}) => {
            setKeyWord(nativeEvent.text);
          }}
          onPressIn={onPressInCustom}
          value={keyWord}
          placeholder={'Tìm đồ ăn cho bạn...'}
          placeholderTextColor={'#ADADB8'}
          style={styles.input}
          showSoftInputOnFocus={showSoftInputOnFocus}
          autofocus={autofocus}
        />
      </View>
    </View>
  );
};

export default SearchBarOnpage;

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: '#393948',
    borderRadius: 14,
    height: 51,
    width: 51,
    minWidth: 51,
  },
  search: {
    width: getScreenWidth() - 119,
  },
  icon: {
    position: 'absolute',
    zIndex: 22,
    top: 51 / 2,
    left: 23,
    transform: [
      {
        translateY: -13.5 / 2,
      },
    ],
  },
  input: {
    fontFamily: 'SofiaPro',
    fontSize: 14,
    borderColor: '#474755',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 14,
    backgroundColor: '#393948',
    height: 51,
    paddingLeft: 51,
    paddingRight: 25,
    color: '#ffffff',
  },
});
