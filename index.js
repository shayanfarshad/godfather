import 'react-native-gesture-handler';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';

enableExperimentalWebImplementation(true);
import {registerRootComponent} from 'expo';
// import {AppRegistry} from 'react-native';
// import {name as appName} from './app.json';
import App from './App';
// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

// AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

registerRootComponent(App);