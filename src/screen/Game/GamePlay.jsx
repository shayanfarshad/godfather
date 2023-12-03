/**
 * @format
 * @flow strict-local
 */
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Text from '../../components/Text';
import IonIcon from 'react-native-vector-icons/Ionicons';
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
import {Modal} from '../../components/Modal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {translate} from '../../i18n';
import {colors, spacing} from '../../theme';
import {SceneMap, TabView} from 'react-native-tab-view';
import {InsideGame} from './InsideGame';
import {Sitout} from './Sitout';
import {Icon} from '../../components/Icon';
// import ZarinPalCheckout from 'zarinpal-checkout';

const GamePlay = () => {
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const {
    gameStore,
    playerStore,
    roleStore,
    langStore: {language},
  } = useStore();
  const players = gameStore.rolePlayers;
  const lastMoveCards = gameStore.lastMoveCards;
  const gameDay = gameStore.day;
  const exitRef = useRef<BottomSheetModal>(null);
  // const [showPayment, setShowPayment] = useState(true);

  const [gamers, setGamers] = useState([]);
  const [removedPlayers, setRemovedPlayers] = useState([]);
  const [lastMoves, setLastMoves] = useState([]);
  const [showLastCard, setShowLastCard] = useState(false);
  const [clickedCard, setClickedCard] = useState();
  const [day, setDay] = useState('');
  // const [hasToken, setToken] = useState(false);

  // useEffect(() => {
  //   if (!hasToken) {
  //     setShowPayment(true);
  //   } else {
  //     setShowPayment(false);
  //   }
  // }, [hasToken]);

  useEffect(() => {
    if (gameStore.gameType === 'jack') {
      setLastMoves(gameStore.jackLastMove);
    } else {
      setLastMoves(gameStore.nustraLastMove);
    }
  }, [gameStore]);
  useEffect(() => {
    if (players) {
      setGamers(players);
    }
  }, [players]);

  useEffect(() => {
    const word = getDayWord(gameDay);
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

  const renderScene = SceneMap({
    inside: InsideGame,
    outside: Sitout,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'inside', title: translate('game.insideGame')},
    {key: 'outside', title: translate('game.sitoutGame')},
  ]);

  // const payment = () => {
  //   const zarinpal = ZarinPalCheckout.create(
  //     '41a80d95-7a88-4fad-8ad8-40be0c654c62',
  //     false,
  //   );

  //   zarinpal
  //     .PaymentRequest({
  //       Amount: '1000', // In Tomans
  //       CallbackURL: 'https://your-safe-api/example/zarinpal/validate',
  //       Description: 'A Payment from Godfather',
  //       Email: 'farshad.shayan1996@gmail.com',
  //       Mobile: '09190396649',
  //     })
  //     .then(response => {
  //       if (response.status === 100) {
  //         console.log(response.url);
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: colors.background}}>
      <View style={styles.header}>
        <Text style={{fontSize: 20}}>{translate('game.day')}</Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            width: '70%',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Pressable
            onPress={() => {
              setShowLastCard(true);
            }}
            style={{
              backgroundColor: colors.cardBackground,
              elevation: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              width: 100,
              // padding: 10,
            }}>
            <Text style={{fontSize: 20}}>{translate('game.lastMove')}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              // nav.navigate('gamenight')
            }}>
            <IonIcon name="sunny-outline" size={30} color={'white'} />
          </Pressable>
          <Pressable
            style={{widht: 50}}
            onPress={() => exitRef?.current?.present()}>
            <Icon
              name={language === 'fa' ? 'chevron-left' : 'chevron-right'}
              size={25}
              color={colors.text}
            />
          </Pressable>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        key={index}
        renderTabBar={props => {
          const inputRange = props.navigationState.routes.map((x, i) => i);
          return (
            <View style={styles.tabBar}>
              {props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? 1 : 0.3,
                  ),
                });

                return (
                  <TouchableOpacity
                    style={styles.tabItem}
                    key={route.key}
                    onPress={() => {
                      setIndex(i);
                    }}>
                    <Animated.Text
                      style={{
                        opacity,
                        color: colors.text,
                        fontSize: language === 'fa' ? spacing.lg : spacing.md,
                        // lineHeight: 32,
                        paddingHorizontal: Platform.OS === 'ios' ? 12 : 5,
                        paddingTop: Platform.OS === 'ios' ? 12 : 10,
                        // padding: 10,
                        fontFamily:
                          language === 'fa'
                            ? 'Digi Nofar Bold'
                            : 'Wizard World',
                      }}>
                      {route.title}
                    </Animated.Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
        initialLayout={{width: layout.width}}
      />

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
              backgroundColor: colors.cardBackground,
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
                marginBottom: 20,
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
                  key={item.id}
                />
              );
            }}
          />
        </View>
      </ReactNativeModal>

      <Modal
        modalRef={exitRef}
        index={0}
        onDismiss={() => exitRef?.current?.close()}
        snapPoints={['30%']}
        backgroundStyle={{
          backgroundColor: colors.cardBackground,
        }}>
        <View style={styles.selectImageContainer}>
          <View>
            <Text style={{fontSize: 20}}>
              {translate('game.doYouWantToCloseGame')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => {
                gameStore.gameReset();
                playerStore.resetPlayers();
                roleStore.resetRoles();
                nav.navigate('RPM');
              }}
              style={[
                styles.addImageBtnCard,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <Text>{translate('game.closeIt')}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                exitRef?.current?.close();
              }}
              style={[
                styles.addImageBtnCard,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <Text>{translate('common.cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
        // height: 140,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      {isShowLastMove ? (
        <>
          <Text style={{fontSize: 22, textAlign: 'center'}}>
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
    marginTop: 50,
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
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  selectImageContainer: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addImageBtnCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '45%',
    height: 50,
    marginBottom: 15,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: 50,
  },
  tabItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 16,
  },
});

export {GamePlay};
