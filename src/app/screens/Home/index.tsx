import {Text, View} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import SearchBar from '../../components/HomeMenu/SearchBar';
import CategorySwiper from '../../components/HomeMenu/CategorySwiper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../../App';
import {changeHeaderBackground} from '../../utilities/helpers';
import {useAppDispatch, useAppSelector} from '../../hook';
import {productFeatureReceived} from '../../redux/slices/productFeatureSlice';
import {productSaleReceived} from '../../redux/slices/productSaleSlice';
import {productPopularReceived} from '../../redux/slices/productPopularSlice';
import ItemFoodSale from '../../components/Item/Food/ItemFoodSale';
import ItemFoodPopular from '../../components/Item/Food/ItemFoodPopular';
import ItemFoodFeature from '../../components/Item/Food/ItemFoodFeature';
import axios from 'axios';
import {BASE_URL_WOOCOMMERCE, WOO_KEY, WOO_SECRET} from '../../api/constants';

const Home = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();
  const productFeature = useAppSelector(state => state.productFeatureSlice);
  const productSale = useAppSelector(state => state.productSaleSlice);
  const productPopular = useAppSelector(state => state.productPopularSlice);

  const renderItemFeature = React.useCallback(
    ({item}) => (
      <ItemFoodFeature
        customStyle={{
          width: 154,
          marginRight: 15,
        }}
        id={item}
      />
    ),
    [],
  );

  const renderItemSale = React.useCallback(
    ({item}) => (
      <ItemFoodSale
        customStyle={{
          width: 154,
          marginRight: 15,
        }}
        id={item}
      />
    ),
    [],
  );

  const renderItemPopular = React.useCallback(
    ({item}) => (
      <ItemFoodPopular
        customStyle={{
          width: 154,
          marginRight: 15,
        }}
        id={item}
      />
    ),
    [],
  );

  const getProductFeature = React.useCallback(() => {
    axios
      .get(BASE_URL_WOOCOMMERCE + 'products/', {
        params: {
          featured: true,
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then(res => {
        dispatch(
          productFeatureReceived({
            productList: JSON.stringify(res.data),
          }),
        );
      });
  }, []);

  const getProductSale = React.useCallback(() => {
    axios
      .get(BASE_URL_WOOCOMMERCE + 'products/', {
        params: {
          on_sale: true,
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then((res) => {
        dispatch(
          productSaleReceived({
            productList: JSON.stringify(res.data),
          }),
        );
      });
  }, []);

  const getProductPopular = React.useCallback(() => {
    axios
      .get(BASE_URL_WOOCOMMERCE + 'products/', {
        params: {
          order: 'desc',
          orderby: 'popularity',
          consumer_key: WOO_KEY,
          consumer_secret: WOO_SECRET,
        },
      })
      .then((res) => {
        dispatch(
          productPopularReceived({
            productList: JSON.stringify(res.data),
          }),
        );
      });
  }, []);

  React.useEffect(() => {
    getProductFeature();
    getProductPopular();
    getProductSale();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      onScroll={({nativeEvent}) => {
        changeHeaderBackground(nativeEvent, navigation);
      }}>
      <View paddingT-70>
        <View paddingH-25>
          <Text marginB-29 white style={styles.title}>
            Bạn muốn đặt món gì ?
          </Text>
        </View>

        <View paddingH-25>
          <SearchBar
            showSoftInputOnFocus={false}
            autofocus={false}
            onPressInCustom={() => {
              navigation.navigate('Search');
            }}
          />
        </View>

        <View>
          <CategorySwiper />
        </View>

        <View paddingH-25>
          <Text marginB-15 white style={styles.sectionTitle}>
            Món ăn nổi bật
          </Text>
        </View>

        <View paddingL-25>
          <FlatList
            renderItem={renderItemFeature}
            data={productFeature.ids}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View paddingH-25>
          <Text marginB-15 white style={styles.sectionTitle}>
            Món ăn phổ biến
          </Text>
        </View>

        <View paddingL-25>
          <FlatList
            renderItem={renderItemPopular}
            data={productPopular.ids}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View paddingH-25>
          <Text marginB-15 white style={styles.sectionTitle}>
            Đang được giảm giá
          </Text>
        </View>

        <View paddingL-25>
          <FlatList
            renderItem={renderItemSale}
            data={productSale.ids}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SofiaPro-SemiBold',
    fontSize: 30,
    lineHeight: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
  },
  list: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 18,
    lineHeight: 18,
  },
});
