const WOO_KEY = 'ck_54376fbde8e8f69fbccdb4a5e26d070dd76ca340';
const WOO_SECRET = 'cs_73eb4c314948121a502f6f6e81a14ad949d77e47';
const BASE_URL = 'https://foodhub.fun/wp-json/';
const BASE_URL_JSON = 'https://foodhub.fun/api/';

const BASE_URL_WP_API = BASE_URL + 'wp/v2/';
const BASE_URL_WP_API_USER = BASE_URL_WP_API + 'users';

const BASE_URL_JWT_AUTH = BASE_URL + 'jwt-auth/';
const BASE_URL_JWT_AUTH_GET_TOKEN = BASE_URL_JWT_AUTH + 'v1/token';

const BASE_URL_ACF_API = BASE_URL + 'wp-json/acf/';
const BASE_URL_ACF_USER = BASE_URL_ACF_API + 'users/';

const BASE_URL_WP_JSON_SIGN_UP = BASE_URL_JSON + 'register/';
const BASE_URL_WP_JSON_GET_NONCE = BASE_URL_JSON + 'get_nonce/';

export {
  WOO_KEY,
  WOO_SECRET,
  BASE_URL,
  BASE_URL_JWT_AUTH,
  BASE_URL_JWT_AUTH_GET_TOKEN,
  BASE_URL_ACF_USER,
  BASE_URL_WP_JSON_SIGN_UP,
  BASE_URL_WP_JSON_GET_NONCE
};
