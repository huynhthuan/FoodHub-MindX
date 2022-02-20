import {Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ItemReview from '../../components/Reviews/ItemReview';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../hook';
import WooApi from '../../api/wooApi';
import {useDispatch} from 'react-redux';
import {
  userReviewAddMany,
  userReviewAddOne,
  userReviewReceived,
} from '../../redux/slices/userReviewSlice';
import _ from 'lodash';

const Reviews = () => {
  const renderItemReview = React.useCallback(
    ({item}) => <ItemReview id={item} />,
    [],
  );

  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'Reviews'>>();
  const userState = useAppSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const [isLoadingReview, setIsLoadingReview] = React.useState(false);
  const reviewList = useAppSelector(state => state.userReviewSlice);
  const [offset, setOffset] = React.useState(0);

  const getReview = React.useCallback(() => {
    setOffset(0);
    dispatch(
      userReviewReceived({
        reviewList: JSON.stringify([]),
      }),
    );

    setIsLoadingReview(true);
    WooApi.get('products/reviews', {
      per_page: 5,
      product: route.params.foodData.id,
      orderby: 'date_gmt',
      order: 'desc',
    })
      .then((res: any) => {
        setIsLoadingReview(false);
        dispatch(
          userReviewReceived({
            reviewList: JSON.stringify(res),
          }),
        );
      })
      .catch((error: any) => {
        setIsLoadingReview(false);
        dispatch(
          userReviewReceived({
            reviewList: JSON.stringify([]),
          }),
        );
      });
  }, []);

  React.useEffect(() => {
    getReview();
  }, [route.params.foodData.id]);

  const loadMoreReview = React.useCallback(() => {
    console.log('Get load more');
    setIsLoadingReview(true);
    WooApi.get('products/reviews', {
      per_page: 5,
      offset: offset,
      product: route.params.foodData.id,
      orderby: 'date',
      order: 'desc',
    })
      .then((res: any) => {
        setIsLoadingReview(false);
        dispatch(
          userReviewAddMany({
            reviewList: JSON.stringify(res),
          }),
        );
      })
      .catch((error: any) => {
        setIsLoadingReview(false);
        dispatch(
          userReviewReceived({
            reviewList: JSON.stringify([]),
          }),
        );
      });
  }, [offset]);

  React.useEffect(() => {
    if (offset !== 0) {
      loadMoreReview();
    }
  }, [offset]);

  return (
    <View flex bg-primaryDark paddingT-67>
      <View paddingH-24 marginB-35>
        <TouchableOpacity
          style={styles.inputWrap}
          row
          paddingT-10
          paddingH-13
          paddingB-10
          centerV
          onPress={() => {
            navigation.navigate('ReviewFood', {
              foodData: route.params.foodData,
            });
          }}>
          <View style={styles.imageWrap} marginR-17>
            <FastImage
              source={{
                uri: userState.avatar_url,
                priority: 'high',
              }}
              style={styles.image}
            />
          </View>
          <Text textRegular gray5 style={styles.textInput}>
            Viết bình luận của bạn...
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={reviewList.ids}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemReview}
        contentContainerStyle={{
          paddingHorizontal: 25,
        }}
        refreshing={isLoadingReview}
        onRefresh={() => {
          getReview();
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setOffset(offset + 5);
        }}
      />
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  inputWrap: {
    borderRadius: 12,
    borderWidth: 1,
    borderSyle: 'solid',
    borderColor: '#393948',
  },
  imageWrap: {
    width: 30,
    height: 30,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    fontSize: 14,
    lineHeight: 14,
  },
});
