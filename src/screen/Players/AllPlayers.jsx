/**
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {useStore} from '../../constants/useStore';
import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  Image,
  Keyboard,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {DHeight, backgroundColor} from '../../constants/Constants';
import Header from '../../components/Header';
import {PlayerRow} from './PlayerRow';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Modal} from '../../components/Modal';
import Text from '../../components/Text';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../../theme';
import {translate} from '../../i18n';
// import player from '../../assets/images/player2.png';
const AllPlayers = observer(() => {
  const player = require('../../assets/images/player2.png');
  const [players, setPlayers] = useState([]);
  const nav = useNavigation();
  const addRef = useRef<BottomSheetModal>(null);
  const cameraModal = useRef<BottomSheetModal>(null);

  const [userPicture, setUserPicture] = useState('');
  const [playerName, setPlayerName] = useState('');
  const getPlayers = async () => {
    return await AsyncStorage.getItem('players');
  };
  useEffect(() => {
    getPlayers().then(res => {
      console.log({res});
      if (res) {
        const _players = JSON.parse(res);
        console.log({_players});

        setPlayers(_players);
      }
    });
  }, []);

  const addPicture = () => {
    cameraModal?.current?.present();
  };
  const takePhoto = () => {
    cameraModal.current.close();
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
                    // console.log({response: response?.assets[0].uri});
                    // setPlayerAvatar(response?.assets[0]?.uri)
                    setUserPicture(response?.assets[0]?.uri);
                    const file = {
                      file: `data:image/jpeg;base64,${response.assets[0].base64}`,
                    };

                    // console.log({file});
                    // this.changeAvatar(this.props.user.id, response.data).then(() =>
                    // {
                    // 	this.props.fetchUser();
                    // });
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
    cameraModal?.current?.close();
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

  const addPlayer = () => {
    addRef?.current?.close();
    const arr = [...players];
    arr.push({id: Date.now(), name: playerName, avatar: userPicture});
    AsyncStorage.setItem('players', JSON.stringify(arr));
    console.log({arr});
    setPlayers(arr);
    setPlayerName('');
    setUserPicture('');
  };

  const removeItem = id => {
    const arr = [...players];
    const filteredArr = arr.filter(item => item.id !== id);
    AsyncStorage.setItem('players', JSON.stringify(filteredArr));
    setPlayers(filteredArr);
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: colors.background,
      }}>
      <Header title={translate('game.myPlayers')} />
      {players ? (
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          style={{flex: 0.7, maxHeight: DHeight * 0.8}}
          contentContainerStyle={{marginTop: 20, paddingBottom: 20}}
          renderItem={({item}) => {
            return (
              <PlayerRow
                item={item}
                key={item?.id}
                removeItem={() => removeItem(item.id)}
              />
            );
          }}
        />
      ) : null}
      <View style={styles.addBtn}>
        <Pressable
          onPress={() => {
            addRef?.current?.present();
          }}
          style={styles.addBtnIcon}>
          <Icon name="user-plus" size={20} color={'black'} />
        </Pressable>
      </View>
      <Modal
        modalRef={addRef}
        index={0}
        onDismiss={() => {}}
        snapPoints={[DHeight * 0.5]}
        backgroundStyle={{backgroundColor: colors.modalBackground}}
        onChange={e => {
          // console.log('onchange', e);
        }}>
        <View
          style={{
            // backgroundColor: backgroundColor,
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
          <TextInput
            value={playerName}
            onChangeText={text => {
              setPlayerName(text);
            }}
            style={styles.modalInput}
            selectionColor={colors.text}
            placeholder={translate('game.playerName')}
            placeholderTextColor={colors.palette.primary200}
          />
          <Pressable
            onPress={() => {
              addPlayer();
            }}
            style={styles.modalBtn}>
            <Text style={{color: 'white', fontSize: 18}}>
              {translate('common.addBtn')}
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        modalRef={cameraModal}
        index={0}
        onDismiss={() => cameraModal?.current?.close()}
        snapPoints={['20%']}
        backgroundStyle={{
          backgroundColor: colors.background,
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
  userphoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalInput: {
    width: '90%',
    height: 50,
    paddingHorizontal: 5,
    borderRadius: 8,
    textAlign: 'right',
    color: colors.text,
    backgroundColor: colors.inputBackground,
    fontFamily: 'IRANSansXNoEn-Medium',
  },
  modalBtn: {
    width: '90%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: colors.buttonBackground,
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

export {AllPlayers};
