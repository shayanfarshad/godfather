import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {Text} from '../../components/Text';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {observer} from 'mobx-react';
import {useStore} from '../../constants/useStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {remove} from 'mobx';

const RolesScreen = observer(() => {
  const {roleStore, gameStore} = useStore();
  const nav = useNavigation();
  const Roles = roleStore.roles;
  const playingRoles = gameStore.roles;
  const [disableds, setDisableds] = useState([]);
  const [gameRoles, setGameRoles] = useState([]);
  const [citizen, setCitizen] = useState(1);
  //   const [roles, setRoles] = useState(playingRoles);

  useEffect(() => {
    setGameRoles(Roles);
  }, [Roles]);

  const addRole = item => {
    const existItem = playingRoles.findIndex(el => el === item);
    if (existItem === -1) {
      gameStore.addRoles(item);
      const fakeRole = [...gameRoles];
      const selectedIndex = fakeRole.findIndex(el => el.id === item.id);
      fakeRole[selectedIndex].active = false;
      setGameRoles(fakeRole);
    } else {
      if (item.title === 'شهروند ساده') {
        const fakeRole = [...playingRoles];
        return fakeRole?.map(el => {
          console.log({el});
          if (el.title === item.title) {
            const ind = fakeRole.filter(item => item.title !== 'شهروند ساده');
            console.log({ind});
            const arr = [...Roles];
            arr.map(item => {
              if (item.title === 'شهروند ساده') item.active = true;
            });
            setGameRoles(arr);
            gameStore.updateRoles(ind);
          }
        });
      }
      gameStore.removeRoles(item);
      const fakeRole = [...gameRoles];
      const selectedIndex = fakeRole.findIndex(el => el.id === item.id);
      fakeRole[selectedIndex].active = true;
      setGameRoles(fakeRole);
    }
  };
  const addCitizen = () => {
    const newCitizen = Roles[8];
    newCitizen.id = Date.now();
    newCitizen.active = false;
    setCitizen(citizen + 1);
    gameStore.addRoles(newCitizen);
  };

  const removeCitizen = () => {
    const lastIndex = playingRoles.length - 1;
    console.log({lastIndex});
    setCitizen(citizen - 1);
    gameStore.roles.splice(lastIndex, 1);
  };

  useEffect(() => {
    console.log({playingRolesLength: playingRoles.length});
    if (playingRoles.length === 0) {
      const arr = [...Roles];
      arr.map(item => {
        item.active = true;
      });

      console.log({Roles: Roles[Roles.length - 1]});
      return setGameRoles(arr);
    }

    if (playingRoles) {
      let len = 0;

      playingRoles.map(item => {
        console.log({playingRoles});
        if (item.title === 'شهروند ساده') {
          len += 1;
          setCitizen(len);
        }
      });
    }
  }, [playingRoles]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingHorizontal: 10,
      }}>
      <View style={styles.header}>
        <Text type="light" style={{fontSize: 20, color: 'white'}}>
          اضافه کردن نقش به این بازی
        </Text>
        <Pressable onPress={() => nav.goBack()}>
          <Icon name="arrow-left" size={20} color={'white'} />
        </Pressable>
      </View>
      <View style={{width: '100%', alignItems: 'flex-end', marginTop: 20}}>
        <Text style={{fontSize: 22, color: 'white'}}>نقش های حاضر در بازی</Text>
      </View>
      {gameRoles?.length ? (
        <FlatList
          data={gameRoles}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatContainer}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <Pressable
                // disabled={!item.active}
                onPress={() => {
                  addRole(item);
                }}
                style={styles.renderItem}>
                <View style={[styles.playerIcon]}>
                  {item.title !== 'شهروند ساده' ? (
                    !item.active ? (
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          zIndex: 100,
                          backgroundColor: 'rgba(256,256,256,0.4)',
                        }}>
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            zIndex: 100,
                            backgroundColor: 'green',
                          }}>
                          <Icon name="check" color="white" size={18} />
                        </View>
                      </View>
                    ) : null
                  ) : !item.active ? (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 100,
                        backgroundColor: 'rgba(256,256,256,0.1)',
                      }}>
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          zIndex: 100,
                          backgroundColor: 'green',
                        }}>
                        <Icon name="check" color="white" size={18} />
                      </View>
                      <View
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 12,
                          width: '60%',
                          left: '20%',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          height: 30,
                          position: 'absolute',
                          flexDirection: 'row',
                          bottom: 40,
                        }}>
                        <Pressable
                          onPress={() => {
                            addCitizen();
                          }}>
                          <Icon name="plus" color="black" size={18} />
                        </Pressable>
                        <Text style={{color: 'black', fontSize: 18}}>
                          {citizen}
                        </Text>
                        <Pressable
                          onPress={() => {
                            if (citizen > 1) {
                              removeCitizen();
                            }
                          }}>
                          <Icon name="minus" color="black" size={18} />
                        </Pressable>
                      </View>
                    </View>
                  ) : null}
                  <Image
                    source={item?.image}
                    resizeMode="contain"
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text style={{fontSize: 16, color: 'white'}}>{item.title}</Text>
              </Pressable>
            );
          }}
        />
      ) : null}
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
    elevation: 5,
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
    height: 200,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerIcon: {
    width: 110,
    height: 170,
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

export {RolesScreen};
