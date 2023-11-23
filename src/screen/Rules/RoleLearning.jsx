import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {useStore} from '../../constants/useStore';
import Text from '../../components/Text';
import {CardItem} from './CardItem';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

const RoleLearning = observer(() => {
  const {roleStore} = useStore();
  const nav = useNavigation();
  const roles = roleStore.getRoles();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: backgroundColor,
      }}>
      <Header
        title={'نقش ها'}
        backIcon={'chevron-left'}
        backPress={() => {
          nav.goBack();
        }}
      />

      <FlatList
        data={roles}
        keyExtractor={(index, item) => item.id}
        contentContainerStyle={{
          width: DWidth,
          // marginTop: 20,
          marginHorizontal: DWidth * 0.05,
        }}
        ListEmptyComponent={() => {
          return (
            <View style={[styles.emptyList, {justifyContent: 'flex-start'}]}>
              <Image
                source={require('../../assets/images/empty1.png')}
                style={{width: '30%', height: 100}}
              />
              <Text style={{fontSize: 20, color: 'white'}}>
                هیچ بازیکنی از بازی خارج نشده
              </Text>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return <CardItem item={item} index={index} key={item.id} />;
        }}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 40,
  },
  renderItem: {
    width: DWidth * 0.9,
    // height: 80,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export {RoleLearning};
