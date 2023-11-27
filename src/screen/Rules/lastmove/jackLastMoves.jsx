import React from 'react';
import {FlatList, View} from 'react-native';
import {useStore} from '../../../constants/useStore';
import {CardItem} from '../CardItem';
import {DWidth} from '../../../constants/Constants';

const JackLastMove = () => {
  const {
    gameStore: {jackLastMove},
  } = useStore();
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={jackLastMove}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          width: DWidth,
        }}
        renderItem={({item, index}) => {
          return <CardItem item={item} index={index} key={item.id} />;
        }}
      />
    </View>
  );
};

export {JackLastMove};
