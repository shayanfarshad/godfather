import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStore} from '../../constants/useStore';
import {DWidth, backgroundColor} from '../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../theme';
import {translate} from '../../i18n';
import Header from '../../components/Header';

const RoleUpScreen = () => {
  const nav = useNavigation();
  const {playerStore, gameStore} = useStore();
  const [rolePlayer, setRolePlayer] = useState([]);
  const players = playerStore.getPlayers();
  const roles = gameStore.roles;

  useEffect(() => {
    setRolePlayer(players);
  }, [players]);

  const roleup = () => {
    if (!rolePlayer[0]?.role) {
      const gamer = [...players];
      const allRole = [...roles];
      const joinedArray = [];

      while (gamer.length > 0 && allRole.length > 0) {
        // Randomly choose which array to pick an element from
        const randomChoice = Math.floor(Math.random() * 2); // Generates 0 or 1
        const obj = {};
        if (randomChoice === 0) {
          // Pick an element from array1 and add to the object
          obj.player = gamer.shift();
          // Pick an element from array2 and add to the object
          obj.role = allRole.splice(
            Math.floor(Math.random() * allRole.length),
            1,
          )[0];
        } else {
          // Pick an element from array2 and add to the object
          obj.role = allRole.shift();
          // Pick an element from array1 and add to the object
          obj.player = gamer.splice(
            Math.floor(Math.random() * gamer.length),
            1,
          )[0];
        }
        joinedArray.push(obj);
      }
      gameStore.updateRolePlayers(joinedArray);
      setRolePlayer(joinedArray);
      playerStore.setPlayerRole(0);
    } else {
      setRolePlayer(players);
      playerStore.setPlayerRole(0);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 15,
      }}>
      <Header
        backPress={() => {
          nav.goBack();
        }}
        title={translate('game.roleAssignment')}
      />
      {rolePlayer.length ? (
        <FlatList
          data={rolePlayer}
          keyExtractor={item => item.id + Date.now()}
          numColumns={3}
          contentContainerStyle={{
            justifyContent: 'space-around',
            width: DWidth,
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyList}>
                <Image
                  source={require('../../assets/images/empty1.png')}
                  style={{width: '50%', height: 300}}
                />
                <Text style={{fontSize: 20, color: 'white'}}>
                  {translate('game.anyPlayerExist')}
                </Text>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={styles.playerIcon}
                key={index}
                onPress={() => {}}>
                <Image
                  source={
                    item?.role?.image
                      ? item.role.image
                      : require('../../assets/images/player2.png')
                  }
                  style={{width: 100, height: 140, borderRadius: 10}}
                />
                <Text style={{color: 'white'}}>
                  {item?.player?.name ? item.player.name : item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      ) : null}
      <View
        style={[
          styles.addBtn,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}>
        <Pressable
          onPress={() => {
            roleup();
            // setFabVisible(!isFabVisible);
          }}
          style={styles.addBtnIcon}>
          <Icon name="random" size={20} color={colors.text} />
        </Pressable>
      </View>
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
  },
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 80,
  },
  playerIcon: {
    width: DWidth / 3.2,
    height: 160,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addBtn: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  addBtnIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export {RoleUpScreen};
