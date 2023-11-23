import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {useStore} from '../../constants/useStore';
import Text from '../../components/Text';
import {CardItem} from './CardItem';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

const LastMoves = observer(() => {
  const {gameStore} = useStore();
  const nav = useNavigation();
  const lastMoves = gameStore.lastMoveCards;
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: backgroundColor,
      }}>
      <Header
        title={'حرکت های آخر'}
        backIcon={'chevron-left'}
        backPress={() => {
          nav.goBack();
        }}
      />

      <FlatList
        data={lastMoves}
        keyExtractor={(index, item) => item.id}
        contentContainerStyle={{
          width: DWidth,
          // marginTop: 20,
          marginHorizontal: DWidth * 0.05,
        }}
        renderItem={({item, index}) => {
          return <CardItem item={item} index={index} key={item.id} />;
        }}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 40,
  },
  renderItem: {
    width: DWidth * 0.9,
    // height: 80,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export {LastMoves};
