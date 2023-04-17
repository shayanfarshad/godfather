import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {Text} from '../../components/Text';
import {useStore} from '../../constants/useStore';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import ReactNativeModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ShowCards = () => {
  const {gameStore} = useStore();
  const nav = useNavigation();
  const rolePlayers = gameStore.rolePlayers;
  const [gamers, setGamers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detailPlayer, setDetailPlayer] = useState();

  useEffect(() => {
    if (rolePlayers) {
      setGamers(rolePlayers);
    }
  }, [rolePlayers]);

  const endShowCard = () => {
    setShowModal(false);
    const arr = gamers.filter(
      el => el.player.name !== detailPlayer.player.name,
    );
    setGamers(arr);
    setDetailPlayer(null);
  };
  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <View style={styles.header}>
        <Text type="light" style={{fontSize: 20, color: 'white'}}>
          نمایش نقش ها
        </Text>
        {/* <Pressable onPress={() => nav.goBack()}>
          <Icon name="long-arrow-left" size={30} color={'white'} />
        </Pressable> */}
      </View>
      <FlatList
        data={gamers}
        keyExtractor={(index, item) => index}
        numColumns={3}
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
            <Pressable
              style={styles.renderItem}
              key={index}
              onPress={() => {
                setDetailPlayer(item);
                setShowModal(true);
              }}>
              <Image
                source={require('../../assets/images/player2.png')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Text style={{color: 'white'}}>{item.player.name}</Text>
            </Pressable>
          );
        }}
      />
      <Pressable
        style={{
          width: 200,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          marginLeft: DWidth / 2 - 100,
        }}
        onPress={() => {
          if (!gamers.length) {
            nav.navigate('gameplay');
          }
        }}>
        <Text style={{fontSize: 18}}>برو به بازی</Text>
      </Pressable>
      <ReactNativeModal
        isVisible={showModal}
        deviceWidth={DWidth}
        deviceHeight={DHeight}
        onBackButtonPress={() => {
          endShowCard();
        }}
        onBackdropPress={() => {
          endShowCard();
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
    </View>
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
    width: DWidth / 3.4,
    height: 105,
    marginBottom: 15,
    justifyContent: 'space-between',
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
export {ShowCards};