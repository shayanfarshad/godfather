import React, {useEffect, useState} from 'react';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {
  Alert,
  Animated,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors, spacing} from '../theme';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import {LearningScreen} from '../screen/Rules/LearningScreen';
import I from 'react-native-vector-icons/FontAwesome5';
import SettingScreen from '../screen/Settings/SettingScreen';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import Text from '../components/Text';
import {AddCustomRoles} from '../screen/custom/AddCustomRoles';
import {AllPlayers} from '../screen/Players/AllPlayers';
import {t} from 'i18next';
import {useAppSelector} from '../stores/hooks';
import {shallowEqual} from 'react-redux';
import i18n from '../i18n/i18n';
import { hp } from '../constants/Constants';
// import { useStores } from "app/models"

export type TabParamList = {
  custom: undefined;
  learning: undefined;
  playGame: undefined;
  myPlayers: undefined;
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

export const BottomNavigator = () => {
  const {language, theme} = useAppSelector(state => state.App, shallowEqual);
  const nav = useNavigation();

  const [fontFamily, setFontFamily] = useState<string>();

  useEffect(() => {
    if (language === 'en') {
      setFontFamily('Wizard World');
    } else {
      setFontFamily('Digi Nofar Bold');
    }
  }, [language, i18n]);

  const _renderIcon = (routeName: any, selectedTab: any) => {
    let icon = '';
    let title = '';

    switch (routeName) {
      case 'custom':
        icon = 'mask';
        title = t('bottomNavigator.custom');
        break;
      case 'settings':
        icon = 'cog';
        title = t('bottomNavigator.settings');
        break;
      case 'myPlayers':
        icon = 'users';
        title = t('bottomNavigator.players');
        break;
      case 'learning':
        icon = 'leanpub';
        title = t('bottomNavigator.learning');
        break;
    }

    return (
      <>
        <I
          name={icon}
          size={20}
          color={
            routeName === selectedTab
              ? colors.bottomActiveTint
              : colors.bottomInactiveTint
          }
          style={{}}
        />
        <Text numberOfLines={1} style={{fontSize: 12}}>
          {title}
        </Text>
      </>
    );
  };

  const renderTabBar = ({routeName, selectedTab}: any) => {
    return (
      <TouchableOpacity
        onPress={() => nav.navigate(routeName as never)}
        style={[styles.tabbarItem]}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={[styles.bottomBar, {}]}
      shadowStyle={styles.shawdow}
      height={90}
      circleWidth={60}
      
      bgColor={
        theme === 'dark'
          ? colors.palette.primary100
          : colors.palette.secondary300
      }
      initialRouteName="custom"
      // borderTopLeftRight
      renderCircle={({selectedTab, navigate}) => (
        <Animated.View
          style={[
            styles.btnCircleUp,
            {
              backgroundColor: colors.bottomCenterColor,
            },
          ]}>
          <TouchableOpacity
            style={[styles.button, {}]}
            onPress={() => nav.navigate('home' as never)}>
            <I name="theater-masks" color="white" size={25} />
            <Text
              numberOfLines={1}
              type="iran"
              style={{fontSize: 8, color: 'white'}}>
              {t('bottomNavigator.playGame')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      screenOptions={{headerShown: false}}
      tabBar={renderTabBar}>
      <CurvedBottomBarExpo.Screen
        name="learning"
        position="LEFT"
        component={() => <LearningScreen />}
      />
      <CurvedBottomBarExpo.Screen
        name="custom"
        component={() => <AddCustomRoles />}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name="myPlayers"
        component={() => <AllPlayers />}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="settings"
        component={() => <SettingScreen />}
        position="RIGHT"
      />
    </CurvedBottomBarExpo.Navigator>
  );
};

const styles = StyleSheet.create({
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    height: hp(10),
  },
  btnCircleUp: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
