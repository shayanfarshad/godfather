import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Text} from '../../components/Text';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {observer} from 'mobx-react';
import {useStore} from '../../constants/useStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const PlayersScreen = observer(() => {
  const {playerStore} = useStore();
  const allPlayers = playerStore.players;
  const nav = useNavigation();
  console.log({allPlayers});
  const [players, setPlayers] = useState(allPlayers);
  const [playerName, setPlayerName] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [isFabVisible, setFabVisible] = useState(false);

  const addPlayer = () => {
    setFormVisible(false);
    const arr = [...players];
    playerStore.addPlayers({id: Date.now(), name: playerName});
    arr.push({id: Date.now(), name: playerName});
    AsyncStorage.setItem('players', JSON.stringify(arr));
    setPlayers(arr);
    setPlayerName('');
  };

  const removePlayer = item => {
    // const arr = [...players];
    // const newList = arr.filter(el => el.name !== item.name);
    // setPlayers(newList);
    playerStore.removePlayers(item);
  };

  useEffect(() => {
    if (allPlayers) {
      setPlayers(allPlayers);
    }
  }, [allPlayers]);

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
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          marginVertical: 20,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 22, color: 'white'}}>
          بازیکنان حاضر در بازی
        </Text>
      </View>
      <FlatList
        data={players}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatContainer}
        numColumns={3}
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
              onLongPress={() => removePlayer(item)}
              style={styles.renderItem}>
              <View style={styles.playerIcon}>
                <Image
                  source={require('../../assets/images/player2.png')}
                  style={{width: 80, height: 80}}
                />
              </View>
              <Text style={{fontSize: 16, color: 'white'}}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
      {isFabVisible ? (
        <View
          style={{
            width: 100,
            height: 150,
            position: 'absolute',
            bottom: 50,
            right: 20,
          }}>
          <Pressable
            style={{
              backgroundColor: 'white',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              nav.navigate('playerList');
              setFabVisible(false);
            }}>
            <Text>بازیکن قدیمی</Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              setFabVisible(false);
              setFormVisible(true);
            }}>
            <Text>بازیکن جدید</Text>
          </Pressable>
        </View>
      ) : null}
      <View style={styles.addBtn}>
        <Pressable
          onPress={() => {
            setFabVisible(!isFabVisible);
          }}
          style={styles.addBtnIcon}>
          <Icon name="user-plus" size={20} color={'black'} />
        </Pressable>
      </View>

      <Modal
        isVisible={formVisible}
        onBackButtonPress={() => setFormVisible(false)}
        onBackdropPress={() => setFormVisible(false)}
        onRequestClose={() => setFormVisible(false)}
        deviceWidth={DWidth}
        deviceHeight={DHeight}
        style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TextInput
            value={playerName}
            onChangeText={text => {
              setPlayerName(text);
            }}
            style={styles.modalInput}
            selectionColor={backgroundColor}
            placeholder="نام بازیکن"
          />
          <Pressable
            onPress={() => {
              addPlayer();
            }}
            style={styles.modalBtn}>
            <Text style={{color: 'white', fontSize: 18}}>ثبت</Text>
          </Pressable>
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
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5, 
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
    height: 105,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerIcon: {
    width: 80,
    height: 80,
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
    width: '90%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: backgroundColor,
  },
});

export {PlayersScreen};
