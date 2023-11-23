import React, {useEffect, useState} from 'react';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {I18nManager, TextStyle, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import {observer} from 'mobx-react-lite';
import {translate} from '../i18n';
import {HomeScreen} from '../screen/Home/HomeScreen';
import {LearningScreen} from '../screen/Rules/LearningScreen';
import {ProfileScreen} from '../screen/Profile/ProfileScreen';
import {Icon} from '../components/Icon';
import {useStore} from '../constants/useStore';
import {AllPlayers} from '../screen/Players/AllPlayers';
import SettingScreen from '../screen/Settings/SettingScreen';
import I18n from 'i18n-js';
import * as storage from '../utils/storage';

// import { useStores } from "app/models"

export type TabParamList = {
  profile: undefined;
  learning: undefined;
  playGame: undefined;
  players: undefined;
  settings: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type RPMBottomTabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomNavigator = observer(function BottomNavigator() {
  const {bottom} = useSafeAreaInsets();
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    themeStore: {isDark},
  } = useStore();
  const [fontFamily, setFontFamily] = useState('Nofar');
  const getLang = async () => {
    await storage.load('language').then(res => {
      console.log({resBottom: res});
      if (res === 'en-US') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
    });
  };

  useEffect(() => {
    getLang();
    if (I18n.locale === 'en-US') {
      setFontFamily('Wizard World');
    } else {
      setFontFamily('Digi Nofar Bold');
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar(colors), {height: bottom + 65}],
        tabBarActiveTintColor: colors.bottomActiveTint,
        tabBarInactiveTintColor: colors.bottomInactiveTint,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}>
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate('bottomNavigator.profile'),
          tabBarLabelStyle: {
            fontFamily: fontFamily,
            fontSize: 16,
            lineHeight: 32,
          },

          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              color={
                focused ? colors.bottomActiveTint : colors.bottomInactiveTint
              }
              size={16}
              style={undefined}
            />
          ),
        }}
      />
      <Tab.Screen
        name="learning"
        component={LearningScreen}
        options={{
          tabBarLabel: translate('bottomNavigator.learning'),
          tabBarLabelStyle: {
            fontFamily: fontFamily,
            fontSize: 16,
            lineHeight: 32,
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="leanpub"
              // color={focused ? colors.tint : colors.text}
              color={
                focused ? colors.bottomActiveTint : colors.bottomInactiveTint
              }
              size={16}
              style={undefined}
            />
          ),
        }}
      />

      <Tab.Screen
        name="playGame"
        component={HomeScreen}
        options={{
          // tabBarAccessibilityLabel: translate("bottomNavigator.browseTab"),
          tabBarLabel: '', // translate("bottomNavigator.thirdTab"),
          tabBarIcon: () => (
            <Icon
              name="gamepad"
              color={colors.palette.neutral100}
              size={50}
              style={{
                backgroundColor: colors.bottomCenterColor,
                borderRadius: 35,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                height: 70,
                width: 70,
                padding: '8%',
              }}
              // containerStyle={$container(colors)}
            />
          ),
        }}
      />

      <Tab.Screen
        name="players"
        component={AllPlayers}
        options={{
          tabBarLabel: translate('bottomNavigator.players'),
          tabBarLabelStyle: {
            fontFamily: fontFamily,
            fontSize: 16,
            lineHeight: 32,
          },

          tabBarIcon: ({focused}) => (
            <Icon
              name="users"
              color={
                focused ? colors.bottomActiveTint : colors.bottomInactiveTint
              }
              size={16}
              style={undefined}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingScreen}
        options={{
          tabBarLabel: translate('bottomNavigator.settings'),
          tabBarLabelStyle: {
            fontFamily: fontFamily,
            fontSize: 16,
            lineHeight: 32,
          },

          tabBarIcon: ({focused}) => (
            <Icon
              name="cog"
              color={
                focused ? colors.bottomActiveTint : colors.bottomInactiveTint
              }
              size={16}
              style={undefined}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

const $tabBar = (colors: any): ViewStyle => ({
  backgroundColor: colors.bottomTabBarBackground,
  borderTopColor: colors.transparent,
});

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
};

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
  flex: 1,
};

const $container = (colors: any): ViewStyle => ({
  borderRadius: 10,
  backgroundColor: colors.tint,
  bottom: 10,
  padding: 10,
});
// const $midleIconStyle: ImageStyle = {
//   resizeMode: 'contain',
// };
