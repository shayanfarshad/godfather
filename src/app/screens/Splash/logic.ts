// src/screens/Splash/logic.ts
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/app/navigation/types';
import { useHydrateApp } from 'src/app/hooks/useHydrateApp';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export function useSplashLogic() {
    const navigation = useNavigation<Nav>();
    const { hydrate } = useHydrateApp();

    const goNext = useCallback(async () => {
        // 1) Hydrate persisted state (theme/lang/auth/premium)
        await hydrate();

        // 2) حداقل زمان نمایش اسپلش برای حس نرم
        await new Promise(r => setTimeout(r, 650));

        // 3) پنهان کردن اسپلش نیتیو اگر موجود بود

        // 4) ناوبری بعد از آماده شدن
    }, [hydrate, navigation]);

    // در صورت نیاز پاک‌سازی یا لیسنر
    useEffect(() => { return () => { }; }, []);

    return { goNext };
}
