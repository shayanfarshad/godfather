// src/screens/Settings/logic.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/app/navigation/types';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { shallowEqual } from 'react-redux';
import { premiumAction, settingsAction } from 'src/app/store/slices';
import i18n from 'src/app/i18n/i18n';

type Nav = NativeStackNavigationProp<AppStackParamList, 'Settings'>;

export function useSettingsLogic() {
    const navigation = useNavigation<Nav>();
    const dispatch = useAppDispatch();
    const theme = useAppSelector(s => s.Settings.theme, shallowEqual); // 'dark' | 'light'
    const lang = useAppSelector(s => s.Settings.lang, shallowEqual);   // 'fa' | 'en'
    const premiumActive = useAppSelector(s => s.Premium.active, shallowEqual);

    useEffect(() => { console.log({ lang, i18: i18n.language }) }, [lang])


    const [paywallOpen, setPaywallOpen] = useState(false);
    const [sound, setSound] = useState(true);
    const [notifications, setNotifications] = useState(true);

    const toggleTheme = useCallback(async () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        dispatch(settingsAction.setTheme(next));
        await AsyncStorage.setItem('theme', next);
    }, [dispatch, theme]);
    
    const changeLang = useCallback((next: 'fa' | 'en') => {
        if (lang === next) return;
        dispatch(settingsAction.setLang(next)); // فقط همین
        // i18n/RTL/persist را LocaleBridge انجام می‌دهد
    }, [dispatch, lang]);



    const goScenarioBuilder = useCallback(() => {
        if (!premiumActive) {
            setPaywallOpen(true);
            return;
        }
        navigation.navigate('ScenarioBuilder' as any); // صفحه را بعداً می‌سازیم
    }, [navigation, premiumActive]);

    const activatePremiumMock = useCallback(async () => {
        dispatch(premiumAction.activate());
        await AsyncStorage.setItem('premium_active', 'true');
        setPaywallOpen(false);
    }, [dispatch]);

    const toggleSound = useCallback(() => setSound(s => !s), []);
    const toggleNotifications = useCallback(() => setNotifications(s => !s), []);

    return {
        theme, lang, premiumActive,
        toggleTheme, changeLang,
        goScenarioBuilder,
        paywallOpen, setPaywallOpen, activatePremiumMock,
        sound, notifications, toggleSound, toggleNotifications,
    };
}
