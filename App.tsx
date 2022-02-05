/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
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
import HomeMenu from './src/app/navigation/HomeMenu';
import FoodDetails from './src/app/screens/FoodDetails';
import HeaderBackButtonDetails from './src/app/components/Buttons/HeaderBackButtonDetails';
import AgencyDetails from './src/app/screens/AgencyDetails';
import Search from './src/app/screens/Search';
import Avatar from './src/app/components/HomeMenu/Avatar';
import Filter from './src/app/screens/Filter';
import DashBoard from './src/app/screens/DashBoard';

const MainStack = createNativeStackNavigator();

export type MainStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  BindPhone: undefined;
  Verification: undefined;
  ResetPassword: undefined;
  DashBoard: undefined;
  FoodDetails: undefined;
  AgencyDetails: undefined;
  Search: undefined;
  Filter: undefined;
  Category: undefined;
  Cart: undefined;
  Payment: undefined;
};

const optionsAuthScreen = {
  headerShown: true,
  headerTransparent: true,
  title: '',
  headerLeft: () => <HeaderBackButton />,
};

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
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
        <MainStack.Screen name="DashBoard" component={DashBoard} />
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
            headerStyle: {},
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
        {/* <MainStack.Screen name="Category" component={Category} /> */}
        {/* <MainStack.Screen name="Cart" component={Cart} /> */}
        {/* <MainStack.Screen name="Payment" component={Payment} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
