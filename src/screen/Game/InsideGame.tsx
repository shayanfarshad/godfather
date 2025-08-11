import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {PlayerDetail} from './PlayerDetail';
import {DHeight, DWidth} from '../../constants/Constants';
import {colors} from '../../theme';
import ReactNativeModal from 'react-native-modal';
import Text from '../../components/Text';
import {showToast} from '../../utils/snackbar';
import {useAppDispatch, useAppSelector} from '../../stores/hooks';
import {shallowEqual} from 'react-redux';
import {gameActions, Player, Role} from '../../stores/slices';
import {t} from 'i18next';

const InsideGame = () => {
  // const {gameStore} = useStore();
  // const gameStore = useAppSelector(state=> state.Game)
  const players = useAppSelector(state => state.Game.rolePlayers, shallowEqual);

  const dispatch = useAppDispatch();
  const [gamers, setGamers] = useState<{player: Player; role: Role}[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [removedPlayers, setRemovedPlayers] = useState<any>([]);
  const [detailPlayer, setDetailPlayer] = useState<{
    player: Player;
    role: Role;
  }>();
  const [showRole, setShowRole] = useState(false);

  const removeDeadPlayer = (p: any) => {
    const removed = [...removedPlayers];
    removed.push(p);
    const arr = gamers.filter(el => el?.player?.id !== p?.player?.id);
    dispatch(gameActions.updateRolePlayers(arr));
    setRemovedPlayers(removed);
    dispatch(gameActions.updateRemovedPlayers(removed));
    showToast({
      text: t('game.playerRemovedFromGame', {
        player: p.player.name,
      }),
      duration: 5000,
      mode: 'warning',
    });
  };
  useEffect(() => {
    if (players) {
      setGamers(players);
    }
  }, [players]);
  return (
    <View style={{flex: 1, paddingBottom: 20}}>
      <FlatList
        data={gamers}
        keyExtractor={item => item.player.name}
        contentContainerStyle={{
          width: DWidth * 0.9,
          //   marginTop: 20,
          //   marginBottom: 50,
          //   minHeight: DHeight * 0.6,
          marginHorizontal: DWidth * 0.05,
        }}
        renderItem={({item, index}) => {
          return (
            <PlayerDetail
              key={item.player.id}
              item={item}
              setRemovePlayer={(p: any) => removeDeadPlayer(p)}
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
        }}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: colors.cardBackground,
            },
          ]}>
          <View
            style={{
              width: DWidth / 2,
              height: 250,
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
            <Text style={{fontSize: 26}}>{detailPlayer?.role.title}</Text>
            <Text style={{fontSize: 24}}>{detailPlayer?.player.name}</Text>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    elevation: 2,
    justifyContent: 'center',
    width: '50%',
    height: 300,
  },
  modalView: {
    width: DWidth / 1.5,
    height: DHeight / 1.75,
    marginHorizontal: DWidth / 8.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
});

export {InsideGame};
