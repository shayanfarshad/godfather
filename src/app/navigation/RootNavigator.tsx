import { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { useAppDispatch, useAppSelector } from '../store';
import { useTheme } from '../theme';
import {
  bootstrapAuth
} from '../store/slices';
import Splash from '../screens/Splash';



const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, bootstrapped } = useAppSelector(s => s.Auth);
  const { name: themeName, colors } = useTheme();
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  // رنگ‌های NavigationContainer را از تم خودت بگیر
  const navTheme = themeName === 'dark'
    ? {
      ...DarkTheme,
      colors: { ...DarkTheme.colors, background: colors.bg, card: colors.surface, text: colors.text, border: colors.border, primary: colors.primary }
    }
    : {
      ...DefaultTheme,
      colors: { ...DefaultTheme.colors, background: colors.bg, card: colors.surface, text: colors.text, border: colors.border, primary: colors.primary }
    };

  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Splash" component={Splash} />

        {/* {!bootstrapped ? (
          <RootStack.Screen name="Splash" component={Splash} />
        ) : user ? (
          <RootStack.Screen name="AppStack" component={AppStack} />
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthStack} />
        )} */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
