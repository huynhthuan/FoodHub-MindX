/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/app/assets/assets';
import './src/app/style/colors';
import './src/app/style/typo';

AppRegistry.registerComponent(appName, () => App);
