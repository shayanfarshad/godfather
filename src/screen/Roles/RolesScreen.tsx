/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Text from '../../components/Text';
import {DHeight, DWidth, hp} from '../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing} from '../../theme';
import Header from '../../components/Header';
import {SceneMap, TabView} from 'react-native-tab-view';
import {JackRolesScreen} from './JackRolesScreen';
import {NustraRolesScreen} from './NustraRolesScreen';
import {Modal} from '../../components/Modal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {CustomRolesScreen} from './CustomRolesScreen';
import {t} from 'i18next';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {gameActions, rolesInfoActions} from '../../stores/slices';

const RolesScreen = () => {
  const language = useAppSelector(state => state.App.language);
  const checkRef = useRef<BottomSheetModal>(null);
  const nav = useNavigation();

  const dispatch = useAppDispatch();

  const Roles = useAppSelector(state => state.Roles.nustraRoles);
  const roles = useAppSelector(state => state.Game.roles, shallowEqual);
  const gameType = useAppSelector(state => state.Game.gameType, shallowEqual);
  //   const [roles, setRoles] = useState(playingRoles);

  const renderScene = SceneMap({
    jack: JackRolesScreen,
    nustra: NustraRolesScreen,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'jack', title: t('game.jackRoles')},
    {key: 'nustra', title: t('game.nustraRoles')},
  ]);
  useEffect(() => {
    if (gameType === 'jack') {
      setIndex(0);
    }
    if (gameType === 'nustra') {
      setIndex(1);
    }
  }, [gameType]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 10,
      }}>
      <Header
        title={t('game.addRoletoThisGame')}
        headerFontSize={hp(2)}
        // backIcon={isFarsi ? 'chevron-left' : 'chevron-right'}
        backPress={() => {
          nav.goBack();
        }}
      />
      {/* <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 22, color: 'white'}}>نقش های حاضر در بازی</Text>
      </View> */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        key={index}
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
                    onPress={() => {
                      if (roles.length) {
                        checkRef?.current?.present();
                      } else {
                        setIndex(i);
                      }
                    }}>
                    <Animated.Text
                      style={{
                        opacity,
                        color: colors.text,
                        fontSize: language === 'fa' ? spacing.lg : spacing.md,
                        // lineHeight: 32,
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
      <Modal
        modalRef={checkRef}
        index={0}
        onDismiss={() => {}}
        snapPoints={[DHeight * 0.6]}
        backgroundStyle={{backgroundColor: colors.modalBackground}}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text>{t('game.chooseRoleProblem')}</Text>
          <Text>{t('game.cardChoosingDescription')}</Text>
          <Text>{t('game.areYouAgree')}</Text>
          <View
            style={{
              flexDirection: 'row-reverse',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <Pressable
              onPress={() => {
                console.log('indexxxxxx', index);

                if (index == 0) {
                  setIndex(1);
                  dispatch(gameActions.gameReset());
                }
                if (index == 1) {
                  setIndex(0);
                  dispatch(gameActions.gameReset());
                }
                // addPlayer();
                // setIndex(prev => {
                //   if (prev === 1) {
                //     return 0;
                //   } else {
                //     return 1;
                //   }
                // });

                checkRef?.current?.close();
              }}
              style={[
                styles.modalBtn,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <Text>{t('common.ok')}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                checkRef?.current?.close();
              }}
              style={[
                styles.modalBtn,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <Text>{t('common.cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  flatContainer: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 80,
  },
  renderItem: {
    width: DWidth / 3.2,
    height: 200,
    marginBottom: 15,
    alignItems: 'center',
  },
  playerIcon: {
    width: 110,
    height: 140,
    borderRadius: 5,
    overflow: 'hidden',
  },
  addBtn: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
  },
  addBtnIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    marginLeft: '25%',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    justifyContent: 'center',
    width: '50%',
    height: 200,
  },
  modalView: {
    width: DWidth / 2,
    height: DHeight / 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  modalInput: {
    width: '90%',
    height: 50,
    borderWidth: 0.2,
    paddingHorizontal: 5,
    borderRadius: 4,
    textAlign: 'right',
    fontFamily: 'IRANSansXNoEn-Medium',
  },
  modalBtn: {
    width: '40%',
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {RolesScreen};
