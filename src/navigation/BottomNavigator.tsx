import React, {useEffect, useState} from 'react';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  Route,
  useNavigation,
} from '@react-navigation/native';
import {
  Alert,
  Animated,
  AppState,
  I18nManager,
  Platform,
  Pressable,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import {observer} from 'mobx-react-lite';
import {translate} from '../i18n';
import {HomeScreen} from '../screen/Home/HomeScreen';
import {LearningScreen} from '../screen/Rules/LearningScreen';
import {ProfileScreen} from '../screen/Profile/ProfileScreen';
import {Icon} from '../components/Icon';
import I from 'react-native-vector-icons/FontAwesome5';
import {useStore} from '../constants/useStore';
import {AllPlayers} from '../screen/Players/AllPlayers';
import SettingScreen from '../screen/Settings/SettingScreen';
import I18n from 'i18n-js';
import * as storage from '../utils/storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/Header';
import {navigate} from './navigationUtilities';
import Svg, {Path} from 'react-native-svg';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import {PlayersScreen} from '../screen/Players/playersScreen';
import {RolesScreen} from '../screen/Roles/RolesScreen';
import Text from '../components/Text';
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

export const BottomNavigator = observer(function BottomNavigator() {
  const {bottom} = useSafeAreaInsets();
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    themeStore: {isDark},
    langStore: {language},
  } = useStore();
  const nav = useNavigation();
  const colorScheme = useColorScheme() === 'dark';

  const [fontFamily, setFontFamily] = useState<string>();
  const getLang = async () => {
    await storage.load('language').then(res => {
      if (res === 'en-US') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
    });
  };

  // useEffect(() => {
  //   console.log({language});
  // }, [language]);

  useEffect(() => {
    getLang();
    if (language === 'en') {
      setFontFamily('Wizard World');
    } else {
      setFontFamily('Digi Nofar Bold');
    }
  }, []);
  const _renderIcon = (routeName: any, selectedTab: any) => {
    let icon = '';
    let title = '';

    switch (routeName) {
      case 'custom':
        icon = 'mask';
        title = translate('bottomNavigator.custom');
        break;
      case 'settings':
        icon = 'cog';
        title = translate('bottomNavigator.settings');
        break;
      case 'myPlayers':
        icon = 'users';
        title = translate('bottomNavigator.players');
        break;
      case 'learning':
        icon = 'leanpub';
        title = translate('bottomNavigator.learning');
        break;
    }

    return (
      <>
        <I
          name={icon}
          size={20}
          color={routeName === selectedTab ? colors.bottomActiveTint : colors.bottomInactiveTint}
          style={{}}
        />
        <Text style={{fontSize: 12}}>{title}</Text>
      </>
    );
  };

  const renderTabBar = ({routeName, selectedTab}) => {
    return (
      <TouchableOpacity
        onPress={() => nav.navigate(routeName as never)}
        style={[styles.tabbarItem]}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    // <CurvedBottomBarExpo.Navigator
    //   type="DOWN"
    //   style={[styles.bottomBar,{}]}
    //   shadowStyle={styles.shawdow}
    //   height={70}
    //   circleWidth={60}
    //   bgColor= {colors.bottomTabBarBackground}
    //   initialRouteName="custom"
    //   borderTopLeftRight
    //   renderCircle={({selectedTab, navigate}) => (
    //     <Animated.View
    //       style={[
    //         styles.btnCircleUp,
    //         {
    //           backgroundColor: colors.bottomCenterColor,
    //         },
    //       ]}>
    //       <TouchableOpacity
    //         style={[styles.button,{}]}
    //         onPress={() => nav.navigate('home')}>
    //         <I name="theater-masks" color="white" size={25} />
    //         <Text type='iran' style={{fontSize: 8, color: 'white'}}>
    //           {translate('bottomNavigator.playGame')}
    //         </Text>
    //       </TouchableOpacity>
    //     </Animated.View>
    //   )}
    //   screenOptions={{headerShown: false}}
    //   tabBar={renderTabBar}>
    //   <CurvedBottomBarExpo.Screen
    //     name="learning"
    //     position="LEFT"
    //     component={() => <LearningScreen />}
    //   />
    //   <CurvedBottomBarExpo.Screen
    //     name="custom"
    //     component={() => <SettingScreen />}
    //     position="RIGHT"
    //   />
    //   <CurvedBottomBarExpo.Screen
    //     name="myPlayers"
    //     component={() => <AllPlayers />}
    //     position="LEFT"
    //   />
    //   <CurvedBottomBarExpo.Screen
    //     name="settings"
    //     component={() => <SettingScreen />}
    //     position="RIGHT"
    //   />
    // </CurvedBottomBarExpo.Navigator>
    <Tab.Navigator
      initialRouteName="myPlayers"
      backBehavior="initialRoute"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarStyle: [$tabBar(colors), {height: bottom + 65}],
        tabBarActiveTintColor: colorScheme
          ? colors.bottomActiveTint
          : colors.bottomActiveTint,
        tabBarInactiveTintColor: colors.bottomInactiveTint,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}>
      <Tab.Screen
        name="learning"
        component={LearningScreen}
        options={{
          tabBarLabel: `  ${translate('bottomNavigator.learning')}  `,
          tabBarLabelStyle: {
            fontFamily: fontFamily,
            fontSize: language === 'fa' ? 16 : 12,

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
        name="custom"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate('bottomNavigator.custom'),
          tabBarLabelStyle: {
            fontFamily: fontFamily,
            fontSize: language === 'fa' ? 16 : 12,
            lineHeight: 32,
          },

          // tabBarButton: props => <Pressable aria-disabled />,
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
        name="playGame"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerBackgroundContainerStyle: {backgroundColor: colors.background},
          headerStyle: {backgroundColor: colors.background},
          headerRightContainerStyle: {display: 'none'},
          headerTitleContainerStyle: {display: 'none'},
          headerTransparent: true,
          headerLeft: () => (
            <View
              style={{
                width: 50,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  nav.reset({
                    index: 0,
                    routes: [{name: 'RPM' as never}],
                  });
                }}>
                <Icon
                  name={language === 'fa' ? 'chevron-left' : 'chevron-right'}
                  size={25}
                  style={{}}
                  color={colors.text}
                />
              </Pressable>
            </View>
          ),
          // tabBarAccessibilityLabel: translate("bottomNavigator.browseTab"),
          tabBarLabel: '',
          tabBarStyle: {display: 'none'},
           // translate("bottomNavigator.thirdTab"),
           tabBarIcon: ({ color, size }) => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </Svg>
          ),
          // tabBarIcon: () => (
          //   <Icon
          //     name="gamepad"
          //     color={colors.palette.neutral100}
          //     size={50}
          //     style={{
          //       backgroundColor: colors.bottomCenterColor,
          //       borderRadius: 35,
          //       display: 'flex',
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       overflow: 'hidden',
          //       height: 70,
          //       width: 70,
          //       padding: '8%',
          //     }}
          //     // containerStyle={$container(colors)}
          //   />
          // ),
        }}
      />

      <Tab.Screen
        name="myPlayers"
        component={AllPlayers}
        options={{
          tabBarLabel: translate('bottomNavigator.players'),
          tabBarLabelStyle: {
            fontFamily: fontFamily,
            fontSize: language === 'fa' ? 16 : 12,
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
            fontSize: language === 'fa' ? 16 : 12,
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
  bottomBar: {},
  btnCircleUp: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
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
