import React from 'react';
import {FlatList, View} from 'react-native';
import {CardItem} from '../CardItem';
import {DWidth} from '../../../constants/Constants';
import {useAppSelector} from '../../../stores/hooks';
import {shallowEqual} from 'react-redux';

const JackLastMove = () => {
  const jackLastMove = useAppSelector(
    state => state.Game.jackLastMove,
    shallowEqual,
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={jackLastMove}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.title}
        contentContainerStyle={
          {
            // width: DWidth * 0.95,
            // marginHorizontal: DWidth * 0.025,
          }
        }
        renderItem={({item, index}) => {
          return <CardItem item={item} key={item.title} />;
        }}
      />
    </View>
  );
};

export {JackLastMove};
