import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {DWidth} from '../../constants/Constants';
import {t} from 'i18next';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {gameActions, Player, Role} from '../../stores/slices';

const Sitout = () => {
  // const {gameStore} = useStore();
  const {removedPlayers: players, rolePlayers: gamers} = useAppSelector(
    state => state.Game,
    shallowEqual,
  );

  const dispatch = useAppDispatch();

  const [removedPlayers, setRemovedPlayers] = useState<
    {player: Player; role: Role}[]
  >([]);
  const returnPlayer = (item: any) => {
    const arr = [...gamers];
    arr.push(item);
    const removed = removedPlayers.filter(
      el => el?.player?.id !== item?.player?.id,
    );
    dispatch(gameActions.updateRolePlayers(arr));
    setRemovedPlayers(removed);
    dispatch(gameActions.updateRemovedPlayers(removed))
  };
  useEffect(() => {
    if (players) {
      setRemovedPlayers(players);
    }
  }, [players]);
  return (
    <FlatList
      data={removedPlayers}
      keyExtractor={(item) => item.player.name}
      numColumns={3}
      contentContainerStyle={{
        width: DWidth * 0.9,
        marginHorizontal: DWidth * 0.05,
      }}
      ListEmptyComponent={() => {
        return (
          <View style={[styles.emptyList, {justifyContent: 'flex-start'}]}>
            <Image
              source={require('../../assets/images/empty1.png')}
              style={{width: '30%', height: 100}}
            />
            <Text style={{fontSize: 20}}>
              {t('game.noBodyRemovedFromGame')}{' '}
            </Text>
          </View>
        );
      }}
      renderItem={({item, index}) => {
        return (
          <Pressable
            style={[
              styles.renderItem,
              {
                flexDirection: 'column',
              },
            ]}
            key={index}
            onPress={() => {
              returnPlayer(item);
            }}>
            <Image
              source={require('../../assets/images/player2.png')}
              style={{width: 60, height: 60, borderRadius: 10}}
            />
            <Text>{item.player.name}</Text>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 40,
  },
  renderItem: {
    width: DWidth * 0.3,
    height: 80,
    marginBottom: 15,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export {Sitout};
