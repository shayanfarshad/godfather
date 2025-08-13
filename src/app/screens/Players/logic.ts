import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { Player, playersAction } from 'src/app/store/slices';
import { Alert } from 'react-native';

const STORAGE_KEY = 'players_v1';

export function usePlayersLogic() {
    const dispatch = useAppDispatch();
    const players = useAppSelector(s => s.Players.list);
    const [loading, setLoading] = useState(true);

    // hydrate from storage
    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) {
                    const list: Player[] = JSON.parse(raw);
                    dispatch(playersAction.setPlayers(list));
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [dispatch]);

    // persist on changes
    useEffect(() => {
        if (!loading) {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(players)).catch(() => { });
        }
    }, [players, loading]);

    const create = useCallback((name: string, avatarUri?: string | null) => {
        const id = cryptoRandomId();
        dispatch(playersAction.addPlayer({ id, name, avatarUri: avatarUri ?? null }));
    }, [dispatch]);

    const edit = useCallback((player: Player) => {
        dispatch(playersAction.updatePlayer(player));
    }, [dispatch]);

    const remove = useCallback((id: string) => {
        dispatch(playersAction.deletePlayer(id));
    }, [dispatch]);

    const pickFromLibrary = useCallback(async (): Promise<string | null> => {
        try {
            const res = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
                quality: 0.8,
            });
            if (res.didCancel) return null;
            return res.assets?.[0]?.uri ?? null;
        } catch (e) {
            console.warn('Library error', e);
            return null;
        }
    }, []);

    const pickFromCamera = useCallback(async (): Promise<string | null> => {
        try {
            const res = await launchCamera({
                mediaType: 'photo',
                saveToPhotos: true,
                quality: 0.8,
            });
            if (res.didCancel) return null;
            return res.assets?.[0]?.uri ?? null;
        } catch (e) {
            console.warn('Camera error', e);
            return null;
        }
    }, []);

    return { loading, players, create, edit, remove, pickFromCamera,pickFromLibrary };
}

// ساده و امن: بدون نیاز به کتابخونه
function cryptoRandomId() {
    return 'p_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
