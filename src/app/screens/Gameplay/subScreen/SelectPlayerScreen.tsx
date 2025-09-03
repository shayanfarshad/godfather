// src/app/screens/GameplaySetup/SelectPlayersScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useTheme } from 'src/app/theme';
import { hp, tokens, wp } from 'src/app/theme/tokens';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { gameSetupAction } from 'src/app/store/slices/gameSetupSlice';
import { playersAction, Player } from 'src/app/store/slices';
import { useNavigation } from '@react-navigation/native';
import Text from 'src/components/common/Text';
import AddEditPlayer from '../../Players/AddEditPlayer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function SelectPlayersScreen() {
    const { colors } = useTheme();
    const { t } = useTranslation('common');
    const dispatch = useAppDispatch();
    const nav = useNavigation();

    const allPlayers = useAppSelector(s => s.Players.list);
    const selectedIds = useAppSelector(s => s.GameSetup.selectedPlayerIds);

    const [sheetOpen, setSheetOpen] = useState(false);

    const toggle = (id: string) => {
        let next = [...selectedIds];
        if (next.includes(id)) next = next.filter(x => x !== id);
        else next.push(id);
        dispatch(gameSetupAction.setPlayers(next));
    };

    const renderItem = ({ item }: { item: Player }) => {
        const active = selectedIds.includes(item.id);
        return (
            <Pressable
                onPress={() => toggle(item.id)}
                style={[
                    styles.row,
                    { backgroundColor: colors.bgAlt }
                ]}
            >
                {item.avatarUri ? (
                    <Image source={{ uri: item.avatarUri }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, { backgroundColor: colors.bg }]} />
                )}
                <Text type="bold" style={{ color: colors.text, flex: 1 }}>{item.name}</Text>
                <View style={[
                    styles.dot,
                    { backgroundColor: colors.premium }
                ]}>
                    {active && <FontAwesome5Icon name='check' size={hp(2)} color={colors.bg} />}
                </View>
            </Pressable>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Text type="bold" style={[styles.header, { color: colors.text }]}>{t('gameplay.players')}</Text>

            <FlatList
                data={allPlayers}
                keyExtractor={(x) => x.id}
                ItemSeparatorComponent={() => <View style={{ height: tokens.spacing(2) }} />}
                renderItem={renderItem}
                contentContainerStyle={{ padding: tokens.spacing(1.5) }}
            />

            <View style={{ flexDirection: 'row', gap: tokens.spacing(1), marginVertical: tokens.spacing(2) }}>
                <Pressable
                    onPress={() => setSheetOpen(true)}
                    style={[styles.btn, { backgroundColor: colors.bg, borderColor: colors.primary, borderWidth: 1 }]}
                >
                    <Text type="bold" style={{ color: colors.primary }}>+ {t('players.add')}</Text>
                </Pressable>

                <Pressable
                    onPress={() => (nav as any).goBack()}
                    style={[styles.btn, { backgroundColor: colors.primary }]}
                >
                    <Text type="bold" style={{ color: '#111' }}>{t('gameplay.continue')}</Text>
                </Pressable>
            </View>

            <AddEditPlayer
                visible={sheetOpen}
                onClose={() => setSheetOpen(false)}
                player={null}
                onSave={(p) => {
                    const newPlayer: Player = { id: Math.random().toString(36).slice(2), name: p.name, avatarUri: p.avatarUri ?? undefined };
                    dispatch(playersAction.addPlayer(newPlayer));
                    dispatch(gameSetupAction.setPlayers([...selectedIds, newPlayer.id]));
                }}
                onPickCamera={async () => null}
                onPickLibrary={async () => null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: tokens.spacing(2), paddingTop: tokens.spacing(6) },
    header: { fontSize: tokens.font.h2, marginBottom: tokens.spacing(1) },
    row: {
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing(1.2),
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing(1),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        alignSelf: 'center',
        shadowOffset: { width: 3, height: 3 }
    },
    avatar: { width: tokens.spacing(4.5), height: tokens.spacing(4.5), borderRadius: tokens.radius.lg },
    dot: { width: hp(4), height: hp(4), borderRadius: hp(2),justifyContent:'center',alignItems:'center' },
    btn: {
        flex: 1,
        height: tokens.spacing(6),
        borderRadius: tokens.radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
