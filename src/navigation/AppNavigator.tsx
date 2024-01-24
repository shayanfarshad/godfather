import React, {ReactNode, useEffect, useState} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {PlayersScreen} from '../screen/Players/playersScreen';
import {RolesScreen} from '../screen/Roles/RolesScreen';
import {PlayerListScreen} from '../screen/Players/PlayerListScreen';
import {RoleUpScreen} from '../screen/Roles/RoleUpScreen';
import {GamePlay} from '../screen/Game/GamePlay';
import {GameNightPlay} from '../screen/Game/GameNightPlay';
import {MainScreen} from '../screen/Home/MainScreen';
import {AllPlayers} from '../screen/Players/AllPlayers';
import {LearningScreen} from '../screen/Rules/LearningScreen';
import {RoleLearning} from '../screen/Rules/cards/RoleLearning';
import {GameRules} from '../screen/Rules/gameRules/GameRules';
import {Appearance, ColorSchemeName, useColorScheme} from 'react-native';
import {useStore} from '../constants/useStore';
import {observer} from 'mobx-react';
import {colors} from '../theme';
import {navigationRef, useBackButtonHandler} from './navigationUtilities';
import Config from '../config';
import {BottomNavigator, TabParamList} from './BottomNavigator';
import {HomeScreen} from '../screen/Home/HomeScreen';
import * as storage from '../utils/storage';
import {LastMoves} from '../screen/Rules/lastmove/LastMoves';
import BootSplash from 'react-native-bootsplash';
import NavigationWrapper from './navigationWrapper';
import {ShowCards} from '../screen/Game/showCards';

// import {SafeAreaView} from 'react-native-safe-area-context';
export type AppStackParamList = {
  // 🔥 Your screens go here
  splash: undefined;
  RPM: NavigatorScreenParams<TabParamList>;
  main: undefined;
  home: undefined;
  learn: undefined;
  players: undefined;
  playerList: undefined;
  allplayers: undefined;
  roles: undefined;
  roleCards: undefined;
  lastMoves: undefined;
  rules: undefined;
  roleup: undefined;
  showcards: undefined;
  gameplay: undefined;
  gamenight: undefined;

  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
};
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

// This adds types for useNavigation
// https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc
// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends AppStackParamList {}
//   }
// }
// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();
// const defaultAuthState = {
//   hasLoggedInOnce: false,
//   accessToken: "",
//   refreshToken: "",
// }
export type StackNavigation = NativeStackNavigationProp<AppStackParamList>;

const AppStack = observer(function AppStack() {
  const {
    themeStore: {isDark},
  } = useStore();
  const navigation = useNavigation<StackNavigation>();
  const colorScheme = useColorScheme() === 'dark';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialRoute, setInitialRoute] = useState('main');
  return (
    <Stack.Navigator
      initialRouteName="RPM"
      screenOptions={{
        headerShown: false,
        navigationBarColor: colorScheme ? colors.background : colors.background,
      }}>
      {/* <Stack.Screen name="splash" component={SplashScreen} /> */}
      <Stack.Screen name="RPM" component={BottomNavigator} />
      <Stack.Screen
        name="main"
        component={MainScreen}
        options={{headerShown: false}}
      />
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
        name="allplayers"
        component={AllPlayers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="players"
        component={PlayersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="playerList"
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
});

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps,
) {
  const {
    themeStore: {setTheme, isDark},
  } = useStore();
  const colorScheme = useColorScheme() === 'dark';
  useBackButtonHandler(routeName => exitRoutes.includes(routeName));
  const getAppTheme = async () => {
    await storage.load('theme').then(res => {
      if (res) {
        Appearance.setColorScheme(res as ColorSchemeName);
        setTheme('dark' === res);
      }
    });
  };
  useEffect(() => {
    getAppTheme();
  }, [isDark]);
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme ? DarkTheme : DefaultTheme}
      onReady={() => {
        BootSplash.hide();
      }}
      {...props}>
      <NavigationWrapper>
        <AppStack />
      </NavigationWrapper>
    </NavigationContainer>
  );
});

// export default App;
