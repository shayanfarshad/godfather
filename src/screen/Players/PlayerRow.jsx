import React from 'react';
import {Image, Pressable, View} from 'react-native';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../theme';

const PlayerRow = ({item, removeItem}) => {

  return (
    <View
      style={{
        flexDirection: 'row-reverse',
        alignItems: 'center',
        height: 70,
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
        <View
          style={{width: 50, height: 50, borderRadius: 25, overflow: 'hidden'}}>
          <Image
            source={
              item?.avatar
                ? {uri: item?.avatar}
                : require('../../assets/images/player2.png')
            }
            style={{width: 50, height: 50}}
          />
        </View>
        <View style={{marginRight: 10}}>
          <Text style={{}}>{item?.name}</Text>
        </View>
      </View>
      <View>
        <Pressable
          style={{
            width: 60,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={removeItem}>
          <Icon name="trash" size={30} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
};

export {PlayerRow};
