// src/app/navigation/RootNavigator.tsx
import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';
import { useAppDispatch, useAppSelector } from '../store';
import { useTheme } from '../theme';
import { bootstrapAuth } from '../store/slices';

import Splash from '../screens/Splash';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const { user, bootstrapped } = useAppSelector(s => s.Auth);
  const { name: themeName, colors } = useTheme();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  // Navigation theme from app theme
  const navTheme = themeName === 'dark'
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.bg,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          primary: colors.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.bg,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          primary: colors.primary,
        },
      };

  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!bootstrapped ? (
          <RootStack.Screen name="Splash" component={Splash} />
        ) : user ? (
          <RootStack.Screen name="AppStack" component={AppStack} />
        ) : (
          <RootStack.Screen name="AuthStack" component={AppStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
