import React from 'react';
import {FlatList, View} from 'react-native';
import {useStore} from '../../../constants/useStore';
import {CardItem} from '../CardItem';
import {DWidth} from '../../../constants/Constants';

const JackCards = () => {
  const {
    roleStore: {jackRoles},
  } = useStore();
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={jackRoles}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: DWidth * 0.95,
          marginHorizontal: DWidth * 0.025,
        }}
        renderItem={({item, index}) => {
          return (
            <CardItem item={item} index={index} key={item.id} type={'jack'} />
          );
        }}
      />
    </View>
  );
};

export {JackCards};
