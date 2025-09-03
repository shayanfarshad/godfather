import React, { useMemo } from 'react';
import { View, Pressable, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useRulesLogic } from './logic';
import { useTheme } from 'src/app/theme';
import { hp, tokens } from 'src/app/theme/tokens';
import Text from 'src/components/common/Text';
import { useTranslation } from 'react-i18next';

export default function Rules() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { premiumActive, source, list, selected, onTab, onSelectScenario, lang } = useRulesLogic();

  const isCustom = source === 'custom';
  const isEmptyCustom = isCustom && list.length === 0;
  const rolesData = useMemo(() => selected?.roles ?? [], [selected]);

  const ListHeader = (
    <>
      {/* Scenario picker or empty state */}
      {isEmptyCustom ? (
        <View style={[styles.empty, { backgroundColor: colors.bgAlt }]}>
          <Text style={{ color: colors.text }}>{t('rules.empty.custom')}</Text>
          <Pressable onPress={() => { }} style={[styles.cta, { backgroundColor: colors.premium }]}>
            <Text type='bold' style={{
              color: colors.bg

            }}>{t('rules.make.custom')}</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Scenario selector */}
          <ScrollView
            horizontal

            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: tokens.spacing(2) }}
            style={{ paddingVertical: tokens.spacing(1), direction: lang === "fa" ? "rtl" : "ltr" }}
            contentInsetAdjustmentBehavior="automatic"

          >
            {[...list]
              .sort((a, b) => {
                if (a.premiumOnly && !b.premiumOnly) return 1;
                if (!a.premiumOnly && b.premiumOnly) return -1;
                return 0;
              })
              .map((item, idx, arr) => {
                const active = selected?.id === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => onSelectScenario(item.id)}
                    style={[
                      styles.pill,
                      {
                        backgroundColor: active ? colors.primary : colors.surface,

                        marginRight: tokens.spacing(1),
                      },
                    ]}
                  >
                    <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700' }}>
                      {t(item.name)}
                    </Text>
                    {item.premiumOnly && (
                      <Text style={{ marginLeft: tokens.spacing(0.8), color: active ? '#fff' : colors.text }}>★</Text>
                    )}
                  </Pressable>
                );
              })}
          </ScrollView>

          {/* Scenario description */}
          {selected && (
            <View style={{ paddingHorizontal: tokens.spacing(2), marginTop: tokens.spacing(2) }}>
              <Block title={t('rules.description')}>
                <Text style={{ color: colors.white }}>
                  {t(selected?.description || '') || '—'}
                </Text>
                <Text style={{ color: colors.bg, marginTop: tokens.spacing(1) }}>
                  {`(${selected.minPlayers}–${selected.maxPlayers})`}{t("player")}
                </Text>
              </Block>

              <Text style={{ color: colors.text }}>{t('rules.roles')}</Text>
            </View>
          )}
        </>
      )}
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* ثابت */}
      <View style={styles.header}>
        <Text type="bold" style={{ color: colors.text, fontSize: hp(4) }}>{t('rules.title')}</Text>
      </View>
      <View style={styles.tabs}>
        <Tab label={t('rules.tab.custom')} active={source === 'custom'} onPress={() => onTab('custom')} />
        <Tab label={t('rules.tab.builtin')} active={source === 'builtin'} onPress={() => onTab('builtin')} />
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
        { backgroundColor: active ? colors.primary : colors.surface },
      ]}
    >
      <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.block, { backgroundColor: colors.surface }]}>
      <Text style={{ color: colors.white }}>{title}</Text>
      <View style={{ marginTop: tokens.spacing(1) }}>{children}</View>
    </View>
  );
}

function RoleCard({ name, team, description }: { name: string; team: 'mafia' | 'town' | 'neutral'; description?: string }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const chipBg = team === 'mafia' ? '#ef4444' : team === 'town' ? '#22c55e' : '#eab308';
  const chipFg = '#111';
  return (
    <View style={[styles.roleCard, { backgroundColor: colors.bgAlt, borderColor: colors.border }]}>
      <View style={[styles.chip, { backgroundColor: chipBg }]}>
        <Text style={{ color: chipFg, fontWeight: '800' }}>{team.toUpperCase()}</Text>
      </View>
      <Text style={{ color: colors.text }}>{t(name)}</Text>
      {!!description && <Text style={{ color: colors.subtext }}>{t(description)}</Text>}
    </View>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: tokens.spacing(2), paddingTop: tokens.spacing(5), paddingBottom: tokens.spacing(2) },


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
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 }
  },

  pill: {
    paddingHorizontal: tokens.spacing(1.5),
    height: tokens.spacing(5),
    borderRadius: tokens.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
  },

  block: {
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing(2),
    marginBottom: tokens.spacing(2),
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
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
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing(2),
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
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
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing(1.5),
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
  },
  cta: {
    paddingHorizontal: tokens.spacing(2),
    paddingVertical: tokens.spacing(1.2),
    borderRadius: tokens.radius.lg,
  },
});
