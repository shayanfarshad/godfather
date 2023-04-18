import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from '../../components/Text';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactNativeModal from 'react-native-modal';
import {
  DHeight,
  DWidth,
  backgroundColor,
  getDayWord,
} from '../../constants/Constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useStore} from '../../constants/useStore';
import {PlayerDetail} from './PlayerDetail';

const GamePlay = () => {
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const {gameStore} = useStore();
  const players = gameStore.rolePlayers;
  const lastMoveCards = gameStore.lastMoveCards;
  const gameDay = gameStore.day;

  const [gamers, setGamers] = useState([]);
  const [removedPlayers, setRemovedPlayers] = useState([]);
  const [lastMoves, setLastMoves] = useState(lastMoveCards);
  const [showModal, setShowModal] = useState(false);
  const [showLastCard, setShowLastCard] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [clickedCard, setClickedCard] = useState();
  const [isSilent, setSilent] = useState(false);
  const [detailPlayer, setDetailPlayer] = useState();
  const [day, setDay] = useState('');
  useEffect(() => {
    if (players) {
      setGamers(players);
    }
  }, [players]);

  useEffect(() => {
    const word = getDayWord(gameDay);
    console.log({word});
    setDay(word);
  }, [gameDay]);

  useEffect(() => {
    if (lastMoveCards) {
      const arr = [...lastMoveCards];
      let currentIndex = arr.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
          arr[randomIndex],
          arr[currentIndex],
        ];
      }
      console.log({lastMove: arr[0]});
      setLastMoves(arr);
    }
  }, [lastMoveCards]);

  const removeItem = () => {
    setShowLastCard(false);
    if (clickedCard) {
      const newCards = lastMoves.filter(el => el.id !== clickedCard.id);
      setLastMoves(newCards);
      // gameStore.updateLastCards(newCards);
    }
  };

  const handleGoBack = () => {
    return true;
  };
  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleGoBack);
    }
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    };
  }, [isFocused]);

  const removeDeadPlayer = p => {
    const removed = [...removedPlayers];
    removed.push(p);
    const arr = gamers.filter(el => el?.player?.id !== p?.player?.id);
    console.log({arr});
    gameStore.updateRolePlayers(arr);
    setRemovedPlayers(removed);
  };

  const returnPlayer = item => {
    const arr = [...gamers];
    arr.push(item);
    const removed = removedPlayers.filter(
      el => el?.player?.id !== item?.player?.id,
    );
    gameStore.updateRolePlayers(arr);
    setRemovedPlayers(removed);
  };

  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <View style={styles.header}>
        <Text type="light" style={{fontSize: 20, color: 'white'}}>
          روز {day}
        </Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            width: '60%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {
              setShowLastCard(true);
            }}
            style={{
              backgroundColor: 'white',
              elevation: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              padding: 10,
            }}>
            <Text type="light" style={{fontSize: 20, color: 'black'}}>
              حرکت آخر
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              // nav.navigate('gamenight')
            }}>
            <IonIcon name="sunny-outline" size={30} color={'white'} />
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert(
                'از بازی خارج می شوید ؟',
                'در صورت تایید بازی کلا از بین خواهد رفت',
                [
                  {
                    text: 'نه',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'بله',
                    onPress: () => {
                      nav.navigate('home');
                    },
                  },
                ],
              )
            }>
            <Icon name="long-arrow-left" size={30} color={'white'} />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={gamers}
        keyExtractor={(index, item) => index}
        contentContainerStyle={{
          width: DWidth * 0.9,
          marginTop: 20,
          minHeight: DHeight * 0.6,
          marginHorizontal: DWidth * 0.05,
        }}
        renderItem={({item, index}) => {
          return (
            <PlayerDetail
              item={item}
              setRemovePlayer={p => removeDeadPlayer(p)}
              index={index}
              setDetailPlayer={setDetailPlayer}
              setShowModal={setShowModal}
              showRole={showRole}
            />
          );
        }}
      />
      <Text
        type="bold"
        style={{
          color: 'white',
          fontSize: 20,
          textAlign: 'right',
          marginRight: 20,
          marginTop: 20,
        }}>
        حذف شده ها
      </Text>
      <FlatList
        data={removedPlayers}
        keyExtractor={(index, item) => index}
        numColumns={3}
        contentContainerStyle={{
          width: DWidth * 0.9,
          height: DHeight * 0.2,
          // marginTop: 20,
          marginHorizontal: DWidth * 0.05,
        }}
        ListEmptyComponent={() => {
          return (
            <View style={[styles.emptyList, {justifyContent: 'flex-start'}]}>
              <Image
                source={require('../../assets/images/empty1.png')}
                style={{width: '30%', height: 100}}
              />
              <Text style={{fontSize: 20, color: 'white'}}>
                هیچ بازیکنی از بازی خارج نشده
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
              <Text style={{color: 'white'}}>{item.player.name}</Text>
            </Pressable>
          );
        }}
      />

      <ReactNativeModal
        isVisible={showModal}
        deviceWidth={DWidth}
        deviceHeight={DHeight}
        onBackButtonPress={() => {
          setShowModal(!showModal);
        }}
        onBackdropPress={() => {
          setShowModal(!showModal);
        }}
        style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View
            style={{
              width: DWidth / 2,
              height: 230,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              borderRadius: 10,
            }}>
            <Image
              source={detailPlayer?.role.image}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View
            style={{
              width: DWidth / 2,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text type="bold" style={{fontSize: 26}}>
              {detailPlayer?.role.title}
            </Text>
            <Text type="bold" style={{fontSize: 24}}>
              {detailPlayer?.player.name}
            </Text>
          </View>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={showLastCard}
        deviceWidth={DWidth}
        deviceHeight={DHeight}
        onBackButtonPress={() => {
          setShowLastCard(!showLastCard);
        }}
        onBackdropPress={() => {
          setShowLastCard(!showLastCard);
        }}
        style={[styles.modalContainer]}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: backgroundColor,
              width: DWidth,
              height: DHeight * 0.9,
              padding: 10,
            },
          ]}>
          <View>
            <Pressable
              onPress={() => removeItem()}
              style={{
                backgroundColor: 'white',
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="times" size={18} color={'black'} />
            </Pressable>
          </View>
          <FlatList
            data={lastMoves}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <CardList
                  item={item}
                  setClickedCard={setClickedCard}
                  index={index}
                />
              );
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

const CardList = ({item, setClickedCard, index}) => {
  const [isShowLastMove, setIsShowLastMove] = useState(false);

  return (
    <Pressable
      key={item.id}
      onPress={() => {
        setClickedCard(item);
        setIsShowLastMove(!isShowLastMove);
      }}
      style={{
        width: DWidth * 0.8,
        // marginLeft: 10,
        height: 140,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {isShowLastMove ? (
        <>
          <Text style={{fontSize: 12, textAlign: 'center'}}>
            {item.description}
          </Text>
          <Text style={{fontSize: 22}}>{item.title}</Text>
        </>
      ) : (
        <Text style={{fontSize: 30}}>{index + 1}</Text>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
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
    elevation: 5,
  },
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
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
    height: 300,
  },
  modalView: {
    width: DWidth / 1.5,
    height: DHeight / 2.2,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
});

export {GamePlay};
