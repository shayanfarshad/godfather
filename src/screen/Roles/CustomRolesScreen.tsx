import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {DWidth} from '../../constants/Constants';
import {Icon} from '../../components/Icon';
import Text from '../../components/Text';
import {spacing} from '../../theme';
import * as storage from '../../utils/storage';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {gameActions, Role} from '../../stores/slices';

const CustomRolesScreen = () => {
  // const {
  //   langStore: {language},
  //   gameStore,
  //   roleStore: {customRoles},
  // } = useStore();
  const dispatch = useAppDispatch();
  const customRoles = useAppSelector(
    state => state.Roles.customRoles,
    shallowEqual,
  );
  const language = useAppSelector(state => state.App.language, shallowEqual);
  const roles = useAppSelector(state => state.Game.roles, shallowEqual);
  const [gameRoles, setGameRoles] = useState<Role[]>([]);
  const [myRoles, setMyRoles] = useState<any>([]);
  const [selectedRoles, setSelectedRoles] = useState<any>([]);
  const [citizen, setCitizen] = useState(1);
  const [mafia, setMafia] = useState(1);
  const getCustomRoles = async () => {
    return await storage.load('customRoles');
  };
  useEffect(() => {
    getCustomRoles().then(customRole => {
      if (customRole) {
        setMyRoles(customRole);
      }
    });
  }, []);

  useEffect(() => {
    console.log({myRoles});
    if (!myRoles) {
      setGameRoles(customRoles);
    } else {
      console.log({customRoles});
      setGameRoles([...myRoles, ...customRoles]);
    }
  }, [customRoles, myRoles]);

  const addRole = (item: any) => {
    // gameStore.setGameType('custom');
    dispatch(gameActions.setGameType('custom'));
    const indexInRoles = selectedRoles.findIndex((i: any) => i?.id === item.id);

    if (indexInRoles === -1) {
      console.log('injast har seri');
      // gameStore.addRoles(item);
      setSelectedRoles([...selectedRoles, item]);
      const fakeRole = [...gameRoles];
      const selectedIndex = fakeRole.findIndex(el => el.id === item.id);
      fakeRole[selectedIndex].active = false;
      setGameRoles(fakeRole);
    } else {
      const newArr2 = [...selectedRoles];
      newArr2.splice(indexInRoles, 1);
      setSelectedRoles(newArr2);
    }
  };

  const handleCountChange = (item: any, action: any) => {
    const newArr2 = selectedRoles.map((i: any) => {
      if (i.id === item.id) {
        if (action === 'increment') {
          return {...i, count: (i.count || 0) + 1};
        } else if (action === 'decrement' && i.count > 0) {
          return {...i, count: (i.count || 0) - 1};
        }
      }
      return i;
    });
    setSelectedRoles(newArr2);
  };

  return (
    <FlatList
      data={gameRoles}
      keyExtractor={item => item.title}
      contentContainerStyle={styles.flatContainer}
      numColumns={3}
      renderItem={({item}) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => {
              console.log({item});
              addRole(item);
            }}
            style={styles.renderItem}>
            <View style={[styles.playerIcon]}>
              {customRoles.some(i => i.id === item.id) ? (
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
                        handleCountChange(item, 'decrement');
                      }}>
                      <Icon name="plus" color="black" size={18} />
                    </Pressable>
                    <Text style={{fontSize: 18}}>{citizen}</Text>
                    <Pressable
                      onPress={() => {
                        handleCountChange(item, 'increment');
                      }}>
                      <Icon name="minus" color="black" size={18} />
                    </Pressable>
                  </View>
                </View>
              ) : null}
              <Image
                source={item?.image}
                resizeMode="contain"
                style={{width: '100%', height: '100%', borderRadius: 10}}
              />
            </View>
            <Text style={{fontSize: language === 'fa' ? spacing.lg : 14}}>
              {item.title}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  flatContainer: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerIcon: {
    width: 110,
    height: 140,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
export {CustomRolesScreen};
