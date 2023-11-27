import React from 'react';
import {FlatList, View} from 'react-native';
import {useStore} from '../../../constants/useStore';
import {CardItem} from '../CardItem';
import {DWidth} from '../../../constants/Constants';

const NustraCards = () => {
  const {
    roleStore: {nustraRoles},
  } = useStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={nustraRoles}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // width: DWidth,
            // marginHorizontal: DWidth * 0.05,
          }
        }
        renderItem={({item, index}) => {
          console.log({item});
          return <CardItem item={item} index={index} key={item.id} />;
        }}
      />
    </View>
  );
};

export {NustraCards};
