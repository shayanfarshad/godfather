/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Keyboard,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Text from '../../components/Text';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {observer} from 'mobx-react';
import {useStore} from '../../constants/useStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Modal} from '../../components/Modal';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomSheetModal, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {translate, translateWithOptions} from '../../i18n';
import {colors} from '../../theme';
import Header from '../../components/Header';
import * as storage from '../../utils/storage';
import I18n from 'i18n-js';
import {showToast} from '../../utils/snackbar';
import {Toast} from 'react-native-toast-notifications';

const PlayersScreen = observer(() => {
  const player = require('../../assets/images/player2.png');

  const {
    playerStore,
    langStore: {language},
  } = useStore();
  const allPlayers = playerStore.getPlayers();
  const nav = useNavigation();
  const addPlayerRef = useRef<BottomSheetModal>(null);
  const cameraRef = useRef<BottomSheetModal>(null);

  const [players, setPlayers] = useState(allPlayers);
  const [userPicture, setUserPicture] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [isFabVisible, setFabVisible] = useState(false);

  // useEffect(() => {
  //   if (allPlayers) {
  //     setPlayers(allPlayers);
  //   }
  // }, [allPlayers]);

  const addPlayer = async () => {
    if (playerName) {
      const newPlayer = {
        id: Date.now(),
        name: playerName,
        avatar: userPicture,
      };
      await storage.load('players').then(players => {
        const arr = players || [];
        arr.push(newPlayer);
        storage.save('players', arr);
        playerStore.addPlayers(newPlayer);
        // setPlayers();
        setPlayerName('');
        setUserPicture('');
      });
      showToast({
        text: translateWithOptions('players.addPlayerSucceed', {
          player: playerName,
        }),
      });

      // showToast({
      //   text: translateWithOptions("players.addPlayerSucceed", {player: playerName}),
      // });
    } else {
      showToast({
        text: translate('players.shouldWritePlayerName'),
        mode: 'danger',
      });
    }
  };

  const removePlayer = item => {
    playerStore.removePlayers(item);
  };

  const addPicture = () => {
    cameraRef?.current?.present();
  };
  useEffect(() => {
    if (allPlayers) {
      setPlayers(allPlayers);
      playerStore.setPlayerRole(allPlayers.length);
    }
  }, [allPlayers]);
  const takePhoto = () => {
    cameraRef.current.close();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(
        () => {
          launchCamera(
            {
              cameraType: 'back',
              mediaType: 'photo',
              maxHeight: 200,
              maxWidth: 200,
              quality: 0.3,
              includeBase64: true,
            },
            response => {
              if (response) {
                if (!response.didCancel) {
                  if (response?.assets[0]) {
                    setUserPicture(response?.assets[0]?.uri);
                    const file = {
                      file: `data:image/jpeg;base64,${response.assets[0].base64}`,
                    };
                  }
                }
              }
            },
          );
        },
      );
    } else {
      launchCamera(
        {
          cameraType: 'back',
          mediaType: 'photo',
          maxHeight: 200,
          maxWidth: 200,
          quality: 0.3,
          includeBase64: true,
        },

        response => {
          if (response) {
            if (!response.didCancel) {
              if (response?.assets[0]) {
                const file = {
                  file: `data:image/jpeg;base64,${response.assets[0].base64}`,
                };
                // this.changeAvatar(this.props.user.id, response.data).then(() =>
                // {
                // 	this.props.fetchUser();
                // });
              }
            }
          }
        },
      );
    }
  };

  const selectFromDoc = () => {
    cameraRef?.current?.close();
    Keyboard.dismiss();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(() => {
        launchImageLibrary(
          {
            title: 'انتخاب از گالری',
            // maxWidth: 600,
            // maxHeight: 600,
            quality: 0.7,
            mediaType: 'photo',
            includeBase64: true,
            // eslint-disable-next-line
          },
          response => {
            if (response) {
              if (!response.didCancel) {
                if (response?.assets[0]) {
                  const file = `data:image/jpeg;base64,${response.assets[0].base64}`;

                  setUserPicture(file);

                  // this.changeAvatar(this.props.user.id, response.data).then(() =>
                  // {
                  // 	this.props.fetchUser();
                  // });
                }
              }
            }
          },
        );
      });
    } else {
      launchCamera(
        {
          title: 'دوربین',
          // maxWidth: 600,
          // maxHeight: 600,
          quality: 0.7,
          mediaType: 'photo',
          includeBase64: true,
          // eslint-disable-next-line
        },
        response => {
          if (response) {
            if (!response.didCancel) {
              if (response?.assets[0]) {
                const file = `data:image/jpeg;base64,${response.assets[0].base64}`;

                setUserPicture(file);

                // this.changeAvatar(this.props.user.id, response.data).then(
                //   () => {
                //     this.props.fetchUser();
                //   },
                // );
              }
            }
          }
        },
      );
    }
  };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBack);
  //   return () => {
  //     BackHandler.remove()
  //   };
  // }, []);

  // const handleBack = () => {
  //   nav.goBack();
  // };
  return (
    <View
      // onTouchStart={() => setFabVisible(false)}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 20,
      }}>
      <Header
        backPress={() => nav.goBack()}
        title={translate('game.addPlayerToThisGame')}
      />

      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          // marginVertical: 20,
          marginBottom: 20,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 22}}>{translate('game.playersChoosen')}</Text>
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
              onLongPress={() => removePlayer(item)}
              style={styles.renderItem}>
              <View style={styles.playerIcon}>
                <Image
                  source={
                    item?.avatar
                      ? {uri: item?.avatar}
                      : require('../../assets/images/player2.png')
                  }
                  style={{width: 80, height: 80}}
                />
              </View>
              <Text>{item.name}</Text>
            </Pressable>
          );
        }}
      />
      {isFabVisible ? (
        <View
        // style={{
        //   width: 110,
        //   height: 170,
        //   position: 'absolute',
        //   bottom: 50,
        //   right: 20,
        // }}
        >
          <View
            style={{width: 110, position: 'absolute', bottom: 70, right: 110}}>
            <Pressable
              style={{
                backgroundColor: colors.modalBackground,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                nav.navigate('playerList', {
                  gamePlayers: allPlayers,
                });
                setFabVisible(false);
              }}>
              <Text>{translate('game.oldPlayer')}</Text>
            </Pressable>
          </View>
          <View
            style={{width: 110, position: 'absolute', bottom: 130, right: 20}}>
            <Pressable
              style={{
                marginTop: 20,
                backgroundColor: colors.modalBackground,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                setFabVisible(false);
                addPlayerRef?.current?.present();
              }}>
              <Text>{translate('game.newPlayer')}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
      <View style={[styles.addBtn, {backgroundColor: colors.modalBackground}]}>
        <Pressable
          onPress={() => {
            setFabVisible(!isFabVisible);
          }}
          style={styles.addBtnIcon}>
          <Icon name="user-plus" size={20} color={colors.text} />
        </Pressable>
      </View>
      <Modal
        modalRef={addPlayerRef}
        index={0}
        onDismiss={() => {}}
        snapPoints={[DHeight * 0.6]}
        backgroundStyle={{backgroundColor: colors.modalBackground}}
        onChange={e => {}}>
        <View
          style={{
            backgroundColor: colors.modalBackground,
            height: '100%',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              addPicture();
            }}
            hitSlop={10}>
            <View style={styles.userphoto}>
              <Image
                source={userPicture ? {uri: userPicture} : player}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <Icon
              name="camera"
              size={25}
              color={'white'}
              style={{
                position: 'absolute',
                bottom: -10,
                right: -10,
                backgroundColor: '#2b60b5',
                padding: 5,
                borderRadius: 12.5,
                overflow: 'hidden',
                // borderWidth: 1,
              }}
            />
          </Pressable>
          <BottomSheetTextInput
            value={playerName}
            onChangeText={text => {
              setPlayerName(text);
            }}
            style={[
              styles.modalInput,
              {
                backgroundColor: colors.background,
                color: colors.text,
                fontSize: language === 'fa' ? 20 : 16,
                fontFamily:
                  language === 'fa' ? 'Digi Nofar Bold' : 'Wizard World',
              },
            ]}
            selectionColor={colors.text}
            placeholder={translate('game.playerName')}
            placeholderTextColor={colors.text}
          />

          <Pressable
            onPress={() => {
              addPlayer();
            }}
            style={[
              styles.modalBtn,
              {
                backgroundColor: colors.background,
              },
            ]}>
            <Text>{translate('common.addBtn')}</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        modalRef={cameraRef}
        index={0}
        onDismiss={() => cameraRef?.current?.close()}
        snapPoints={['20%']}
        backgroundStyle={{
          backgroundColor: backgroundColor,
        }}>
        <View style={styles.selectImageContainer}>
          <Pressable onPress={takePhoto} style={styles.addImageBtnCard}>
            <View style={styles.addPhotoCard}>
              <Icon name="camera" size={50} color={'white'} />
            </View>
            <Text style={{color: 'white'}}>{translate('common.camera')}</Text>
          </Pressable>
          <Pressable onPress={selectFromDoc} style={styles.addImageBtnCard}>
            <View style={styles.addPhotoCard}>
              <Icon name="image" size={50} color={'white'} />
            </View>
            <Text style={{color: 'white'}}>{translate('common.gallery')}</Text>
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
    height: DHeight * 0.7,
    // marginTop: 80,
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
    bottom: 60,
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
    height: 60,
    borderWidth: 0.2,
    paddingHorizontal: 5,
    borderRadius: 4,
    textAlign: I18n.locale === 'en-IR' ? 'right' : 'left',
  },
  modalBtn: {
    width: '90%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#2b60b5',
  },
  userphoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  addPhotoCard: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    borderColor: 'white',
  },
  selectImageContainer: {
    flexDirection: 'row-reverse',
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addImageBtnCard: {justifyContent: 'center', alignItems: 'center'},
});

export {PlayersScreen};
