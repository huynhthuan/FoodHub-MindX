/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import * as Sentry from '@sentry/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/app/screens/Splash';
import Welcome from './src/app/screens/Welcome';
import Onboarding from './src/app/screens/Onboarding';
import Login from './src/app/screens/Login';
import SignUp from './src/app/screens/SignUp';
import HeaderBackButton from './src/app/components/Buttons/HeaderBackButton';
import BindPhone from './src/app/screens/BindPhone';
import Verification from './src/app/screens/Verification';
import ResetPassword from './src/app/screens/ResetPassword';
import FoodDetails from './src/app/screens/FoodDetails';
import HeaderBackButtonDetails from './src/app/components/Buttons/HeaderBackButtonDetails';
import AgencyDetails from './src/app/screens/AgencyDetails';
import Search from './src/app/screens/Search';
import Avatar from './src/app/components/HomeMenu/Avatar';
import Filter from './src/app/screens/Filter';
import DashBoard from './src/app/screens/DashBoard';
import OrderDetails from './src/app/screens/OrderDetails';
import DeliveryDetails from './src/app/screens/DeliveryDetails';
import AddDeliveryAddress from './src/app/screens/AddDeliveryAddress';
import Reviews from './src/app/screens/Reviews';
import ReviewFood from './src/app/screens/ReviewFood';
import ReviewAgency from './src/app/screens/ReviewAgency';
import Category from './src/app/screens/Category';
import Cart from './src/app/screens/Cart';
import HeaderCartButton from './src/app/components/Buttons/HeaderCartButton';
import {Provider} from 'react-redux';
import store from './src/app/store';
import {useAppSelector} from './src/app/hook';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Loading from './src/app/components/Overlay/Loading';
import ToastCustom from './src/app/components/Overlay/ToastCustom';
import {deliveryAddressData} from './src/app/redux/slices/deliveryAddressSlice';
import NotificationsDetails from './src/app/screens/NotificationsDetails';
import FilterFood from './src/app/screens/FilterFood';

Sentry.init({
  dsn: 'https://2e7732ba44794b38913cb3829622ac0f@o1121885.ingest.sentry.io/6158966',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableNative: false,
});

const MainStack = createNativeStackNavigator();

export type MainStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  BindPhone: undefined;
  Verification: {
    confirmation: FirebaseAuthTypes.ConfirmationResult;
    phoneNumber: string;
  };
  ResetPassword: undefined;
  DashBoard: undefined;
  FoodDetails: {foodId: number};
  AgencyDetails: undefined;
  Search: undefined;
  Filter: undefined;
  FilterFood: {
    filterData: {
      category: number[];
      rate: number[];
      min_price: number;
      max_price: number;
    };
  };
  Category: {CategoryDetail: any};
  Cart: undefined;
  Payment: undefined;
  OrderDetails: undefined;
  DeliveryDetails: {addressDetail: deliveryAddressData};
  AddDeliveryAddress: undefined;
  Reviews: {foodData: any};
  ReviewFood: {foodData: any};
  ReviewAgency: undefined;
  NotificationsDetails: {notiId: number};
};

const optionsAuthScreen = {
  headerShown: true,
  headerTransparent: true,
  title: '',
  headerLeft: () => <HeaderBackButton />,
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const userState = useAppSelector(state => state.userSlice);
  const loading = useAppSelector(state => state.loadingSlice);
  const toasCustom = useAppSelector(state => state.toastSlice);

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
          }}>
          {userState.token === undefined ? (
            <>
              <MainStack.Screen name="Splash" component={Splash} />
              <MainStack.Screen name="Onboarding" component={Onboarding} />
              <MainStack.Screen name="Welcome" component={Welcome} />
              <MainStack.Screen
                options={optionsAuthScreen}
                name="Login"
                component={Login}
              />
              <MainStack.Screen
                options={optionsAuthScreen}
                name="SignUp"
                component={SignUp}
              />
              <MainStack.Screen
                options={optionsAuthScreen}
                name="BindPhone"
                component={BindPhone}
              />
              <MainStack.Screen
                options={optionsAuthScreen}
                name="Verification"
                component={Verification}
              />
              <MainStack.Screen
                options={optionsAuthScreen}
                name="ResetPassword"
                component={ResetPassword}
              />
            </>
          ) : (
            <>
              <MainStack.Screen name="DashBoard" component={DashBoard} />
              <MainStack.Screen
                options={optionsAuthScreen}
                name="BindPhone"
                component={BindPhone}
              />
              <MainStack.Screen
                options={optionsAuthScreen}
                name="Verification"
                component={Verification}
              />
              <MainStack.Screen
                name="FoodDetails"
                component={FoodDetails}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: 'Chi tiết',
                  headerLeft: () => <HeaderBackButtonDetails />,
                  headerRight: () => <HeaderCartButton />,
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="AgencyDetails"
                component={AgencyDetails}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: '',
                  headerLeft: () => <HeaderBackButtonDetails />,
                }}
              />
              <MainStack.Screen
                name="Search"
                component={Search}
                options={{
                  animation: 'fade_from_bottom',
                  headerShown: true,
                  headerTransparent: true,
                  title: 'Tìm kiếm',
                  headerRight: () => <Avatar customStyle={{marginRight: 9}} />,
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="Filter"
                component={Filter}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: 'Lọc sản phẩm',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="FilterFood"
                component={FilterFood}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: 'Kết quả lọc',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="Category"
                component={Category}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: '',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                }}
              />
              <MainStack.Screen
                name="Cart"
                component={Cart}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: 'Giỏ hàng',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerRight: () => <HeaderCartButton />,
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: 'Chi tiết đơn hàng',
                  headerRight: () => <Avatar customStyle={{marginRight: 9}} />,
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="DeliveryDetails"
                component={DeliveryDetails}
                options={{
                  headerTransparent: true,
                  headerShown: true,
                  title: 'Chỉnh sửa địa chỉ giao hàng',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="AddDeliveryAddress"
                component={AddDeliveryAddress}
                options={{
                  headerTransparent: true,
                  headerShown: true,
                  title: 'Thêm địa chỉ giao hàng',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="Reviews"
                component={Reviews}
                options={{
                  headerTransparent: true,
                  headerShown: true,
                  title: 'Đánh giá',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 9}} />
                  ),
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontFamily: 'SofiaPro-Medium',
                    fontSize: 18,
                  },
                }}
              />
              <MainStack.Screen
                name="ReviewFood"
                component={ReviewFood}
                options={{
                  headerTransparent: true,
                  headerShown: true,
                  title: '',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 14}} />
                  ),
                }}
              />
              <MainStack.Screen
                name="ReviewAgency"
                component={ReviewAgency}
                options={{
                  headerTransparent: true,
                  headerShown: true,
                  title: '',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 14}} />
                  ),
                }}
              />
              <MainStack.Screen
                name="NotificationsDetails"
                component={NotificationsDetails}
                options={{
                  headerTransparent: true,
                  headerShown: true,
                  title: '',
                  headerLeft: () => (
                    <HeaderBackButton customStyle={{marginLeft: 14}} />
                  ),
                }}
              />
            </>
          )}
        </MainStack.Navigator>
      </NavigationContainer>

      <Loading isShow={loading.isShown} />
      <ToastCustom
        isVisible={toasCustom.isShown}
        msg={toasCustom.msg}
        preset={toasCustom.preset}
      />
    </>
  );
};

export default Sentry.wrap(AppWrapper);
