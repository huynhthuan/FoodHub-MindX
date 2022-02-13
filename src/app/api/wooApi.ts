import {WOO_KEY, WOO_SECRET} from './constants';
// @ts-ignore
import WooCommerceAPI from 'react-native-woocommerce-api';

const WooApi: WooCommerceAPI = new WooCommerceAPI({
  url: 'https://foodhub.fun/', // Your store URL
  ssl: true,
  consumerKey: WOO_KEY, // Your consumer secret
  consumerSecret: WOO_SECRET, // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true,
});

export default WooApi;
