import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../hook';
import moment from 'moment'; // require
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import axios from 'axios';
import {BASE_URL_WP_MEDIA} from '../../api/constants';
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s trước',
    s: 'một vài giây',
    ss: '%d giây',
    m: 'một phút',
    mm: '%d phút',
    h: 'một giờ',
    hh: '%d hours',
    d: 'một ngày',
    dd: '%d ngày',
    w: 'một tuần',
    ww: '%d tuần',
    M: 'một tháng',
    MM: '%d tháng',
    y: 'một năm',
    yy: '%d năm',
  },
});

const NotiItem = ({id}: {id: number}) => {
  const entitieNotices = useAppSelector(state => state.noticesSlice.entities);
  const notice: any = entitieNotices[id];
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  if (!notice) return null;
  const [image, setImage] = React.useState(
    'https://secure.gravatar.com/avatar/c2b06ae950033b392998ada50767b50e?s=96&d=mm&r=g',
  );

  React.useEffect(() => {
    axios.get(BASE_URL_WP_MEDIA + notice.featured_media).then(res => {
      setImage(res.data.source_url);
    });
  }, []);

  return (
    <TouchableOpacity
      paddingH-25
      row
      marginB-20
      onPress={() => {
        navigation.navigate('NotificationsDetails', {notiId: id});
      }}>
      <View style={styles.imageWrap} bg-white marginR-12>
        <FastImage
          source={{
            uri: image,
            priority: 'high',
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <View flex-1>
        <Text textBold marginB-2 style={styles.title} numberOfLines={2}>
          {notice.title.rendered}
        </Text>
        <View row>
          <Text textRegular marginR-20 style={styles.meta}>
            <Image assetName="clock" assetGroup="icons" marginR-4 />{' '}
            {moment(notice.date).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotiItem;

const styles = StyleSheet.create({
  imageWrap: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 24,
  },
  meta: {
    color: '#ADADB8',
    fontSize: 14,
  },
});
