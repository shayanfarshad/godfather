import React from 'react';
import {FlatList, View} from 'react-native';
import {CardItem} from '../CardItem';
import {useAppSelector} from '../../../stores/hooks';
import {shallowEqual} from 'react-redux';

const NustraLastMove = () => {
  // const {
  //   gameStore: {nustraLastMove},
  // } = useStore();

  const nustraLastMove = useAppSelector(
    state => state.Game.nustraLastMove,
    shallowEqual,
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={nustraLastMove}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.title}
        contentContainerStyle={{}}
        renderItem={({item}) => {
          return <CardItem item={item} key={item.id} />;
        }}
      />
    </View>
  );
};

export {NustraLastMove};
