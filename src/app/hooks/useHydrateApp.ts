// src/app/hooks/useHydrateApp.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settingsAction } from '../store/slices/settingsSlice';
import { authAction } from '../store/slices/authSlice';
import { premiumAction } from '../store/slices/premiumSlice';
import { useAppDispatch } from '../store/index';

export function useHydrateApp() {
    const dispatch = useAppDispatch();

    const hydrate = async () => {
        const [theme, token, premium] = await Promise.all([
            AsyncStorage.getItem('theme'),
            AsyncStorage.getItem('auth_token'),
            AsyncStorage.getItem('premium_active'),
        ]);

        if (theme === 'light' || theme === 'dark') dispatch(settingsAction.setTheme(theme as any));
        if (token) dispatch(authAction.setCredentials({ token }));
        (premium === 'true') ? dispatch(premiumAction.activate()) : dispatch(premiumAction.deactivate());
    };

    return { hydrate };
}
