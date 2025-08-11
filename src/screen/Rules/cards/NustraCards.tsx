import React from 'react';
import {FlatList, View} from 'react-native';
import {CardItem} from '../CardItem';
import {useAppSelector} from '../../../stores/hooks';
import {shallowEqual} from 'react-redux';

const NustraCards = () => {
  const nustraRoles = useAppSelector(
    state => state.Roles.nustraRoles,
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
        data={nustraRoles}
        keyExtractor={item => item.title}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        renderItem={({item}) => {
          return <CardItem item={item} key={item.id} />;
        }}
      />
    </View>
  );
};

export {NustraCards};
