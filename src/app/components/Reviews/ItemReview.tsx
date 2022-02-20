import {Image, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../hook';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import {getScreenWidth} from '../../utilities/helpers';
import FastImage from 'react-native-fast-image';

export interface IItemReview {
  id: number;
}

const ItemReview = ({id}: IItemReview) => {
  const entitieReviews = useAppSelector(
    state => state.userReviewSlice.entities,
  );
  const review: any = entitieReviews[id];

  if (!review) return null;

  return (
    <View marginB-30>
      <View row marginB-16 centerV>
        <View marginR-18>
          <View style={styles.imageWrap}>
            <FastImage
              source={{
                uri: review.reviewer_avatar_urls['48'],
                priority: 'high',
              }}
              style={styles.image}
            />
          </View>
          <View center style={styles.rateBox}>
            <Text white textSemiBold style={styles.rate}>
              {review.rating}
            </Text>
          </View>
        </View>

        <View>
          <Text white textRegular style={styles.name} marginB-5>
            {review.reviewer}
          </Text>
          <Text gray2 textRegular style={styles.date}>
            {moment(review.date_created).format('DD/MM/YY')}
          </Text>
        </View>
      </View>

      <View>
        <RenderHTML
          contentWidth={getScreenWidth() - 50}
          systemFonts={['SofiaPro-Bold', 'SofiaPro-Medium', 'SofiaPro']}
          source={{
            html: `<div style="font-family: 'SofiaPro'; font-size: 15px; line-height: 19.61px;color: #ADADB8;">${review.review}</div>`,
          }}
        />
      </View>
    </View>
  );
};

export default ItemReview;

const styles = StyleSheet.create({
  imageWrap: {
    width: 48,
    height: 48,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rateBox: {
    width: 18.23,
    height: 18.23,
    borderRadius: 6,
    backgroundColor: '#FFC529',
    position: 'absolute',
    bottom: -4.7,
    right: -4.81,
  },
  rate: {
    fontSize: 8.56,
  },
  name: {
    fontSize: 15,
    lineHeight: 15,
  },
  date: {
    fontSize: 12,
    lineHeight: 12,
  },
  comment: {
    fontSize: 15,
    lineHeight: 19.61,
  },
});
