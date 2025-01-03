/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (__DEV__) {
  LogBox.ignoreLogs([
    'recommended to use at least version 0.44 of React Native with the plugin [Component Stack]',
    'react-native-snap-carousel',
    'Failed prop type: PaginationDot: prop type',
    'react-native-snap-carousel: It is recommended to use at least version 0.44 of React Native with the plugin',
  ]);
}
AppRegistry.registerComponent(appName, () => App);
