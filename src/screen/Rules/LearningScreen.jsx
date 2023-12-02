import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Pressable, StyleSheet, View} from 'react-native';
import {DWidth} from '../../constants/Constants';
import {useStore} from '../../constants/useStore';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {colors, spacing} from '../../theme';
import {translate} from '../../i18n';

const LearningScreen = observer(() => {
  const {
    themeStore: {isDark},
    langStore: {language},
  } = useStore();
  const nav = useNavigation();

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
        // backIcon={language === 'fa' ? 'chevron-left' : 'chevron-right'}
        // backPress={() => {
        //   nav.goBack();
        // }}
      />
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}
        onPress={() => nav.navigate('roleCards')}>
        <Text type="bold" style={{fontSize: spacing.xl}}>
          {translate('game.roles')}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}
        onPress={() => nav.navigate('lastMoves')}>
        <Text style={{fontSize: spacing.xl}}>
          {translate('game.lastMoveCards')}
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
        <Text style={{fontSize: spacing.xl}}>{translate('game.senario')}</Text>
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
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
});

export {LearningScreen};
