import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useStore} from '../../constants/useStore';
import {DWidth} from '../../constants/Constants';
import {Icon} from '../../components/Icon';
import Text from '../../components/Text';

const NustraRolesScreen = observer(() => {
  const {
    roleStore: {nustraRoles},
    gameStore,
  } = useStore();
  const roles = gameStore.getRoles();
  //   const addRoles = gameStore.addRoles;
  const [gameRoles, setGameRoles] = useState([]);
  const [citizen, setCitizen] = useState(1);

  useEffect(() => {
    setGameRoles(nustraRoles);
  }, [nustraRoles]);

  const addRole = item => {
    const existItem = roles.findIndex(el => el === item);
    if (existItem === -1) {
      console.log({item});
      gameStore.addRoles(item);
      const fakeRole = [...gameRoles];
      const selectedIndex = fakeRole.findIndex(el => el.id === item.id);
      fakeRole[selectedIndex].active = false;
      setGameRoles(fakeRole);
    } else {
      if (item.title === 'شهروند ساده') {
        const fakeRole = [...roles];
        return fakeRole?.map(el => {
          if (el.title === item.title) {
            const ind = fakeRole.filter(item => item.title !== 'شهروند ساده');
            const arr = [...jackRoles];
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
    const newCitizen = nustraRoles[8];
    newCitizen.id = Date.now();
    newCitizen.active = false;
    setCitizen(citizen + 1);
    gameStore.addRoles(newCitizen);
  };

  const removeCitizen = () => {
    const lastIndex = roles.length - 1;
    setCitizen(citizen - 1);
    gameStore.roles.splice(lastIndex, 1);
  };

  return (
    // {gameRoles?.length ? (
    <FlatList
      data={nustraRoles}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatContainer}
      numColumns={3}
      renderItem={({item}) => {
        return (
          <Pressable
            key={item.id}
            // disabled={!item.active}
            onPress={() => {
              //   console.log({item});
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
                style={{width: '100%', height: '100%', borderRadius: 10}}
              />
            </View>
            <Text style={{fontSize: 16, color: 'white'}}>{item.title}</Text>
          </Pressable>
        );
      }}
    />
  );
});

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
export {NustraRolesScreen};
