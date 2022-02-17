import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DeliveryAddress from '../../screens/DeliveryAddress';
import Cart from '../../screens/Cart';
import Favorite from '../../screens/Favorites';
import Notifications from '../../screens/Notifications';
import Icon from './Icon';
import Home from '../../screens/Home';
import ToggleSideMenu from '../../components/HomeMenu/ToggleSideMenu';
import DeliveryAddressSelect from '../../components/HomeMenu/DeliveryAddressSelect';
import Avatar from '../../components/HomeMenu/Avatar';
import HeaderBackButton from '../../components/Buttons/HeaderBackButton';

const HomeStack = createBottomTabNavigator();

export type HomeMenuStackParamList = {
  DashBoard: undefined;
  DeliveryAddress: undefined;
  Cart: undefined;
  Favorite: undefined;
};

const HomeMenu = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#393948',
          height: 74,
          borderTopWidth: 0,
        },
        title: '',
        headerRightContainerStyle: {
          paddingRight: 25,
        },
        headerLeftContainerStyle: {
          paddingLeft: 25,
        },
        headerTitleContainerStyle: {},
        headerTitleAlign: 'center',
        headerTransparent: true,
      }}>
      <HomeStack.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              iconName="dashboard"
              styleCustom={{
                width: 23.71,
                height: 23.71,
              }}
              focused={focused}
            />
          ),
          headerRight: () => <Avatar />,
          headerLeft: () => <ToggleSideMenu />,
          headerTitle: () => <DeliveryAddressSelect />,
        }}
        name="Dashboard"
        component={Home}
      />
      <HomeStack.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              iconName="location"
              styleCustom={{
                width: 19.81,
                height: 23.76,
              }}
              focused={focused}
            />
          ),
          headerLeft: () => <HeaderBackButton />,
          title: 'Địa chỉ giao hàng',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'SofiaPro-Medium',
            fontSize: 18,
          },
        }}
        name="DeliveryAddress"
        component={DeliveryAddress}
      />
      <HomeStack.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              iconName="cart"
              styleCustom={{
                width: 22,
                height: 24.13,
              }}
              focused={focused}
            />
          ),
          tabBarBadge: '3',
          tabBarBadgeStyle: {
            backgroundColor: '#FE724C',
            color: '#ffffff',
            fontSize: 10,
            fontFamily: 'SofiaPro',
            lineHeight: 14.53,
            padding: 0,
            top: 15,
            left: 10,
            width: 14.56,
            borderRadius: 6,
          },
        }}
        name="Cart"
        component={Cart}
      />
      <HomeStack.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              styleCustom={{
                width: 21.65,
                height: 19.79,
              }}
              iconName="like"
              focused={focused}
            />
          ),
          headerShown: true,
          headerTransparent: true,
          title: 'Yêu thích',
          headerRight: () => <Avatar />,
          headerLeft: () => <HeaderBackButton />,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffffff',
            fontFamily: 'SofiaPro-Medium',
            fontSize: 18,
          },
        }}
        name="Favorite"
        component={Favorite}
      />
      <HomeStack.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              styleCustom={{
                width: 20.28,
                height: 23.99,
              }}
              iconName="noti"
              focused={focused}
            />
          ),
          tabBarBadge: '3',
          tabBarBadgeStyle: {
            backgroundColor: '#FE724C',
            color: '#ffffff',
            fontSize: 10,
            fontFamily: 'SofiaPro',
            lineHeight: 14.53,
            padding: 0,
            top: 15,
            left: 10,
            width: 14.56,
            borderRadius: 6,
          },
        }}
        name="Notifications"
        component={Notifications}
      />
    </HomeStack.Navigator>
  );
};

export default HomeMenu;
