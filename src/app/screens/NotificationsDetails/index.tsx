import {Text, View} from 'react-native-ui-lib';
import React from 'react';
import {useAppSelector} from '../../hook';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {changeHeaderBackground, getScreenHeight, getScreenWidth} from '../../utilities/helpers';
import moment from 'moment';
import axios from 'axios';
import {BASE_URL_WP_MEDIA} from '../../api/constants';
import RenderHTML from 'react-native-render-html';

const NotificationsDetails = () => {
  const route =
    useRoute<RouteProp<MainStackParamList, 'NotificationsDetails'>>();
  const entitieNotices = useAppSelector(state => state.noticesSlice.entities);
  const notice: any = entitieNotices[route.params.notiId];
  const [image, setImage] = React.useState(
    'https://secure.gravatar.com/avatar/c2b06ae950033b392998ada50767b50e?s=96&d=mm&r=g',
  );
  const navigation = useNavigation();

  if (!notice) return null;

  React.useEffect(() => {
    axios.get(BASE_URL_WP_MEDIA + notice.featured_media).then(res => {
      setImage(res.data.source_url);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}
    >
      <View style={styles.imageWrap}>
        <FastImage
          source={{
            uri: image,
            priority: 'high',
          }}
          style={styles.image}
        />

        <View bottom style={styles.meta}>
          <View row marginB-20 centerV>
            <Text textMedium style={styles.desc} white>
              {moment(notice.date).format('MMMM Do YYYY')}
            </Text>
            <View marginH-8 style={styles.dot}></View>
            <Text textMedium style={styles.desc} white>
              {moment(notice.date).format('H:m')}
            </Text>
          </View>

          <Text style={styles.title} white textBold marginB-20>
            {notice.title.rendered}
          </Text>
        </View>
      </View>

      <View paddingH-25 paddingB-30>
        <RenderHTML
          contentWidth={getScreenWidth() - 50}
          systemFonts={['SofiaPro-Bold', 'SofiaPro-Medium', 'SofiaPro']}
          source={{
            html: `<div style="color: white; text-align: justify; line-height: 20px;font-family: 'SofiaPro'; font-size: 16px;">${notice.content.rendered}</div>`,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default NotificationsDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D3A',
    minHeight: getScreenHeight(),
  },
  imageWrap: {
    height: getScreenWidth() + 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  meta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(45, 45, 58, 0.6)',
  },
  title: {
    fontSize: 28,
    lineHeight: 27,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  desc: {
    fontSize: 15,
  },
});
