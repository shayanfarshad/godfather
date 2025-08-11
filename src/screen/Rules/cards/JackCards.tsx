import React from 'react';
import {FlatList, View} from 'react-native';
import {CardItem} from '../CardItem';
import {shallowEqual} from 'react-redux';
import { useAppSelector } from '../../../stores/hooks';

const JackCards = () => {
  const jackRoles = useAppSelector(
    state => state.Roles.jackRoles,
    shallowEqual,
  );
  console.log({jackRoles})
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={jackRoles}
        keyExtractor={item => item.title}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        renderItem={({item, index}) => {
          return <CardItem item={item} key={item.id} />;
        }}
      />
    </View>
  );
};

export {JackCards};
