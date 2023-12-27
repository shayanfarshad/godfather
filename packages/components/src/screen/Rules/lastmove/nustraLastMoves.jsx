import React from 'react';
import {FlatList, View} from 'react-native';
import {useStore} from '../../../constants/useStore';
import {CardItem} from '../CardItem';
import {DWidth} from '../../../constants/Constants';

const NustraLastMove = () => {
  const {
    gameStore: {nustraLastMove},
  } = useStore();
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
        keyExtractor={item => item.id}
        contentContainerStyle={{}}
        renderItem={({item, index}) => {
          return <CardItem item={item} index={index} key={item.id} />;
        }}
      />
    </View>
  );
};

export {NustraLastMove};
