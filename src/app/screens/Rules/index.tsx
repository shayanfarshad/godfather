import React, { useMemo } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRulesLogic } from './logic';
import { useTheme } from 'src/app/theme';
import { tokens } from 'src/app/theme/tokens';
import { t } from 'i18next';

export default function Rules() {
  const { colors } = useTheme();
  const { t } = useTranslation('common');
  const { premiumActive, source, list, selected, onTab, onSelectScenario } = useRulesLogic();

  const isCustom = source === 'custom';
  const isEmptyCustom = isCustom && list.length === 0;
  const rolesData = useMemo(() => selected?.roles ?? [], [selected]);

  const ListHeader = (
    <>
      {/* Scenario picker or empty state */}
      {isEmptyCustom ? (
        <View style={[styles.empty, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.subtext }}>{t('rules.empty.custom')}</Text>
          <Pressable onPress={() => {}} style={[styles.cta, { backgroundColor: colors.premium }]}>
            <Text style={{ color: '#1b1a1a', fontWeight: '800' }}>{t('rules.make.custom')}</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Scenario selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: tokens.spacing(2) }}
            style={{ marginTop: tokens.spacing(1) }}
          >
            {list.map((item, idx) => {
              const active = selected?.id === item.id;
              const locked = item.premiumOnly && !premiumActive;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => !locked && onSelectScenario(item.id)}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: active ? colors.primary : colors.surface,
                      borderColor: active ? 'transparent' : colors.border,
                      opacity: locked ? 0.5 : 1,
                      marginRight: idx === list.length - 1 ? 0 : tokens.spacing(1),
                    },
                  ]}
                >
                  <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700' }}>
                    {t(item.name)}
                  </Text>
                  {item.premiumOnly ? (
                    <Text style={{ marginLeft: tokens.spacing(0.8), color: active ? '#fff' : colors.text }}>★</Text>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Scenario description */}
          {selected && (
            <View style={{ paddingHorizontal: tokens.spacing(2), marginTop: tokens.spacing(2) }}>
              <Block title={t('rules.description')}>
                <Text style={{ color: colors.subtext, lineHeight: tokens.spacing(2.2) }}>
                  {t(selected?.description || '') || '—'}
                </Text>
                <Text style={{ color: colors.subtext, marginTop: tokens.spacing(1) }}>
                  {`(${selected.minPlayers}–${selected.maxPlayers} players)`}
                </Text>
              </Block>

              <Text style={[styles.rolesTitle, { color: colors.text }]}>{t('rules.roles')}</Text>
            </View>
          )}
        </>
      )}
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* ثابت */}
      <Text style={[styles.header, { color: colors.text }]}>{t('rules.title')}</Text>
      <View style={styles.tabs}>
        <Tab label={t('rules.tab.builtin')} active={source === 'builtin'} onPress={() => onTab('builtin')} />
        <Tab label={t('rules.tab.custom')}  active={source === 'custom'}  onPress={() => onTab('custom')} />
      </View>

      {/* اسکرول */}
      <FlatList
        data={rolesData}
        keyExtractor={(r) => r.id.toString()}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: tokens.spacing(4) }}
        ItemSeparatorComponent={() => <View style={{ height: tokens.spacing(1) }} />}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: tokens.spacing(2) }}>
            <RoleCard name={item.name} team={item.team} description={item.description} />
          </View>
        )}
        nestedScrollEnabled
      />
    </View>
  );
}

/* ---------- helpers مثل قبل ---------- */
function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tab,
        { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? 'transparent' : colors.border },
      ]}
    >
      <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.block, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.blockTitle, { color: colors.text }]}>{title}</Text>
      <View style={{ marginTop: tokens.spacing(1) }}>{children}</View>
    </View>
  );
}

function RoleCard({ name, team, description }: { name: string; team: 'mafia' | 'town' | 'neutral'; description?: string }) {
  const { colors } = useTheme();
  const chipBg = team === 'mafia' ? '#ef4444' : team === 'town' ? '#22c55e' : '#eab308';
  const chipFg = '#111';
  return (
    <View style={[styles.roleCard, { backgroundColor: colors.bgAlt, borderColor: colors.border }]}>
      <View style={[styles.chip, { backgroundColor: chipBg }]}>
        <Text style={{ color: chipFg, fontWeight: '800' }}>{team.toUpperCase()}</Text>
      </View>
      <Text style={[styles.roleName, { color: colors.text }]}>{t(name)}</Text>
      {!!description && <Text style={[styles.roleDesc, { color: colors.subtext }]}>{t(description)}</Text>}
    </View>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    fontSize: tokens.font.h1,
    fontWeight: '800',
    paddingHorizontal: tokens.spacing(2),
    paddingTop: tokens.spacing(3),
    paddingBottom: tokens.spacing(1.2),
  },

  tabs: {
    flexDirection: 'row',
    gap: tokens.spacing(1),
    paddingHorizontal: tokens.spacing(2),
    marginBottom: tokens.spacing(1),
  },
  tab: {
    flex: 1,
    height: tokens.spacing(6),
    borderRadius: tokens.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  pill: {
    paddingHorizontal: tokens.spacing(1.5),
    height: tokens.spacing(5),
    borderRadius: tokens.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
  },

  block: {
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing(2),
    marginBottom: tokens.spacing(2),
  },
  blockTitle: {
    fontSize: tokens.font.h2,
    fontWeight: '800',
  },

  rolesTitle: {
    fontSize: tokens.font.h2,
    fontWeight: '800',
    marginBottom: tokens.spacing(1),
  },

  roleCard: {
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing(2),
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: tokens.spacing(1),
    paddingVertical: tokens.spacing(0.8),
    borderRadius: tokens.radius.lg / 2,
    marginBottom: tokens.spacing(1),
  },
  roleName: {
    fontSize: tokens.font.body,
    fontWeight: '800',
    marginBottom: tokens.spacing(1),
  },
  roleDesc: {
    fontSize: tokens.font.small,
    lineHeight: tokens.spacing(2.5),
  },

  empty: {
    margin: tokens.spacing(2),
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing(1.5),
  },
  cta: {
    paddingHorizontal: tokens.spacing(2),
    paddingVertical: tokens.spacing(1.2),
    borderRadius: tokens.radius.lg,
  },
});
