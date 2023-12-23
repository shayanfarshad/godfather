import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {DWidth} from '../../../constants/Constants';
import {useStore} from '../../../constants/useStore';

import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import {SceneMap, TabView} from 'react-native-tab-view';
import {JackRules} from './JackRules';
import {NustraRules} from './NustraRules';
import {isFarsi, translate} from '../../../i18n';
import {colors, spacing} from '../../../theme';

const GameRules = observer(() => {
  const {
    langStore: {language},
  } = useStore();
  const nav = useNavigation();
  const renderScene = SceneMap({
    jack: JackRules,
    nustra: NustraRules,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'jack', title: translate('game.jackSenario')},
    {key: 'nustra', title: translate('game.nustraSenario')},
  ]);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
      }}>
      <Header
        title={translate('bottomNavigator.learning')}
        // backIcon={language === 'fa' ? 'chevron-left' : 'chevron-right'}
        backPress={() => {
          nav.goBack();
        }}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => {
          const inputRange = props.navigationState.routes.map((x, i) => i);
          return (
            <View style={styles.tabBar}>
              {props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? 1 : 0.3,
                  ),
                });

                return (
                  <TouchableOpacity
                    style={styles.tabItem}
                    key={route.key}
                    onPress={() => setIndex(i)}>
                    <Animated.Text
                      style={{
                        opacity,
                        color: colors.text,
                        fontSize: language === 'fa' ? spacing.lg : spacing.md,
                        lineHeight: 32,
                        paddingHorizontal: Platform.OS === 'ios' ? 12 : 5,
                        paddingTop: Platform.OS === 'ios' ? 12 : 10,
                        fontFamily:
                          language === 'fa'
                            ? 'Digi Nofar Bold'
                            : 'Wizard World',
                      }}>
                      {route.title}
                    </Animated.Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 40,
  },
  renderItem: {
    width: DWidth * 0.9,
    // height: 80,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: 15, lineHeight: 28},
  tabBar: {
    flexDirection: 'row',
    // paddingTop: 50,
  },
  tabItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {GameRules};
