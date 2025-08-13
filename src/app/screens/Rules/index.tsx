import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRulesLogic } from './logic';
import { useTheme } from 'src/app/theme';
import { tokens } from 'src/app/theme/tokens';

export default function Rules() {
    const { colors } = useTheme();
    const { t } = useTranslation('common');
    const { premiumActive, source, list, selected, onTab, onSelectScenario } = useRulesLogic();

    const isCustom = source === 'custom';
    const isEmptyCustom = isCustom && list.length === 0;

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Text style={[styles.header, { color: colors.text }]}>{t('rules.title')}</Text>

            {/* Tabs */}
            <View style={styles.tabs}>
                <Tab
                    label={t('rules.tab.builtin')}
                    active={source === 'builtin'}
                    onPress={() => onTab('builtin')}
                />
                <Tab
                    label={t('rules.tab.custom')}
                    active={source === 'custom'}
                    onPress={() => onTab('custom')}
                />
            </View>

            {/* Scenario picker or empty state */}
            {isEmptyCustom ? (
                <View style={[styles.empty, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                    <Text style={{ color: colors.subtext }}>{t('rules.empty.custom')}</Text>
                    <Pressable
                        onPress={() => {/* مسیر ScenarioBuilder - بعداً */ }}
                        style={[styles.cta, { backgroundColor: colors.premium }]}
                    >
                        <Text style={{ color: '#1b1a1a', fontWeight: '800' }}>{t('rules.make.custom')}</Text>
                    </Pressable>
                </View>
            ) : (
                <>
                    {/* Scenario selector pill list */}
                    <FlatList
                        horizontal
                        data={list}
                        keyExtractor={(s) => s.id}
                        contentContainerStyle={{ paddingHorizontal: tokens.spacing(2), gap: 8 }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const active = selected?.id === item.id;
                            const locked = item.premiumOnly && !premiumActive;
                            return (
                                <Pressable
                                    onPress={() => !locked && onSelectScenario(item.id)}
                                    style={[
                                        styles.pill,
                                        {
                                            backgroundColor: active ? colors.primary : colors.surface,
                                            borderColor: active ? 'transparent' : colors.border,
                                            opacity: locked ? 0.5 : 1,
                                        },
                                    ]}
                                >
                                    <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '700' }}>
                                        {item.name}
                                    </Text>
                                    {item.premiumOnly ? <Text style={{ marginLeft: 6, color: active ? '#fff' : colors.text }}>★</Text> : null}
                                </Pressable>
                            );
                        }}
                    />

                    {/* Scenario content */}
                    {selected && (
                        <View style={{ paddingHorizontal: tokens.spacing(2), marginTop: tokens.spacing(2) }}>
                            <Block title={t('rules.description')}>
                                <Text style={{ color: colors.subtext, lineHeight: 22 }}>
                                    {selected.description || '—'}
                                </Text>
                                <Text style={{ color: colors.subtext, marginTop: 6 }}>
                                    {`(${selected.minPlayers}–${selected.maxPlayers} players)`}
                                </Text>
                            </Block>

                            <Block title={t('rules.roles')}>
                                <FlatList
                                    data={selected.roles}
                                    keyExtractor={(r) => r.id.toString()}
                                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                                    renderItem={({ item }) => (
                                        <RoleCard
                                            name={item.name}
                                            team={item.team}
                                            description={item.description}
                                        />
                                    )}
                                />
                            </Block>
                        </View>
                    )}
                </>
            )}
        </View>
    );
}

/* ---------- UI helpers ---------- */

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
            <View style={{ marginTop: 8 }}>{children}</View>
        </View>
    );
}

function RoleCard({ name, team, description }: { name: string; team: 'mafia' | 'town' | 'neutral'; description?: string }) {
    const { colors } = useTheme();
    const chipBg =
        team === 'mafia' ? '#ef4444' :
            team === 'town' ? '#22c55e' : '#eab308';
    const chipFg = '#111';

    return (
        <View style={[styles.roleCard, { backgroundColor: colors.bgAlt, borderColor: colors.border }]}>
            <View style={[styles.chip, { backgroundColor: chipBg }]}>
                <Text style={{ color: chipFg, fontWeight: '800' }}>{team.toUpperCase()}</Text>
            </View>
            <Text style={[styles.roleName, { color: colors.text }]}>{name}</Text>
            {!!description && (
                <Text style={[styles.roleDesc, { color: colors.subtext }]}>{description}</Text>
            )}
        </View>
    );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        fontSize: 22,
        fontWeight: '800',
        paddingHorizontal: 16,
        paddingTop: 28,
        paddingBottom: 10
    },

    tabs: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        marginBottom: 8
    },
    tab: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },

    pill: {
        paddingHorizontal: 14,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        flexDirection: 'row'
    },

    block: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12
    },
    blockTitle: {
        fontSize: 16,
        fontWeight: '800'
    },

    roleCard: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 12
    },
    chip: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 6
    },
    roleName: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 4
    },
    roleDesc: {
        fontSize: 13,
        lineHeight: 20
    },

    // جدید برای Empty State
    empty: {
        margin: 16,
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    cta: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12
    }
});
