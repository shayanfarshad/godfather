import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {useStore} from '../../constants/useStore';
import Text from '../../components/Text';
import {CardItem} from './CardItem';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {colors} from '../../theme';
import {translate} from '../../i18n';

const LearningScreen = observer(() => {
  const {roleStore} = useStore();
  const nav = useNavigation();
  const roles = roleStore.getRoles();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: colors.background,
      }}>
      <Header
        title={translate('learn.title')}
        backIcon={'chevron-left'}
        backPress={() => {
          nav.goBack();
        }}
      />
      <Pressable style={styles.card} onPress={() => nav.navigate('roleCards')}>
        <Text type="bold" style={{fontSize: 20, color: 'white'}}>
          {translate('game.roles')}
        </Text>
      </Pressable>
      <Pressable style={styles.card} onPress={() => nav.navigate('lastMoves')}>
        <Text type="bold" style={{fontSize: 20, color: 'white'}}>
          {translate('game.lastMoveCards')}
        </Text>
      </Pressable>
      <Pressable style={styles.card} onPress={() => nav.navigate('rules')}>
        <Text type="bold" style={{fontSize: 20, color: 'white'}}>
          {translate('game.senario')}
        </Text>
      </Pressable>
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
  card: {
    width: '90%',
    marginLeft: '5%',
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    marginBottom: 15,
    marginTop: 5,
  },
});

export {LearningScreen};
