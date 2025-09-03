import './src/app/i18n';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './src/app/theme';
import RootNavigator from './src/app/navigation/RootNavigator';
import { appStore, appStorePersistor } from './src/app/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { I18nGate } from './src/app/i18n/i18Gate';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';


function App() {


  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <PersistGate persistor={appStorePersistor}>
          <SafeAreaProvider>
            <I18nGate>
              <BottomSheetModalProvider>
                <RootNavigator />
              </BottomSheetModalProvider>
            </I18nGate>
          </SafeAreaProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
