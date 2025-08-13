import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, Image, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { usePlayersLogic } from './logic';
import AddEditPlayer from './AddEditPlayer';
import { useTheme } from 'src/app/theme';
import { Player } from 'src/app/store/slices';
import { tokens } from 'src/app/theme/tokens';

export default function Players() {
    const { colors } = useTheme();
    const { t } = useTranslation('common');
    const { loading, players, create, edit, remove, pickFromCamera, pickFromLibrary } = usePlayersLogic();

    const [sheetOpen, setSheetOpen] = useState(false);
    const [editing, setEditing] = useState<Player | null>(null);

    const empty = !loading && players.length === 0;

    const openAdd = () => { setEditing(null); setSheetOpen(true); };
    const openEdit = (p: Player) => { setEditing(p); setSheetOpen(true); };

    const renderItem = ({ item }: { item: Player }) => (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.row}>
                <View style={[styles.avatarWrap, { backgroundColor: colors.bgAlt, borderColor: colors.border }]}>
                    {item.avatarUri ? (
                        <Image source={{ uri: item.avatarUri }} style={styles.avatar} />
                    ) : (
                        <Text style={{ color: colors.subtext }}>🙂</Text>
                    )}
                </View>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
            </View>

            <View style={styles.actions}>
                <Pressable onPress={() => openEdit(item)} style={[styles.actionBtn, { borderColor: colors.border }]}>
                    <Text style={{ color: colors.text }}>{t('players.edit')}</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        Alert.alert(t('players.delete')!, `«${item.name}»؟`, [
                            { text: 'Cancel', style: 'cancel' },
                            { text: t('players.delete')!, style: 'destructive', onPress: () => remove(item.id) },
                        ]);
                    }}
                    style={[styles.actionBtn, { borderColor: colors.border }]}
                >
                    <Text style={{ color: colors.text }}>{t('players.delete')}</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>{t('players.title')}</Text>
            </View>

            {empty ? (
                <View style={styles.empty}>
                    <Text style={{ color: colors.subtext }}>{t('players.empty')}</Text>
                </View>
            ) : (
                <FlatList
                    data={players}
                    keyExtractor={(p) => p.id}
                    contentContainerStyle={{ paddingBottom: tokens.spacing(10) }}
                    renderItem={renderItem}
                    style={{ paddingHorizontal: tokens.spacing(2) }}
                />
            )}

            {/* FAB */}
            <Pressable
                accessibilityLabel={t('players.add')!}
                onPress={openAdd}
                style={[styles.fab, { backgroundColor: colors.primary, shadowColor: '#000' }]}
            >
                <Text style={styles.fabText}>＋</Text>
            </Pressable>

            <AddEditPlayer
                visible={sheetOpen}
                onClose={() => setSheetOpen(false)}
                onSave={({ id, name, avatarUri }) => {
                    if (id) edit({ id, name, avatarUri: avatarUri ?? null });
                    else create(name, avatarUri);
                }}
                onPickLibrary={pickFromLibrary}
                onPickCamera={pickFromCamera}
                player={editing ?? undefined}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: tokens.spacing(2), paddingTop: tokens.spacing(5), paddingBottom: tokens.spacing(2) },
    title: { fontSize: 22, fontWeight: '800' },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    card: {
        borderWidth: 1, borderRadius: 16, padding: 12, marginHorizontal: 8, marginVertical: 6,
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatarWrap: { width: 56, height: 56, borderRadius: 14, borderWidth: 1, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    avatar: { width: '100%', height: '100%' },
    name: { fontSize: 16, fontWeight: '700', flex: 1 },
    actions: { flexDirection: 'row', gap: 8, marginTop: 10 },
    actionBtn: { flex: 1, height: 40, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    fab: {
        position: 'absolute', right: 16, bottom: 24, width: 56, height: 56, borderRadius: 28,
        alignItems: 'center', justifyContent: 'center', elevation: 4,
    },
    fabText: { color: '#fff', fontSize: 28, fontWeight: '900', marginTop: -2 },
});
