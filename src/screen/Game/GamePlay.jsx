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
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactNativeModal from 'react-native-modal';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useStore} from '../../constants/useStore';
import {PlayerDetail} from './PlayerDetail';

const GamePlay = () => {
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const {gameStore} = useStore();
  const players = gameStore.rolePlayers;
  const lastMoveCards = gameStore.lastMoveCards;
  const [gamers, setGamers] = useState([]);
  const [lastMoves, setLastMoves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLastCard, setShowLastCard] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [clickedCard, setClickedCard] = useState();
  const [isSilent, setSilent] = useState(false);
  const [detailPlayer, setDetailPlayer] = useState();
  useEffect(() => {
    if (players) {
      setGamers(players);
    }
  }, [players]);

  useEffect(() => {
    if (lastMoveCards) {
      let currentIndex = lastMoveCards.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [lastMoveCards[currentIndex], lastMoveCards[randomIndex]] = [
          lastMoveCards[randomIndex],
          lastMoveCards[currentIndex],
        ];
      }
      console.log({lastMove: lastMoveCards[0]});
      setLastMoves(lastMoveCards);
    }
  }, [lastMoveCards]);

  const removeItem = () => {
    setShowLastCard(false);
    if (clickedCard) {
      const newCards = lastMoves.filter(el => el.id !== clickedCard.id);
      setLastMoves(newCards);
      gameStore.updateLastCards(newCards);
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

  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <View style={styles.header}>
        <Text type="light" style={{fontSize: 20, color: 'white'}}>
          اطلاعات بازی
        </Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            width: 120,
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {
              setShowLastCard(true);
            }}>
            <Icon name="credit-card" size={30} color={'white'} />
          </Pressable>
          <Pressable
            onPress={() => {
              setShowRole(!showRole);
            }}>
            <Icon name="eye" size={30} color={'white'} />
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
          marginHorizontal: DWidth * 0.05,
        }}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyList}>
              <Image
                source={require('../../assets/images/empty1.png')}
                style={{width: '50%', height: 300}}
              />
              <Text style={{fontSize: 20, color: 'white'}}>
                هیج بازیکنی برای پذیرفتن نقش نمانده!
              </Text>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <PlayerDetail
              item={item}
              index={index}
              setDetailPlayer={setDetailPlayer}
              setShowModal={setShowModal}
              showRole={showRole}
            />
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
  renderItem: {
    width: DWidth * 0.9,
    height: 80,
    marginBottom: 15,
    flexDirection: 'row-reverse',
    borderWidth: 1,
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
