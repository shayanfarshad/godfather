// src/app/screens/GameplaySetup/SelectScenarioScreen.tsx
import React, { useMemo, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useTheme } from 'src/app/theme';
import { hp, tokens, wp } from 'src/app/theme/tokens';
import Text from 'src/components/common/Text';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { gameSetupAction, ScenarioKey } from 'src/app/store/slices/gameSetupSlice';
import { roleIcons } from 'assets/roles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Modal } from 'src/components/common/Modal'; // 👈 همون کاستوم شما
import { useNavigation } from '@react-navigation/native';
import { ZODIAC_SCENARIO } from 'src/app/store/slices/data/zodiac';
import { scenarioRegistry } from 'src/app/store/slices/scenarioRegistery';

type ScenarioItem = { id: ScenarioKey; premiumOnly?: boolean };

export default function SelectScenarioScreen() {
    const { colors } = useTheme();
    const { t } = useTranslation('common');
    const dispatch = useAppDispatch();
    const nav = useNavigation()
    const premiumActive = useAppSelector(s => s.Premium.active);
    const currentScenario = useAppSelector(s => s.GameSetup.scenario);
    const selectedRoles = useAppSelector(s => s.GameSetup.roles);

    // مودال‌ها
    const confirmRef = useRef<BottomSheetModal>(null);
    const paywallRef = useRef<BottomSheetModal>(null);

    // سناریویی که کاربر قصد سوییچ به آن را دارد
    const [pendingScenario, setPendingScenario] = useState<ScenarioKey | null>(null);

    const scenarios: ScenarioItem[] = useMemo(() => ([
        { id: 'zodiac', premiumOnly: false },
        { id: 'nustradamus', premiumOnly: true },
        { id: 'jack', premiumOnly: true },
        { id: 'elclasico', premiumOnly: false },
    ]), []);

    // لیست کلیدهای نقش‌ها برای سناریوی فعلی (برای نمایش کارت‌ها)
    const scenarioRoleKeys = useMemo(() => {
        if (!currentScenario) return [] as string[];
        const pack = roleIcons[currentScenario];
        return Object.keys(pack); // ['al_capone','bomber',...]
    }, [currentScenario]);

    // انتخاب سناریو با رعایت Paywall و Confirm
    const trySetScenario = useCallback((next: ScenarioKey) => {
        const locked = scenarios.find(s => s.id === next)?.premiumOnly && !premiumActive;
        if (locked) {
            // نمایش شیت پرداخت
            setPendingScenario(next);
            paywallRef.current?.present();
            return;
        }
        if (selectedRoles.length > 0 && currentScenario && currentScenario !== next) {
            // با نقش‌های انتخاب شده: تایید پاکسازی
            setPendingScenario(next);
            confirmRef.current?.present();
            return;
        }
        dispatch(gameSetupAction.setScenario(next));
    }, [currentScenario, selectedRoles.length, premiumActive, scenarios, dispatch]);

    const onConfirmChange = useCallback(() => {
        if (!pendingScenario) return;
        dispatch(gameSetupAction.setScenario(pendingScenario));
        dispatch(gameSetupAction.clearRoles());
        setPendingScenario(null);
        confirmRef.current?.dismiss();
    }, [pendingScenario, dispatch]);

    // هلپر انتخاب نقش تک‌مثالی
    const isSingleSelected = (key: string) => !!selectedRoles.find(r => r.key === key && r.count === 1);
    // شمارش نقش‌های چندتایی
    const getCount = (key: string) => selectedRoles.find(r => r.key === key)?.count ?? 0;

    // نقش‌های چندتایی
    const CITIZEN_KEY = 'citizen';
    const MAFIOSO_KEY = 'mafioso'; // نقش مجازی

    const onToggleSingle = (key: string, team?: 'mafia' | 'town' | 'neutral') => {
        dispatch(gameSetupAction.toggleSingleRole({ key, team }));
    };
    const onPlus = (key: string, team?: 'mafia' | 'town') => {
        dispatch(gameSetupAction.addCountRole({ key, team }));
    };
    const onMinus = (key: string) => {
        dispatch(gameSetupAction.subCountRole({ key }));
    };

    // پیدا کردن یک آیکون مناسب برای mafioso
    // const mafiaIconKeyGuess = useMemo(() => {
    //     if (!currentScenario) return undefined;
    //     const keys = Object.keys(roleIcons[currentScenario]);
    //     const pref = ['godfather', 'al_capone', 'pablo_escobar'];
    //     for (const k of pref) if (keys.includes(k)) return k;
    //     return keys[0];
    // }, [currentScenario]);

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Text type="bold" style={[styles.header, { color: colors.text }]}>{t('gameplay.selectScenario')}</Text>

            {/* سناریوها - افقی، رایگان‌ها اول */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: tokens.spacing(2) }}
                style={{ paddingVertical: tokens.spacing(1), paddingBottom: hp(3) }}
            >
                {[...scenarios].sort((a, b) => (a.premiumOnly ? 1 : 0) - (b.premiumOnly ? 1 : 0)).map((s, idx, arr) => {
                    const active = currentScenario === s.id
                    const locked = !!s.premiumOnly && !premiumActive;
                    return (
                        <Pressable
                            key={s.id}
                            onPress={() => trySetScenario(s.id)}
                            style={[
                                styles.pill,
                                {
                                    backgroundColor: active ? colors.primary : colors.bgAlt,
                                    opacity: locked ? 0.5 : 1,
                                    marginRight: idx === arr.length - 1 ? 0 : tokens.spacing(1),
                                }
                            ]}
                        >
                            <Text type="bold" style={{ color: active ? '#fff' : colors.text }}>
                                {t(`game.scenarios.${s.id}.name`)}
                            </Text>
                            {!!s.premiumOnly && <Text type="bold" style={{ color: active ? '#fff' : colors.text }}> ★</Text>}
                        </Pressable>
                    );
                })}
            </ScrollView>

            {/* گرید نقش‌ها */}

            <ScrollView contentContainerStyle={{ padding: tokens.spacing(2), gap: tokens.spacing(1.2) }}>
                {/* کارت نقش‌های تک‌مثالی (به‌جز citizen) */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing(1) }}>
                    {scenarioRoleKeys.map((key) => {
                        if (key === 'citizen' || key === 'citizen_simple') return null;
                        const iconSource = currentScenario && (roleIcons as any)[currentScenario]?.[key];
                        const selected = isSingleSelected(key);
                        return (
                            <Pressable
                                key={key}
                                onPress={() => onToggleSingle(key)}
                                style={[
                                    styles.roleCard,
                                    {
                                        backgroundColor: selected ? colors.text : colors.bgAlt,
                                    }
                                ]}
                            >
                                {iconSource ? <Image source={iconSource} style={styles.roleIcon} resizeMode="contain" /> : <View style={[styles.roleIcon, { backgroundColor: colors.bgAlt }]} />}
                                <Text type="bold" style={{ color: selected ? '#fff' : colors.text }}>
                                    {t(`game.${currentScenario}.roles.${key}.name`, key)}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {/* کارت چندتایی: شهروند ساده */}
                <CounterCard
                    title={t(`game.${currentScenario}.roles.citizen.name`, 'Citizen')}
                    count={getCount(CITIZEN_KEY)}
                    onMinus={() => onMinus(CITIZEN_KEY)}
                    onPlus={() => onPlus(CITIZEN_KEY, 'town')}
                    icon={(currentScenario && (roleIcons as any)[currentScenario]?.['citizen'])}
                />

                {/* کارت چندتایی: مافیا ساده */}
                {/* <CounterCard
            title={t('roles.common.mafioso_simple', 'Mafioso')}
            count={getCount(MAFIOSO_KEY)}
            onMinus={() => onMinus(MAFIOSO_KEY)}
            onPlus={() => onPlus(MAFIOSO_KEY, 'mafia')}
            icon={(currentScenario && mafiaIconKeyGuess ? (roleIcons as any)[currentScenario]?.[mafiaIconKeyGuess] : undefined)}
          /> */}
            </ScrollView>


            {/* دکمه برگشت */}
            <View style={{ paddingHorizontal: tokens.spacing(2) }}>
                <Pressable
                    onPress={() => nav.goBack()}
                    style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
                >
                    <Text type="bold" style={{ color: '#111' }}>{t('gameplay.continue')}</Text>
                </Pressable>
            </View>

            {/* ======= MODALS (BottomSheetModal via your Modal component) ======= */}

            {/* Confirm change scenario */}
            <Modal
                modalRef={confirmRef}
                snapPoints={['28%']}          // 👈 الزامی
                onDismiss={() => setPendingScenario(null)}
                index={0}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                vertical={tokens.spacing(1)}
                backgroundStyle={{ backgroundColor: colors.bg, borderRadius: 24 }}
            >
                <View style={{ gap: tokens.spacing(1) }}>
                    <Text type="bold" style={{ color: colors.text, fontSize: tokens.font.h2 }}>
                        {t('gameplay.changeScenario')}
                    </Text>
                    <Text style={{ color: colors.subtext }}>
                        {t('gameplay.changeScenarioDescription', 'Changing the scenario will clear selected roles. Continue?')}
                    </Text>

                    <View style={{ flexDirection: 'row', gap: tokens.spacing(1), marginTop: tokens.spacing(1) }}>
                        <Pressable
                            onPress={() => confirmRef.current?.dismiss()}
                            style={[styles.btn, { backgroundColor: colors.bgAlt, borderColor: colors.border, borderWidth: 1 }]}
                        >
                            <Text type="bold" style={{ color: colors.text }}>{t('gameplay.cancel')}</Text>
                        </Pressable>
                        <Pressable
                            onPress={onConfirmChange}
                            style={[styles.btn, { backgroundColor: colors.primary }]}
                        >
                            <Text type="bold" style={{ color: '#111' }}>{t('gameplay.confirm')}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Paywall */}
            <Modal
                modalRef={paywallRef}
                snapPoints={['26%']}
                onDismiss={() => setPendingScenario(null)}
                index={0}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                vertical={tokens.spacing(1)}
                backgroundStyle={{ backgroundColor: colors.bg, borderRadius: 24 }}
            >
                <View style={{ gap: tokens.spacing(1) }}>
                    <Text type="bold" style={{ color: colors.text, fontSize: tokens.font.h2 }}>
                        {t('settings.paywall.premiumRequired')}
                    </Text>
                    <Text style={{ color: colors.subtext }}>
                        {t('settings.paywall.scenarioSelectNonPremiumDescription')}
                    </Text>

                    <View style={{ flexDirection: 'row', gap: tokens.spacing(1), marginTop: tokens.spacing(1) }}>
                        <Pressable
                            onPress={() => paywallRef.current?.dismiss()}
                            style={[styles.btn, { backgroundColor: colors.bgAlt, borderColor: colors.border, borderWidth: 1 }]}
                        >
                            <Text type="bold" style={{ color: colors.text }}>{t('settings.paywall.cancel')}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                // اینجا می‌تونی صفحه پرداخت/پریمیوم رو باز کنی
                                paywallRef.current?.dismiss();
                            }}
                            style={[styles.btn, { backgroundColor: colors.premium }]}
                        >
                            <Text type="bold" style={{ color: '#1b1a1a' }}>{t('settings.paywall.activate')}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function CounterCard({
    title, count, onPlus, onMinus, icon,
}: { title: string; count: number; onPlus: () => void; onMinus: () => void; icon?: any }) {
    const { colors } = useTheme();
    return (
        <View style={[styles.counterCard, { backgroundColor: count > 0 ? colors.text : colors.bgAlt }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing(1) }}>
                {icon ? <Image source={icon} style={styles.counterIcon} /> : <View style={[styles.counterIcon, { backgroundColor: colors.bgAlt }]} />}
                <Text type="bold" style={{ color: count > 0 ? colors.bg : colors.text }}>{title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing(1) }}>
                <Pressable onPress={onMinus} style={[styles.counterBtn, { backgroundColor: colors.bgAlt, borderColor: colors.border, borderWidth: 1 }]}>
                    <Text type="bold" style={{ color: colors.text }}>−</Text>
                </Pressable>
                <Text type="bold" style={{ color: count > 0 ? colors.bg : colors.text, minWidth: 28, textAlign: 'center' }}>{count}</Text>
                <Pressable onPress={onPlus} style={[styles.counterBtn, { backgroundColor: colors.primary }]}>
                    <Text type="bold" style={{ color: '#111' }}>＋</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: tokens.spacing(6) },
    header: { fontSize: tokens.font.h1, padding: tokens.spacing(2), paddingBottom: 0 },
    pill: {
        paddingHorizontal: tokens.spacing(1.6),
        height: tokens.spacing(5.2),
        borderRadius: tokens.radius.xl,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing(0.6),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    roleCard: {
        width: wp(45),
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing(1),
        alignItems: 'center',
        gap: tokens.spacing(0.6),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    roleIcon: { width: wp(30), height: hp(15) },

    counterCard: {
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing(1.2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: tokens.spacing(1),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    counterIcon: { width: tokens.spacing(5), height: tokens.spacing(5), borderRadius: tokens.radius.lg },
    counterBtn: {
        width: tokens.spacing(5),
        height: tokens.spacing(5),
        borderRadius: tokens.radius.lg,
        alignItems: 'center',
        justifyContent: 'center'
    },

    primaryBtn: {
        marginTop: tokens.spacing(1),
        marginBottom: tokens.spacing(3),
        height: tokens.spacing(6.5),
        borderRadius: tokens.radius.xl,
        alignItems: 'center', justifyContent: 'center'
    },

    btn: {
        flex: 1,
        height: tokens.spacing(6),
        borderRadius: tokens.radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
