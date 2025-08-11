import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {DWidth, hp, wp} from '../../constants/Constants';
import {Icon} from '../../components/Icon';
import Text from '../../components/Text';
import {spacing} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {gameActions, Role} from '../../stores/slices';
import {t} from 'i18next';

const JackRolesScreen = () => {
  const dispatch = useAppDispatch();
  const jackRoles = useAppSelector(
    state => state.Roles.jackRoles,
    shallowEqual,
  );
  const language = useAppSelector(state => state.App.language, shallowEqual);
  const roles = useAppSelector(state => state.Game.roles, shallowEqual);
  const [gameRoles, setGameRoles] = useState<Role[]>([]);
  const [citizen, setCitizen] = useState(1);

  useEffect(() => {
    setGameRoles(jackRoles);
  }, [jackRoles]);

  useEffect(() => {
    const citizenCount = roles?.filter(
      role => role.title === 'game.citizen',
    ).length;
    setCitizen(citizenCount);
    setGameRoles(prevGameRoles =>
      prevGameRoles.map(gameRole => {
        const matchingRole = roles.find(role => role.id === gameRole.id);
        return matchingRole ? {...gameRole, active: false} : gameRole;
      }),
    );
  }, [roles]);

  const addRole = (item: Role) => {
    dispatch(gameActions.setGameType('jack'));

    // Check if the role is already added
    const existItem = roles.findIndex(el => el.id === item.id);

    if (existItem === -1) {
      // Role not found, so add it
      setGameRoles(prevGameRoles => {
        // Create a new array and update the active status
        const updatedRoles = prevGameRoles.map(role =>
          role.id === item.id ? {...role, active: false} : role,
        );

        // Dispatch the action to add the role to Redux
        dispatch(gameActions.addRole(item));
        return updatedRoles;
      });
    } else {
      // If the role is already in the list and it's 'game.citizen'
      if (item.title === 'game.citizen') {
        setGameRoles(prevGameRoles => {
          const updatedRoles = jackRoles.map(role =>
            role.title === 'game.citizen' ? {...role, active: true} : role,
          );

          // Filter out all 'game.citizen' roles from the roles array in Redux
          const filteredRoles = roles.filter(
            role => role.title !== 'game.citizen',
          );
          dispatch(gameActions.updateRoles(filteredRoles));

          return updatedRoles;
        });
      } else {
        // Remove the item if it’s in the list but not 'game.citizen'
        dispatch(gameActions.removeRole(item));
        setGameRoles(prevGameRoles => {
          const updatedRoles = prevGameRoles.map(role =>
            role.id === item.id ? {...role, active: true} : role,
          );
          return updatedRoles;
        });
      }
    }
  };

  const addCitizen = () => {
    // Clone and modify the citizen role, assigning a unique ID
    const newCitizen = {...jackRoles[8], id: Date.now(), active: false};

    // Update the citizen count
    setCitizen(prevCount => prevCount + 1);

    // Dispatch the action to add this new citizen role to Redux
    dispatch(gameActions.addRole(newCitizen));
  };

  const removeCitizen = () => {
    // Check if the citizen count is about to reach 0
    if (citizen <= 1) {
      // Filter out any roles that are 'game.citizen' in gameRoles
      setGameRoles(prevGameRoles =>
        prevGameRoles.filter(role => role.title !== 'game.citizen'),
      );

      // Update Redux state by removing all 'game.citizen' roles from roles
      const filteredRoles = roles.filter(role => role.title !== 'game.citizen');
      dispatch(gameActions.updateRoles(filteredRoles));

      // Set citizen count to 0 since all citizens are removed
      setCitizen(0);
    } else {
      // If citizens remain, decrease count and update roles immutably
      setCitizen(prevCount => prevCount - 1);

      // Create a new array for roles, removing the last citizen
      const newRoles = roles.slice(0, -1); // Removes last item
      dispatch(gameActions.updateRoles(newRoles));
    }
  };

  return (
    // {gameRoles?.length ? (
    <FlatList
      data={gameRoles}
      keyExtractor={item => item.title}
      contentContainerStyle={styles.flatContainer}
      numColumns={3}
      renderItem={({item}) => {
        console.log({item});
        return (
          <Pressable
            key={item.id}
            // disabled={!item.active}
            onPress={() => {
              addRole(item);
            }}
            style={styles.renderItem}>
            <View style={[styles.playerIcon]}>
              {item.title !== 'game.citizen' ? (
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
                    <Text style={{fontSize: 18}}>{citizen}</Text>
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
            <Text
              style={{
                fontSize: language === 'fa' ? hp(2) : hp(2),
                marginTop: hp(1),
              }}>
              {t(item.title)}
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
    marginTop: hp(2),
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
    width: wp(32),
    height: hp(22),
    marginBottom: hp(1),
    alignItems: 'center',
  },
  playerIcon: {
    width: wp(25),
    height: hp(16),
    borderRadius: 12,
    overflow: 'hidden',
  },
});
export {JackRolesScreen};
