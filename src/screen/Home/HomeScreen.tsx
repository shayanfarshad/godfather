import React, {useEffect, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import {colors, spacing} from '../../theme';
import {showToast} from '../../utils/snackbar';
import {t} from 'i18next';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {gameActions} from '../../stores/slices';
import {hp, wp} from '../../constants/Constants';

const HomeScreen = () => {
  const nav = useNavigation();

  const dispatch = useAppDispatch();
  const language = useAppSelector(state => state.App.language, shallowEqual);
  const {roles, rolePlayers, players} = useAppSelector(
    state => state.Game,
    shallowEqual,
  );

  const Mafia = roles.filter(el => el.side === 'mafia');
  const Free = roles.filter(el => el.side === 'free');
  // const [playersWithOutRoles, setPlayersWithOutRoles] = useState(0);
  const [startDisable, setStartDisable] = useState(true);

  useEffect(() => {
    if (rolePlayers?.length) {
      if (rolePlayers[0]?.role?.title && players[0]?.name) {
        setStartDisable(false);
      }
    } else {
      setStartDisable(true);
    }
  }, [rolePlayers]);

  useEffect(() => {
    return () => {
      dispatch(gameActions.gameReset());
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text style={{fontSize: 30, color: colors.text}}>
          {t('game.godfather')}
        </Text>
      </View>
      <View style={styles.viewCard}>
        <ImageBackground
          source={require('../../assets/images/bg1.jpeg')}
          resizeMode="cover"
          imageStyle={{width: '100%'}}
          style={[
            styles.playersCard,
            {
              elevation: 3,
            },
          ]}>
          <View
            style={[
              styles.playersCard,
              {
                backgroundColor: colors.overlayBackground,
                elevation: 3,
                padding: 10,
                justifyContent: 'space-between',
                flexDirection: language === 'fa' ? 'row-reverse' : 'row',
              },
            ]}>
            <View
              style={[
                styles.rightContent,
                {
                  alignItems: language === 'fa' ? 'flex-end' : 'flex-start',
                },
              ]}>
              <Text style={{fontSize: hp(2.5), fontWeight: 'bold'}}>
                {t('game.players')}
              </Text>
              <Text style={{fontSize: hp(2), marginRight: 10, marginTop: 10}}>
                {players?.length} {t('game.player')}
              </Text>
            </View>
            <Pressable
              style={[
                styles.addBtn,
                {
                  backgroundColor: colors.cardBackground,
                },
              ]}
              onPress={() => {
                nav.navigate('addPlayers');
              }}>
              <Icon name="plus" size={20} color="white" />
            </Pressable>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.viewCard}>
        <ImageBackground
          source={require('../../assets/images/bg2.jpeg')}
          resizeMode="cover"
          imageStyle={{width: '100%'}}
          style={[styles.playersCard, {elevation: 3}]}>
          <View
            style={[
              styles.playersCard,
              {
                backgroundColor: colors.overlayBackground,
                elevation: 3,
                padding: 10,
                justifyContent: 'space-between',
                flexDirection: language === 'fa' ? 'row-reverse' : 'row',
              },
            ]}>
            <View
              style={[
                styles.rightContent,
                {
                  alignItems: language === 'fa' ? 'flex-end' : 'flex-start',
                },
              ]}>
              <Text style={{fontSize: hp(2.5), fontWeight: 'bold'}}>
                {t('game.roles')}
              </Text>
              <Text
                style={{fontSize: hp(2), marginRight: wp(2), marginTop: 10}}>
                {roles?.length} {t('game.role')}
              </Text>
            </View>
            <Pressable
              style={[
                styles.addBtn,
                {
                  backgroundColor: colors.cardBackground,
                },
              ]}
              onPress={() => nav.navigate('roles')}>
              <Icon name="plus" size={20} color="white" />
            </Pressable>
          </View>
        </ImageBackground>
      </View>
      <View style={[styles.viewCard, {height: language === 'fa' ? 150 : 180}]}>
        <ImageBackground
          source={require('../../assets/images/bg4.webp')}
          resizeMode="cover"
          imageStyle={{width: '100%'}}
          style={[
            styles.playersCard,
            {elevation: 3, height: language === 'fa' ? 150 : 180},
          ]}>
          <View
            style={[
              styles.playersCard,
              {
                backgroundColor: colors.overlayBackground,
                elevation: 3,
                padding: 10,
                height: '100%',
                justifyContent: 'space-between',
              },
            ]}>
            <View
              style={{
                width: '100%',
                height: '100%',
                flexDirection: language === 'fa' ? 'row-reverse' : 'row',
              }}>
              <View
                style={{
                  width: '75%',
                  height: '100%',
                  justifyContent: 'space-around',
                  alignItems: language === 'fa' ? 'flex-end' : 'flex-start',
                }}>
                <Text style={{fontSize: hp(2.5), fontWeight: 'bold'}}>
                  {t('game.chooseRoleForPlayers')}
                </Text>
                <View
                  style={{
                    flexDirection: language === 'fa' ? 'row-reverse' : 'row',
                    height: language === 'fa' ? hp(4) : hp(3),
                    width: '70%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: hp(2)}}>{t('game.citizen')} : </Text>
                  <View
                    style={[
                      styles.roleCounter,
                      {
                        backgroundColor: colors.cardBackground,
                      },
                    ]}>
                    <Text style={{fontSize: hp(1.6)}}>
                      {roles?.length - Mafia?.length - Free?.length}
                    </Text>
                  </View>
                  <Text style={{fontSize: hp(2)}}>{t('game.mafia')} :</Text>
                  <View
                    style={[
                      styles.roleCounter,
                      {
                        backgroundColor: colors.cardBackground,
                      },
                    ]}>
                    <Text style={{fontSize: hp(1.6)}}>{Mafia?.length}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: language === 'fa' ? 'row-reverse' : 'row',
                    height: language === 'fa' ? hp(3) : hp(4),
                  }}>
                  <Text style={{fontSize: hp(2)}}>{t('game.free')} : </Text>
                  <View
                    style={[
                      styles.roleCounter,
                      {
                        backgroundColor: colors.cardBackground,
                      },
                    ]}>
                    <Text style={{fontSize: hp(1.6)}}>{Free?.length}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '25%',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <Pressable
                  style={[
                    styles.addBtn,
                    {
                      backgroundColor: colors.cardBackground,
                    },
                  ]}
                  onPress={() => nav.navigate('roleup')}>
                  <Icon name="random" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: colors.modalBackground,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          // disabled={startDisable}
          onPress={() => {
            if (startDisable) {
              showToast({
                text: t('game.addPlayerAndRoleAndGiveRole'),
                mode: 'warning',
                duration: 3000,
              });
            } else {
              nav.navigate('showcards');
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20}}>{t('game.startGame')}</Text>
        </Pressable>
      </View>
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playersCard: {
    width: '100%',
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  rightContent: {
    width: '60%',
    height: '90%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  addBtn: {
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCard: {
    overflow: 'hidden',
    height: 110,
    borderRadius: 10,
  },
  roleCounter: {
    width: hp(3),
    height: hp(3),
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export {HomeScreen};
