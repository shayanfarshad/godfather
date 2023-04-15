import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Text} from '../../components/Text';

const PlayerListScreen = () => {
  const getPlayers = async () => {
    return await AsyncStorage.getItem('players');
  };
  useEffect(() => {
    getPlayers().then(res => {
      console.log({res});
    });
  }, []);

  return (
    <View>
        
      <Text>sala</Text>
    </View>
    // <FlatList
    //   data={players}
    //   keyExtractor={item => item.id}
    //   renderItem={({item}) => {
    //     return (
    //       <View key={item.id}>
    //         <Text>{item.name}</Text>
    //       </View>
    //     );
    //   }}
    // />
  );
};

export {PlayerListScreen};
