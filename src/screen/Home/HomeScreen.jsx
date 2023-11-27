import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../../constants/useStore';
import {observer} from 'mobx-react';
import {colors} from '../../theme';
import {translate} from '../../i18n';

const HomeScreen = observer(() => {
  const nav = useNavigation();
  const {playerStore, gameStore} = useStore();
  const players = playerStore.players;
  const playersWithOutRoles = playerStore.playersWithoutRole;
  const roles = gameStore.roles;
  const rolePlayers = gameStore.rolePlayers;
  // const [playersWithOutRoles, setPlayersWithOutRoles] = useState(0);
  const [startDisable, setStartDisable] = useState(true);

  useEffect(() => {
    if (rolePlayers.length) {
      console.log({rolePlayers});
      if (rolePlayers[0]?.role?.title && rolePlayers[0]?.player?.name) {
        setStartDisable(false);
      }
    } else {
      setStartDisable(true);
    }
  }, [rolePlayers]);

  useEffect(() => {
    return () => {
      playerStore.resetPlayers();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text type="bold" style={{fontSize: 30, color: 'white'}}>
            {translate('game.godfather')}
          </Text>
        </View>
        <View style={styles.viewCard}>
          <ImageBackground
            source={require('../../assets/images/bg1.jpeg')}
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
                },
              ]}>
              <View style={styles.rightContent}>
                <Text style={{fontSize: 25, lineHeight: 40}}>
                  {translate('game.players')}
                </Text>
                <Text style={{fontSize: 18, lineHeight: 40, marginRight: 10}}>
                  {players?.length} {translate('game.player')}
                </Text>
              </View>
              <Pressable
                style={[
                  styles.addBtn,
                  {
                    backgroundColor: colors.modalBackground,
                  },
                ]}
                onPress={() => {
                  nav.navigate('players');
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
                },
              ]}>
              <View style={styles.rightContent}>
                <Text style={{fontSize: 25, lineHeight: 40}}>
                  {translate('game.roles')}
                </Text>
                <Text style={{fontSize: 18, lineHeight: 40, marginRight: 10}}>
                  {roles.length} {translate('game.role')}
                </Text>
              </View>
              <Pressable
                style={[
                  styles.addBtn,
                  {
                    backgroundColor: colors.modalBackground,
                  },
                ]}
                onPress={() => nav.navigate('roles')}>
                <Icon name="plus" size={20} color="white" />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.viewCard}>
          <ImageBackground
            source={require('../../assets/images/bg4.webp')}
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
                },
              ]}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row-reverse',
                }}>
                <View
                  style={{
                    width: '70%',
                    height: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{fontSize: 20, lineHeight: 40}}>
                    {translate('game.chooseRoleForPlayers')}{' '}
                  </Text>
                  <View style={{flexDirection: 'row-reverse', height: 40}}>
                    <Text>{translate('game.citizen')} : </Text>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.cardBackground,
                        marginLeft: 10,
                      }}>
                      <Text>{roles.length}</Text>
                    </View>
                    <Text>{translate('game.mafia')} : </Text>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.modalBackground,
                        marginRight: 10,
                      }}>
                      <Text>{playersWithOutRoles}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Pressable
                    style={[
                      styles.addBtn,
                      {
                        backgroundColor: colors.modalBackground,
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
            disabled={startDisable}
            onPress={() => {
              console.log({startDisable});
              nav.navigate('showcards');
            }}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>{translate('game.startGame')}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  playersCard: {
    width: '100%',
    height: 120,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderRadius: 10,
  },
  rightContent: {
    width: '60%',
    height: '90%',
    flexDirection: 'row-reverse',
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
});

export {HomeScreen};
