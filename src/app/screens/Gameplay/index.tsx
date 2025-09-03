// src/app/screens/GameplaySetup/index.tsx
import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from 'src/app/theme';
import { hp, tokens, wp } from 'src/app/theme/tokens';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from 'src/app/store';
import Text from 'src/components/common/Text';
import { GamePlayStackParamList } from 'src/app/navigation/types';

export default function GameplaySetup() {
  const { colors } = useTheme();
  const { t } = useTranslation('common');
  const nav = useNavigation<NativeStackNavigationProp<GamePlayStackParamList>>();

  const { selectedPlayerIds, scenario, roles } = useAppSelector(s => s.GameSetup);
  const playersCount = selectedPlayerIds.length;
  const rolesCount = useMemo(() => roles.reduce((a, r) => a + (r.count || 1), 0), [roles]);
  const canAssign = playersCount > 0 && scenario && rolesCount === playersCount;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text type="bold" style={[styles.header, { color: colors.text }]}>{t('gameplay.title')}</Text>

      {/* Card: Players */}
      <Pressable
        onPress={() => nav.navigate('SelectPlayers')}
        style={[styles.card, { backgroundColor: colors.bgAlt,borderColor: colors.surface }]}
      >
        <Text type="bold" style={[styles.cardTitle, { color: colors.text }]}>{t('gameplay.players')}</Text>
        <Text style={{ color: colors.subtext }}>
          {t('gameplay.players.count')}: {playersCount}
        </Text>
      </Pressable>

      {/* Card: Scenario */}
      <Pressable
        onPress={() => nav.navigate('SelectScenario')}
        style={[styles.card, { backgroundColor: colors.bgAlt,borderColor: colors.surface }]}
      >
        <Text type="bold" style={[styles.cardTitle, { color: colors.text }]}>{t('gameplay.selectScenario')}</Text>
        <Text style={{ color: colors.subtext }}>
          {t('gameplay.choosenScenario')}: {scenario ? t(`game.scenarios.${scenario}.name`) : '—'}
        </Text>
        <Text style={{ color: colors.subtext }}>
          {t('gameplay.roles.count')}: {rolesCount}
        </Text>
      </Pressable>

      {/* Card: Assign */}
      <Pressable
        disabled={!canAssign}
        onPress={() => nav.navigate('AssignRoles')}
        style={[
          styles.primaryBtn,
          { backgroundColor: canAssign ? colors.primary : colors.surface }
        ]}
      >
        <Text type="bold" style={{ color: '#111' }}>{t('gameplay.assignRoles')}</Text>
      </Pressable>

      {!scenario && (
        <Text style={{ color: colors.subtext, marginTop: tokens.spacing(1) }}>
          {t('gameplay.assign.hint.scenario')}
        </Text>
      )}
      {!!scenario && rolesCount !== playersCount && (
        <Text style={{ color: colors.subtext, marginTop: tokens.spacing(1) }}>
          {t('gameplay.assign.hint.mismatch')}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: tokens.spacing(2), gap: tokens.spacing(1.5),paddingTop: tokens.spacing(6) },
  header: { fontSize: tokens.font.h1, marginBottom: tokens.spacing(1) },
  card: { borderWidth: 1, borderRadius: tokens.radius.lg, padding: tokens.spacing(2), gap: tokens.spacing(0.5) },
  cardTitle: { fontSize: tokens.font.h2 },
  primaryBtn: {
    height: tokens.spacing(6.5),
    position:"absolute",
    bottom:hp(8),
    width:wp(90),
    left:wp(5),
    borderRadius: tokens.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
