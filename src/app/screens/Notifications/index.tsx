import {Incubator, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {changeHeaderBackground, getScreenHeight} from '../../utilities/helpers';
import NotiItem from '../../components/Noti/NotiItem';
import {useAppDispatch, useAppSelector} from '../../hook';
import axios from 'axios';
import {BASE_URL_WP_POST} from '../../api/constants';
import {showToast} from '../../redux/slices/toastSlice';
import {noticesAddMany, noticesReceived} from '../../redux/slices/noticesSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';

const Notifications = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const noticeData = useAppSelector(state => state.noticesSlice.ids);
  const [offset, setOffset] = React.useState(0);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();

  const renderNotiItem = React.useCallback(
    ({item}) => <NotiItem id={item} />,
    [],
  );

  const getNotice = React.useCallback(() => {
    setIsLoading(true);
    axios
      .get(BASE_URL_WP_POST, {
        params: {
          order: 'desc',
          orderby: 'date',
          per_page: 9,
        },
      })
      .then(res => {
        setIsLoading(false);
        dispatch(
          noticesReceived({
            noticeList: JSON.stringify(res.data),
          }),
        );
      })
      .catch(error => {
        console.log(error);

        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(BASE_URL_WP_POST, {
        params: {
          order: 'desc',
          orderby: 'date',
          offset,
          per_page: 9,
        },
      })
      .then(res => {
        setIsLoading(false);
        dispatch(
          noticesAddMany({
            noticeList: JSON.stringify(res.data),
          }),
        );
      })
      .catch(error => {
        console.log(error);
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
            preset: Incubator.ToastPresets.FAILURE,
          }),
        );
      });
  }, [offset]);

  React.useEffect(() => {
    getNotice();
  }, []);

  return (
    <>
      <FlatList
        onScroll={({nativeEvent}) => {
          changeHeaderBackground(nativeEvent, navigation);
        }}
        data={noticeData}
        renderItem={renderNotiItem}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        refreshing={isLoading}
        onRefresh={() => {
          setOffset(0);
          getNotice();
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setOffset(offset + 9);
        }}
      />
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 30,
    minHeight: getScreenHeight(),
    backgroundColor: '#2D2D3A',
  },
});
