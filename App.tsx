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
  FoodDetails: undefined;
  AgencyDetails: undefined;
  Search: undefined;
  Filter: undefined;
  Category: undefined;
  Cart: undefined;
  Payment: undefined;
  OrderDetails: undefined;
  DeliveryDetails: {addressDetail: deliveryAddressData};
  AddDeliveryAddress: undefined;
  Reviews: {screenWriteReview: string};
  ReviewFood: undefined;
  ReviewAgency: undefined;
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
                  title: '',
                  headerLeft: () => <HeaderBackButtonDetails />,
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
                  title: 'Search',
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
                  title: 'Filter',
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
                  title: 'Cart',
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
                  title: 'Order Details',
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
                  title: 'Edit Delivery Address',
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
                  title: 'Add Delivery Address',
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
                  title: 'Reviews',
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
                    <HeaderBackButton
                      customStyle={{marginLeft: 14, marginTop: 14}}
                    />
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
                    <HeaderBackButton
                      customStyle={{marginLeft: 14, marginTop: 14}}
                    />
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
