import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {observer} from 'mobx-react';
import {useStore} from '../../constants/useStore';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {translate} from '../../i18n';
import {colors} from '../../theme';
import * as storage from '../../utils/storage';

const PlayerListScreen = observer(({route}) => {
  const [players, setPlayers] = useState([]);
  const nav = useNavigation();
  const gamePlayers = route.params.gamePlayers;
  const {playerStore} = useStore();
  const getPlayers = async () => {
    return await storage.load('players');
  };
  useEffect(() => {
    getPlayers()
      .then(res => {
        const _players = res;

        const filteredArray = _players.filter(
          item =>
            !gamePlayers.some(s => JSON.stringify(s) === JSON.stringify(item)),
        );
        setPlayers(filteredArray);
      })
      .catch(err => {});
  }, []);

  const selectPlayer = item => {
    playerStore.addPlayers(item);
    const arr = [...players];
    const newList = arr.filter(el => el !== item);
    setPlayers(newList);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 20,
        // paddingBottom: 60,
      }}>
      <Header
        backPress={() => nav.goBack()}
        title={translate('game.addPlayerToThisGame')}
      />

      <FlatList
        data={players}
        keyExtractor={item => item.id}
        numColumns={3}
        // contentContainerStyle={{justifyContent: 'space-around'}}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyList}>
              <Image
                source={require('../../assets/images/empty1.png')}
                style={{width: '50%', height: 200}}
              />
              <Text style={{fontSize: 20}}>
                {translate('game.anyPlayerExist')}
              </Text>
            </View>
          );
        }}
        renderItem={({item}) => {
          return (
            <Pressable
              style={styles.playerIcon}
              key={item.id}
              onPress={() => selectPlayer(item)}>
              <Image
                source={
                  item?.avatar
                    ? {uri: item.avatar}
                    : require('../../assets/images/player2.png')
                }
                style={{width: 80, height: 80, borderRadius: 10}}
              />
              <Text>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
});

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
});
export {PlayerListScreen};
