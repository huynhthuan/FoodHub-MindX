import React from 'react';
import {StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeMenu from '../../navigation/HomeMenu';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import MyOrders from '../MyOrders';
import MyProfile from '../MyProfile';
import PaymentMethods from '../PaymentMethods';
import ContactUs from '../ContactUs';
import Settings from '../Settings';
import HelpsFaqs from '../HelpsFaqs';
import HeaderBackButton from '../../components/Buttons/HeaderBackButton';
import Avatar from '../../components/HomeMenu/Avatar';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from '../../hook';
import {logout} from '../../redux/slices/userSlice';
import FastImage from 'react-native-fast-image';
import {productFilterReceived} from '../../redux/slices/productFilterSlice';
import {productSearchReceived} from '../../redux/slices/productSearchSlice';
import {favoritesReceived} from '../../redux/slices/favoriteSlice';
import {productReceived} from '../../redux/slices/productSlice';
import {productCartReviced} from '../../redux/slices/productCartSlice';
import {deliveryAddressReceived} from '../../redux/slices/deliveryAddressSlice';
import {setAddressChoseen} from '../../redux/slices/addressChoseenSlice';
import {selectDeliveryAddressReceived} from '../../redux/slices/addressSelectSlice';
import {ordersCompletedReceived} from '../../redux/slices/orderCompletedSlice';
import {ordersReceived} from '../../redux/slices/orderSlice';
import { updateCouponCart } from '../../redux/slices/couponCartSlice';

export type SideMenuStackList = {
  HomeMenu: undefined;
  MyOrders: undefined;
  MyProfile: undefined;
  PaymentMethods: undefined;
  ContactUs: undefined;
  Settings: undefined;
  HelpsFaqs: undefined;
};

const SideMenuDrawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.userSlice);

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View marginB-33 paddingT-44 paddingL-32>
        <View style={styles.avatarWrap} marginB-23>
          <FastImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={{
              uri: userState.avatar_url
                ? userState.avatar_url
                : 'https://secure.gravatar.com/avatar/c2b06ae950033b392998ada50767b50e?s=96&d=mm&r=g',
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text white textSemiBold style={styles.name} marginB-8>
          {userState.user_nicename}
        </Text>
        <Text gray2 style={styles.gmail}>
          {userState.user_email}
        </Text>
      </View>

      <DrawerItem
        label="Trang ch???"
        onPress={() => {
          props.navigation.navigate('Dashboard');
        }}
        icon={() => <Image assetName="home" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      />
      <DrawerItem
        label="????n h??ng c???a b???n"
        onPress={() => {
          props.navigation.navigate('MyOrders');
        }}
        icon={() => <Image assetName="order" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      />
      <DrawerItem
        label="Th??ng tin t??i kho???n"
        onPress={() => {
          props.navigation.navigate('MyProfile');
        }}
        icon={() => <Image assetName="profile" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      />
      <DrawerItem
        label="?????a ch??? giao h??ng"
        onPress={() => {
          props.navigation.navigate('DeliveryAddress');
        }}
        icon={() => <Image assetName="deliveryAddress" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      />
      {/* <DrawerItem
        label="Thanh to??n"
        onPress={() => {
          props.navigation.navigate('PaymentMethods');
        }}
        icon={() => <Image assetName="wallet" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      /> */}
      <DrawerItem
        label="Li??n h???"
        onPress={() => {
          props.navigation.navigate('ContactUs');
        }}
        icon={() => <Image assetName="message" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      />
      {/* <DrawerItem
        label="C??i ?????t"
        onPress={() => {
          props.navigation.navigate('Settings');
        }}
        icon={() => <Image assetName="settings" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      /> */}
      {/* <DrawerItem
        label="Gi??p ????? & H???i ????p"
        onPress={() => {
          props.navigation.navigate('HelpsFaqs');
        }}
        icon={() => <Image assetName="faq" assetGroup="icons" />}
        labelStyle={styles.label}
        style={styles.item}
      /> */}

      {/* <DrawerItemList {...props} /> */}

      <Button
        bg-primary
        marginT-20
        marginL-32
        style={styles.btnLogout}
        marginB-32
        onPress={() => {
          dispatch(
            productFilterReceived({
              productList: JSON.stringify([]),
            }),
          );
          dispatch(
            productSearchReceived({
              productList: JSON.stringify([]),
            }),
          );
          dispatch(
            favoritesReceived({
              productList: JSON.stringify([]),
            }),
          );
          dispatch(
            productReceived({
              productList: JSON.stringify([]),
            }),
          );
          dispatch(
            productCartReviced({
              productList: JSON.stringify([]),
            }),
          );
          dispatch(
            deliveryAddressReceived({
              deliveryAddressList: [],
            }),
          );
          dispatch(
            setAddressChoseen({
              id: '0',
            }),
          );
          dispatch(
            selectDeliveryAddressReceived({
              deliveryAddressList: [],
            }),
          );
          dispatch(
            ordersCompletedReceived({
              orderList: JSON.stringify([]),
            }),
          );
          dispatch(
            ordersReceived({
              orderList: JSON.stringify([]),
            }),
          );
          dispatch(
            updateCouponCart({
              code: '',
              desc: '',
              amount: 0,
            }),
          );
          dispatch(logout());
        }}>
        <Image assetName="logout" marginR-9 assetGroup="icons" />
        <Text white style={styles.textLogout} textRegular>
          ????ng xu???t
        </Text>
      </Button>
    </DrawerContentScrollView>
  );
}

const DashBoard = () => {
  return (
    <SideMenuDrawer.Navigator
      initialRouteName={'Home'}
      drawerContent={props => <CustomDrawerContent {...props} />}
      backBehavior={'history'}
      screenOptions={{
        headerRightContainerStyle: {
          paddingRight: 25,
        },
        headerLeftContainerStyle: {
          paddingLeft: 25,
        },
        headerTitleAlign: 'center',
        headerTransparent: true,
        drawerType: 'back',
        headerShown: false,
        drawerItemStyle: {
          marginHorizontal: 25,
        },
        drawerLabelStyle: {
          color: '#fff',
        },
      }}>
      <SideMenuDrawer.Screen
        name="Home"
        component={HomeMenu}
        options={{
          drawerIcon: () => <Image assetName="home" assetGroup="icons" />,
        }}
      />
      <SideMenuDrawer.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          drawerIcon: () => <Image assetName="order" assetGroup="icons" />,
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <Avatar />,
          headerTitle: '????n h??ng c???a b???n',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'SofiaPro-Medium',
            fontSize: 18,
          },
        }}
      />
      <SideMenuDrawer.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          drawerIcon: () => <Image assetName="profile" assetGroup="icons" />,
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => <HeaderBackButton />,
          headerTitle: '',
        }}
      />
      <SideMenuDrawer.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{
          drawerIcon: () => <Image assetName="wallet" assetGroup="icons" />,
        }}
      />
      <SideMenuDrawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          drawerIcon: () => <Image assetName="message" assetGroup="icons" />,
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => <HeaderBackButton />,
          headerTitle: 'G???i li??n h???',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <SideMenuDrawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => <Image assetName="settings" assetGroup="icons" />,
        }}
      />
      <SideMenuDrawer.Screen
        name="Helps&Faqs"
        component={HelpsFaqs}
        options={{
          drawerIcon: () => <Image assetName="faq" assetGroup="icons" />,
        }}
      />
    </SideMenuDrawer.Navigator>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: '#2D2D3A',
  },
  avatarWrap: {
    width: 85,
    height: 85,
    borderRadius: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    lineHeight: 20,
  },
  gmail: {
    fontSize: 12,
  },
  textLogout: {
    fontSize: 16,
  },
  btnLogout: {
    width: 140,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'SofiaPro',
  },
  item: {
    paddingLeft: 16,
  },
});
