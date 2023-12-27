import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') || document.getElementById('app');
  AppRegistry.runApplication(appName, {rootTag});
} else {
  AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
}
