import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {DHeight, DWidth, hp, wp} from '../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {colors} from '../../theme';
import {t} from 'i18next';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {gameActions, Player} from '../../stores/slices';
import RenderUserPlayers from './RenderUserPlayers';

const PlayerListScreen = () => {
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const [players, setPlayers] = useState<Player[]>([]);

  const myPlayers = useAppSelector(
    state => state.Players.players,
    shallowEqual,
  );
  const gamePlayers = useAppSelector(state => state.Game.players, shallowEqual);

  const selectPlayer = useCallback(
    (item: Player) => {
      console.log('selected', item);
      // const arr = [...players];
      const arr = [...gamePlayers];
      if (!arr?.includes(item)) {
        arr.push(item);
        dispatch(gameActions.addPlayer(item));
      } else {
        arr.filter(el => el.id !== item.id);
        dispatch(gameActions.removePlayer(item));
      }
      // const newList = arr.filter(el => el.id !== item.id);
      console.log({arr});
    },
    [dispatch, gamePlayers],
  );

  useEffect(() => {
    if (myPlayers?.length) {
      setPlayers(myPlayers);
    }
  }, [myPlayers]);

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <RenderUserPlayers
          gamers={gamePlayers}
          item={item}
          selectPlayer={selectPlayer}
        />
      );
    },
    [selectPlayer],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 20,
      }}>
      <Header
        backPress={() => nav.goBack()}
        title={t('game.addPlayerToThisGame')}
        headerFontSize={hp(2)}
      />

      <FlatList
        data={players}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{
          width: wp(96),
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}
        // contentContainerStyle={{justifyContent: 'space-around'}}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyList}>
              <Image
                source={require('../../assets/images/empty1.png')}
                style={{width: '50%', height: 200}}
              />
              <Text style={{fontSize: 20}}>{t('game.anyPlayerExist')}</Text>
            </View>
          );
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    marginBottom: 30,
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: DHeight * 0.7,
    // marginTop: 80,
  },
  playerIcon: {
    width: DWidth / 3,
    height: 105,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selected: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF80',
  },
});
export {PlayerListScreen};
