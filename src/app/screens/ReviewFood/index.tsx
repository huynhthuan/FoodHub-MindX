import {
  Button,
  Image,
  Incubator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import {rateText} from '../../utilities/constant';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {useAppDispatch, useAppSelector} from '../../hook';
import {setLoading} from '../../redux/slices/loadingSlice';
import {showToast} from '../../redux/slices/toastSlice';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {BASE_URL_WOOCOMMERCE, WOO_KEY, WOO_SECRET} from '../../api/constants';

const ReviewFood = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      review: '',
    },
  });

  const [rateNumber, setRateNumber] = React.useState(1);
  const route = useRoute<RouteProp<MainStackParamList, 'ReviewFood'>>();
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();

  const renderStar = React.useCallback(
    (star: number) => {
      let startVote = new Array(star).fill(null);
      let startUnVote = new Array(5 - star).fill(null);
      return [
        _.map(startVote, (item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setRateNumber(index + 1);
            }}>
            <Image
              key={index}
              marginH-7
              assetName="starReviewActive"
              assetGroup="icons"
            />
          </TouchableOpacity>
        )),
        _.map(startUnVote, (item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setRateNumber(index + 1 + star);
            }}>
            <Image marginH-7 assetName="starReviewNormal" assetGroup="icons" />
          </TouchableOpacity>
        )),
      ];
    },
    [rateNumber],
  );

  const onSubmit = (data: any) => {
    dispatch(
      setLoading({
        isShown: true,
      }),
    );
    axios
      .post(
        BASE_URL_WOOCOMMERCE +
          'products/reviews?consumer_key=' +
          WOO_KEY +
          '&consumer_secret=' +
          WOO_SECRET,
        {
          product_id: route.params.foodData.id,
          review: data.review,
          reviewer: userState.user_nicename,
          reviewer_email: userState.user_email,
          rating: rateNumber,
        },
      )
      .then(res => {
        console.log(res);
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        setRateNumber(1);
        setValue('review', '');
        dispatch(
          showToast({
            isShown: true,
            msg: 'Đánh giá thành công',
            preset: Incubator.ToastPresets.SUCCESS,
          }),
        );
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(
          setLoading({
            isShown: false,
          }),
        );

        if (error.response.data.code === 'woocommerce_rest_comment_duplicate') {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Đánh giá giống nhau! Hình như bạn đã gửi phản hồi này rồi!',
              preset: Incubator.ToastPresets.FAILURE,
            }),
          );
        } else {
          dispatch(
            showToast({
              isShown: true,
              msg: 'Đã có lỗi xảy ra, vui lòng thử lại',
              preset: Incubator.ToastPresets.FAILURE,
            }),
          );
        }
      });
  };

  const onInvalid = (data: any) => {
    dispatch(
      showToast({
        isShown: true,
        msg: `${data.review ? 'Đánh giá: ' + data.review.message : ''}`,
        preset: Incubator.ToastPresets.FAILURE,
      }),
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View marginB-30 paddingH-25 marginT-10>
        <View style={styles.imageWrap}>
          <FastImage
            source={{
              uri: route.params.foodData.images[0]?.src,
              priority: 'high',
            }}
            style={styles.image}
          />
        </View>
      </View>

      <Text white textBold style={styles.titleReview} marginB-30 center>
        Bạn cảm thấy thế nào về món ăn {route.params.foodData.name}
      </Text>

      <Text primary textRegular center marginB-14 style={styles.textRate}>
        {rateText[rateNumber - 1]}
      </Text>

      <View row center marginB-44>
        {renderStar(rateNumber)}
      </View>

      <View paddingH-25 marginB-57>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Trường này không được bỏ trống.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Incubator.TextField
              spellCheck={false}
              textAlignVertical={'top'}
              multiline={true}
              containerStyle={styles.textArea}
              style={styles.textAreaWrap}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="review"
        />
      </View>

      <View paddingH-25 center>
        <Button
          style={styles.btn}
          bg-primary
          center
          onPress={handleSubmit(onSubmit, onInvalid)}>
          <Text textSemiBold white style={styles.btnText}>
            Gửi đánh giá
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ReviewFood;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D3A',
    paddingBottom: 30,
  },
  imageWrap: {
    height: 206,
    overflow: 'hidden',
    borderRadius: 14,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleReview: {
    fontSize: 31,
    lineHeight: 37.2,
  },
  textRate: {
    fontSize: 22,
    lineHeight: 22,
  },
  textArea: {
    height: 168,
    backgroundColor: '#393948',
    borderRadius: 18.21,
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  textAreaWrap: {
    color: '#fff',
    fontFamily: 'SofiaPro',
    fontSize: 16,
    lineHeight: 16,
  },
  btn: {
    width: 248,
    height: 60,
  },
  btnText: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
});
