const WOO_KEY = 'ck_ff2bf955400ad095c2e7901ddc9a1751ad5afe5c';
const WOO_SECRET = 'cs_bfc89f7d34fe563d39834fcd3e30f6c7f738d062';
const BASE_URL = 'https://foodhub.fun/wp-json/';
const BASE_URL_JSON = 'https://foodhub.fun/api/';
const BASE_URL_RESET_PASS = 'https://foodhub.fun/wp-json/bdpwr/v1/';

const BASE_URL_WP_API = BASE_URL + 'wp/v2/';
const BASE_URL_WP_API_USER = BASE_URL_WP_API + 'users/';

const BASE_URL_JWT_AUTH = BASE_URL + 'jwt-auth/';
const BASE_URL_JWT_AUTH_GET_TOKEN = BASE_URL_JWT_AUTH + 'v1/token';

const BASE_URL_WP_JSON_USER = BASE_URL_JSON + 'user/';
const BASE_URL_WP_JSON_SIGN_UP = BASE_URL_WP_JSON_USER + 'register/';
const BASE_URL_WP_JSON_GET_NONCE = BASE_URL_JSON + 'get_nonce/';

const BASE_URL_WOOCOMMERCE = BASE_URL + 'wc/v3/';
const BASE_URL_WOOCOMMERCE_ORDER = BASE_URL_WOOCOMMERCE + 'orders/';

const BASE_URL_WP_MEDIA = BASE_URL_WP_API + 'media/';
const BASE_URL_WP_PRODUCT_CAT = BASE_URL_WP_API + 'product_cat/';

const BASE_URL_WP_POST = BASE_URL_WP_API + 'posts/';

const BASE_URL_RESETPASS_GET_CODE = BASE_URL_RESET_PASS + 'reset-password';
const BASE_URL_RESETPASS_SET_PASS = BASE_URL_RESET_PASS + 'set-password';

export {
  WOO_KEY,
  WOO_SECRET,
  BASE_URL,
  BASE_URL_JWT_AUTH,
  BASE_URL_JWT_AUTH_GET_TOKEN,
  BASE_URL_JSON,
  BASE_URL_WP_API_USER,
  BASE_URL_WP_API,
  BASE_URL_WP_JSON_SIGN_UP,
  BASE_URL_WP_JSON_GET_NONCE,
  BASE_URL_WOOCOMMERCE_ORDER,
  BASE_URL_WOOCOMMERCE,
  BASE_URL_WP_MEDIA,
  BASE_URL_WP_PRODUCT_CAT,
  BASE_URL_WP_POST,
  BASE_URL_RESET_PASS,
  BASE_URL_RESETPASS_GET_CODE,
  BASE_URL_RESETPASS_SET_PASS,
};
