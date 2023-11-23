import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {observer} from 'mobx-react';
import {useStore} from '../../constants/useStore';
import {DWidth, backgroundColor} from '../../constants/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const PlayerListScreen = observer(({route}) => {
  const [players, setPlayers] = useState([]);
  const nav = useNavigation();
  const gamePlayers = route.params.gamePlayers;
  const {playerStore} = useStore();
  const getPlayers = async () => {
    return await AsyncStorage.getItem('players');
  };
  useEffect(() => {
    console.log({gamePlayers: gamePlayers[0]});
    getPlayers().then(res => {
      const _players = JSON.parse(res);
      console.log({_players: _players});
      const filteredArray = _players.filter(
        item =>
          !gamePlayers.some(s => JSON.stringify(s) === JSON.stringify(item)),
      );
      // _players.map(item => {
      //   console.log({item: item.name});
      //   if (gamePlayers.some(el => el.id === item.id)) {
      //     arr = _players.filter(el => el.id !== item.id);
      //     console.log({arr: arr.length})
      //   } else {
      //     if (_players) {
      //       setPlayers(_players);
      //     }
      //   }
      // });
      setPlayers(filteredArray);
    });
  }, []);

  const selectPlayer = item => {
    console.log({item});
    playerStore.addPlayers(item);
    const arr = [...players];
    const newList = arr.filter(el => el !== item);
    setPlayers(newList);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}>
      <View style={styles.header}>
        <Text type="light" style={{fontSize: 20, color: 'white'}}>
          اضافه کردن بازیکن به این بازی
        </Text>
        <Pressable onPress={() => nav.goBack()}>
          <Icon name="long-arrow-left" size={30} color={'white'} />
        </Pressable>
      </View>
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
                style={{width: '50%', height: 300}}
              />
              <Text style={{fontSize: 20, color: 'white'}}>
                هیج بازیکنی نداری!
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
              <Text style={{color: 'white'}}>{item.name}</Text>
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
    height: '100%',
    marginTop: 80,
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
