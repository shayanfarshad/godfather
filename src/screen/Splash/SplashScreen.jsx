import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import * as storage from '../../utils/storage';
import {useStore} from '../../constants/useStore';
import {setColorMode} from '../../theme';
import I18n from 'i18n-js';

const SplashScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const {themeStore, langStore} = useStore();

  // Simulating some asynchronous tasks
  const simulateTasks = async () => {
    // Simulate fetching data or any other background tasks
    await new Promise(resolve =>
      setTimeout(() => {
        storage.load('theme').then(res => {
          console.log({resOfTheme: res});
          themeStore.setTheme(res === 'dark' ? true : false);
          setColorMode(res === 'dark' ? true : false);
          resolve(res);
        });
      }, 2000),
    );
    // Update progress
    setProgress(0.5);

    // Simulate additional tasks
    await new Promise(resolve =>
      setTimeout(() => {
        storage.load('language').then(res => {
          console.log({resOfLang: res});
          I18n.locale = res;
          langStore.changeLanguage(res === 'en-IR' ? 'fa' : 'en');
          resolve(res);
        });
      }, 2000),
    );

    // Update progress
    setProgress(1);
  };

  // Function to navigate to the main screen after splash completion
  const navigateToMainScreen = () => {
    navigation.replace('RPM'); // Replace with your actual main screen route
  };

  useEffect(() => {
    // Start the simulation when the component mounts
    simulateTasks().then(() => {
      // When tasks are complete, navigate to the main screen
      navigateToMainScreen();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      {Platform.OS === 'android' ? (
        <View>
          <Text>dar hale loading</Text>
        </View>
      ) : (
        // <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress} />
        <View>
          <Text>dar hale loading</Text>
        </View>

        // <ProgressViewIOS progress={progress} />
      )}
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  progressText: {
    marginTop: 10,
  },
});

export default SplashScreen;
