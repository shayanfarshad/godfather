// src/app/screens/GameplaySetup/AssignRolesScreen.tsx
import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useTheme } from 'src/app/theme';
import { tokens } from 'src/app/theme/tokens';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/store';
import Text from 'src/components/common/Text';

export default function AssignRolesScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation('common');

  const { selectedPlayerIds, scenario, roles } = useAppSelector(s => s.GameSetup);

  const expandedRoles = useMemo(() => {
    // آرایه نقش‌ها را با توجه به count گسترش بده
    const arr: { key: string }[] = [];
    roles.forEach(r => {
      const c = r.count ?? 1;
      for (let i = 0; i < c; i++) arr.push({ key: r.key });
    });
    return arr;
  }, [roles]);

  const canGo = scenario && selectedPlayerIds.length > 0 && selectedPlayerIds.length === expandedRoles.length;

  const onShuffle = () => {
    if (!canGo) {
      Alert.alert(t('assignRoles'), t('gameplay.assign.hint.mismatch'));
      return;
    }
    const seats = [...expandedRoles];
    // فیشر-یتس
    for (let i = seats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [seats[i], seats[j]] = [seats[j], seats[i]];
    }
    // map
    const pairs = selectedPlayerIds.map((pid, idx) => ({ playerId: pid, roleKey: seats[idx].key }));
    // اینجا می‌تونی dispatch کنی به slice بازی، یا بری به صفحه RoleReveal
    Alert.alert(t('shuffle'), t('gameplay.deal.ready'));
    // navigation.navigate('RoleReveal', { ... })
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text type="bold" style={[styles.header, { color: colors.text }]}>{t('assignRoles')}</Text>
      <Text style={{ color: colors.subtext, marginBottom: tokens.spacing(1) }}>
        {t('players.count')}: {selectedPlayerIds.length} — {t('roles.count')}: {expandedRoles.length}
      </Text>

      <Pressable
        disabled={!canGo}
        onPress={onShuffle}
        style={[
          styles.primaryBtn,
          { backgroundColor: canGo ? colors.primary : colors.border }
        ]}
      >
        <Text type="bold" style={{ color: '#111' }}>{t('shuffle')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: tokens.spacing(2) },
  header: { fontSize: tokens.font.h1, marginBottom: tokens.spacing(1) },
  primaryBtn: {
    height: tokens.spacing(6.5),
    borderRadius: tokens.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
