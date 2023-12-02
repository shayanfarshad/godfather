import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {DHeight, DWidth} from '../../constants/Constants';
import {translate} from '../../i18n';
import {useStore} from '../../constants/useStore';

const Sitout = () => {
  const {gameStore} = useStore();
  const players = gameStore.removedPlayers;
  const gamers = gameStore.rolePlayers;

  const [removedPlayers, setRemovedPlayers] = useState([]);
  const returnPlayer = item => {
    const arr = [...gamers];
    arr.push(item);
    const removed = removedPlayers.filter(
      el => el?.player?.id !== item?.player?.id,
    );
    gameStore.updateRolePlayers(arr);
    setRemovedPlayers(removed);
    gameStore.updateRemovedPlayers(removed);
  };
  useEffect(() => {
    if (players) {
      setRemovedPlayers(players);
    }
  }, [players]);
  return (
    <FlatList
      data={removedPlayers}
      keyExtractor={(index, item) => item.id}
      numColumns={3}
      contentContainerStyle={
        {
          // width: DWidth * 0.9,
          // height: DHeight * 0.3,
          // marginTop: 20,
          // marginHorizontal: DWidth * 0.05,
        }
      }
      ListEmptyComponent={() => {
        return (
          <View style={[styles.emptyList, {justifyContent: 'flex-start'}]}>
            <Image
              source={require('../../assets/images/empty1.png')}
              style={{width: '30%', height: 100}}
            />
            <Text style={{fontSize: 20}}>
              {translate('game.noBodyRemovedFromGame')}{' '}
            </Text>
          </View>
        );
      }}
      renderItem={({item, index}) => {
        return (
          <Pressable
            style={[styles.renderItem, {flexDirection: 'column'}]}
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
