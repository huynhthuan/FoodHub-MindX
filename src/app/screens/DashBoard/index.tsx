import React from 'react';
import {StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
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
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View marginB-33 paddingT-44>
        <View style={styles.avatarWrap} marginB-23>
          <Image assetName="avatar" assetGroup="images" style={styles.image} />
        </View>
        <Text white textSemiBold style={styles.name} marginB-8>
          Eljad Eendaz
        </Text>
        <Text gray2 style={styles.gmail}>
          prelookstudio@gmail.com
        </Text>
      </View>
      <DrawerItemList {...props} />

      <Button bg-primary marginT-20 style={styles.btnLogout} marginB-32>
        <Image assetName="logout" marginR-9 assetGroup="icons" />
        <Text white style={styles.textLogout} textRegular>
          Log Out
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
          marginLeft: 0,
        },
        drawerLabelStyle: {
          color: '#fff',
        },
        drawerActiveBackgroundColor: 'transparent',
        swipeEnabled: false,
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
          headerTitle: 'My Orders',
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
        name="Payment Methods"
        component={PaymentMethods}
        options={{
          drawerIcon: () => <Image assetName="wallet" assetGroup="icons" />,
        }}
      />
      <SideMenuDrawer.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          drawerIcon: () => <Image assetName="message" assetGroup="icons" />,
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
        name="Helps & Faqs"
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
    paddingLeft: 32,
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
    width: 117,
  },
});
