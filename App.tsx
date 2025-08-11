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
import './src/i18n';
import './src/utils/ignoreWarnings';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {setColorMode} from './src/theme';
import {ToastProvider} from 'react-native-toast-notifications';
import {useAppSelector} from './src/stores/hooks';
import {shallowEqual} from 'react-redux';
import i18n from './src/i18n/i18n';
import {AppNavigator} from './src/navigation/AppNavigator';
import {appStore, appStorePersistor} from './src/stores/store';
export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

const config = {
  screens: {
    main: 'main',
  },
};

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={appStorePersistor}>
        <SafeAreaProvider>
          <ToastProvider>
            <AppNavigator />
          </ToastProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
