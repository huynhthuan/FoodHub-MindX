const WOO_KEY = 'ck_54376fbde8e8f69fbccdb4a5e26d070dd76ca340';
const WOO_SECRET = 'cs_73eb4c314948121a502f6f6e81a14ad949d77e47';
const BASE_URL_WARDS_DATA =
  'https://foodhub.fun/wp-content/themes/poco-child/officeData/';
const BASE_URL = 'https://foodhub.fun/wp-json/';
const BASE_URL_JSON = 'https://foodhub.fun/api/';

const BASE_URL_WP_API = BASE_URL + 'wp/v2/';
const BASE_URL_WP_API_USER = BASE_URL_WP_API + 'users/';

const BASE_URL_JWT_AUTH = BASE_URL + 'jwt-auth/';
const BASE_URL_JWT_AUTH_GET_TOKEN = BASE_URL_JWT_AUTH + 'v1/token';

const BASE_URL_WP_JSON_USER = BASE_URL_JSON + 'user/';
const BASE_URL_WP_JSON_SIGN_UP = BASE_URL_WP_JSON_USER + 'register/';
const BASE_URL_WP_JSON_GET_NONCE = BASE_URL_JSON + 'get_nonce/';

const BASE_URL_WOOCOMMERCE = BASE_URL + '/wc/v3/';
const BASE_URL_WOOCOMMERCE_ORDER = BASE_URL_WOOCOMMERCE + 'orders/';

const BASE_URL_WP_MEDIA = BASE_URL_WP_API + 'media/';
const BASE_URL_WP_PRODUCT_CAT = BASE_URL_WP_API + 'product_cat/';

const BASE_URL_WP_POST = BASE_URL_WP_API + 'posts/'

export {
  WOO_KEY,
  WOO_SECRET,
  BASE_URL,
  BASE_URL_JWT_AUTH,
  BASE_URL_JWT_AUTH_GET_TOKEN,
  BASE_URL_WP_API_USER,
  BASE_URL_WP_JSON_SIGN_UP,
  BASE_URL_WP_JSON_GET_NONCE,
  BASE_URL_WARDS_DATA,
  BASE_URL_WOOCOMMERCE_ORDER,
  BASE_URL_WP_MEDIA,
  BASE_URL_WP_PRODUCT_CAT,
  BASE_URL_WP_POST
};
