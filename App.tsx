/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
// if (__DEV__) {
//   // Load Reactotron configuration in development. We don't want to
//   // include this in our production bundle, so we are using `if (__DEV__)`
//   // to only execute this in development.
//   require('./devtools/ReactotronConfig.ts');
// }
import './src/app/i18n';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from "./src/app/theme"
import RootNavigator from "./src/app/navigation/RootNavigator"
import { appStore, appStorePersistor } from './src/app/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';



/**
 * This is the root component of our app.
 */
function App() {
  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <PersistGate persistor={appStorePersistor}>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
