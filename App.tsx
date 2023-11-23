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
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator, useNavigationPersistence} from './src/navigation';

import * as storage from './src/utils/storage';
import {changeLang} from './src/i18n';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';

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
  const {initialNavigationState, onNavigationStateChange} =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    const setLanguage = async () => {
      const language = await storage.load('language');
      changeLang(language as string);
    };
    setLanguage();
  }, []);
  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.

  const linking = {
    config,
  };

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
