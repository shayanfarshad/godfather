/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Text from '../../components/Text';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {observer} from 'mobx-react';
import {useStore} from '../../constants/useStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing} from '../../theme';
import Header from '../../components/Header';
import {translate} from '../../i18n';
import {SceneMap, TabView} from 'react-native-tab-view';
import {JackRolesScreen} from './JackRolesScreen';
import {NustraRolesScreen} from './NustraRolesScreen';
import {Modal} from '../../components/Modal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const RolesScreen = observer(() => {
  const {
    roleStore,
    gameStore,
    langStore: {language},
  } = useStore();
  const checkRef = useRef<BottomSheetModal>(null);
  const nav = useNavigation();
  const Roles = roleStore.nustraRoles;
  const roles = gameStore.getRoles();
  // const playingRoles = gameStore.roles;
  const [gameRoles, setGameRoles] = useState([]);
  const [citizen, setCitizen] = useState(1);
  //   const [roles, setRoles] = useState(playingRoles);

  const renderScene = SceneMap({
    jack: JackRolesScreen,
    nustra: NustraRolesScreen,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'jack', title: translate('game.jackRoles')},
    {key: 'nustra', title: translate('game.nustraRoles')},
  ]);
  // useEffect(() => {
  //   setGameRoles(Roles);
  // }, [Roles]);

  // const addRole = item => {
  //   const existItem = roles.findIndex(el => el === item);
  //   if (existItem === -1) {
  //     gameStore.addRoles(item);
  //     const fakeRole = [...gameRoles];
  //     const selectedIndex = fakeRole.findIndex(el => el.id === item.id);
  //     fakeRole[selectedIndex].active = false;
  //     setGameRoles(fakeRole);
  //   } else {
  //     if (item.title === 'شهروند ساده') {
  //       const fakeRole = [...roles];
  //       return fakeRole?.map(el => {
  //         if (el.title === item.title) {
  //           const ind = fakeRole.filter(item => item.title !== 'شهروند ساده');
  //           const arr = [...Roles];
  //           arr.map(item => {
  //             if (item.title === 'شهروند ساده') item.active = true;
  //           });
  //           setGameRoles(arr);
  //           gameStore.updateRoles(ind);
  //         }
  //       });
  //     }
  //     gameStore.removeRoles(item);
  //     const fakeRole = [...gameRoles];
  //     const selectedIndex = fakeRole.findIndex(el => el.id === item.id);
  //     fakeRole[selectedIndex].active = true;
  //     setGameRoles(fakeRole);
  //   }
  // };
  const addCitizen = () => {
    const newCitizen = Roles[8];
    newCitizen.id = Date.now();
    newCitizen.active = false;
    setCitizen(citizen + 1);
    gameStore.addRoles(newCitizen);
  };

  const removeCitizen = () => {
    const lastIndex = roles.length - 1;
    setCitizen(citizen - 1);
    gameStore.roles.splice(lastIndex, 1);
  };

  // useEffect(() => {
  //   if (roles.length === 0) {
  //     const arr = [...Roles];
  //     arr.map(item => {
  //       item.active = true;
  //     });

  //     return setGameRoles(arr);
  //   }

  //   if (roles) {
  //     let len = 0;

  //     roles.map(item => {
  //       if (item?.title === 'شهروند ساده') {
  //         len += 1;
  //         setCitizen(len);
  //       }
  //     });
  //   }
  // }, [roles]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 10,
      }}>
      <Header
        title={translate('game.addRoletoThisGame')}
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
          <Text>{translate('game.chooseRoleProblem')}</Text>
          <Text>{translate('game.cardChoosingDescription')}</Text>
          <Text>{translate('game.areYouAgree')}</Text>
          <View
            style={{
              flexDirection: 'row-reverse',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <Pressable
              onPress={() => {
                // addPlayer();
                gameStore.gameReset();
                roleStore.resetRoles();
                if (index === 0) {
                  setIndex(1);
                } else {
                  setIndex(0);
                }
                checkRef?.current?.close();
              }}
              style={[
                styles.modalBtn,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <Text>{translate('common.ok')}</Text>
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
              <Text>{translate('common.cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
});

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
    // justifyContent: 'space-between',
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
    alignItems: 'center',
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
    // paddingTop: 50,
  },
  tabItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 16,
  },
});

export {RolesScreen};
