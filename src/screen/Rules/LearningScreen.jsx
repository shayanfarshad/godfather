import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {DWidth, hp} from '../../constants/Constants';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {colors, spacing} from '../../theme';
import {t} from 'i18next';

const LearningScreen = () => {
  const nav = useNavigation();

  return (
    <View style={styles.learnContainer}>
      <Header title={t('learn.title')} />
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}
        onPress={() => nav.navigate('roleCards')}>
        <Text style={{fontSize: hp(2.5)}}>{t('game.roles')}</Text>
      </Pressable>
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}
        onPress={() => nav.navigate('lastMoves')}>
        <Text style={{fontSize: hp(2.5)}}>
          {'  '}
          {t('game.lastMoveCards')}
          {'  '}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}
        onPress={() => nav.navigate('rules')}>
        <Text style={{fontSize: hp(2.5)}}>{t('game.senario')}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  learnContainer: {
    flex: 1,
    paddingTop: hp(2),
    backgroundColor: colors.background,
  },
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
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
});

export {LearningScreen};
