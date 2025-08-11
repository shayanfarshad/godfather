import React, {useEffect, useRef} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {AddPlayers} from '../screen/Players/AddPlayers';
import {RolesScreen} from '../screen/Roles/RolesScreen';
import {PlayerListScreen} from '../screen/Players/PlayerListScreen';
import {RoleUpScreen} from '../screen/Roles/RoleUpScreen';
import {ShowCards} from '../screen/Game/ShowCards';
import {GamePlay} from '../screen/Game/GamePlay';
import {GameNightPlay} from '../screen/Game/GameNightPlay';
import {LearningScreen} from '../screen/Rules/LearningScreen';
import {RoleLearning} from '../screen/Rules/cards/RoleLearning';
import {GameRules} from '../screen/Rules/gameRules/GameRules';
import {Appearance, ColorSchemeName, useColorScheme} from 'react-native';
import {colors, setColorMode} from '../theme';
import {useBackButtonHandler} from './navigationUtilities';
import Config from '../config';
import {BottomNavigator, TabParamList} from './BottomNavigator';
import {HomeScreen} from '../screen/Home/HomeScreen';
import {LastMoves} from '../screen/Rules/lastmove/LastMoves';
import NavigationWrapper from './navigationWrapper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import i18n from '../i18n/i18n';
import {useAppSelector} from '../stores/hooks';
import {shallowEqual} from 'react-redux';

export type AppStackParamList = {
  splash: undefined;
  RPM: NavigatorScreenParams<TabParamList>;
  main: undefined;
  home: undefined;
  learn: undefined;
  addPlayers: undefined;
  playerListScreen: undefined;
  allplayers: undefined;
  roles: undefined;
  roleCards: undefined;
  lastMoves: undefined;
  rules: undefined;
  roleup: undefined;
  showcards: undefined;
  gameplay: undefined;
  gamenight: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = ({colorScheme}: {colorScheme: string}) => (
  <Stack.Navigator
    initialRouteName="RPM"
    screenOptions={{
      headerShown: false,
      // navigationBarColor:
      //   colorScheme === 'light'
      //     ? colors.palette.secondary100
      //     : colors.palette.primary200,
      navigationBarHidden: false,
    }}>
    <Stack.Screen name="RPM" component={BottomNavigator} />
    <Stack.Screen
      name="learn"
      component={LearningScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="addPlayers"
      component={AddPlayers}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="playerListScreen"
      component={PlayerListScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="roles"
      component={RolesScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="roleCards"
      component={RoleLearning}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="lastMoves"
      component={LastMoves}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="rules"
      component={GameRules}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="roleup"
      component={RoleUpScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="showcards"
      component={ShowCards}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="gameplay"
      component={GamePlay}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="gamenight"
      component={GameNightPlay}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const colorScheme = useColorScheme() === 'dark';
  const exitRoutes = Config.exitRoutes;
  useBackButtonHandler(routeName => exitRoutes.includes(routeName));
  const navigationRef = useRef<NavigationContainerRef<AppStackParamList>>(null);

  const {theme, language} = useAppSelector(state => state.App, shallowEqual);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    if (theme) {
      console.log({theme});
      Appearance.setColorScheme(theme as ColorSchemeName);
      setColorMode(theme);
    }
  }, [language, theme]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme ? DarkTheme : DefaultTheme}>
      <BottomSheetModalProvider>
        <NavigationWrapper>
          <AppStack colorScheme={theme} />
        </NavigationWrapper>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};
