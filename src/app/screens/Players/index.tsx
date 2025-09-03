import { useState } from 'react';
import { View, FlatList, Pressable, Image, Alert, StyleSheet } from 'react-native';
import { usePlayersLogic } from './logic';
import AddEditPlayer from './AddEditPlayer';
import { useTheme } from 'src/app/theme';
import { Player } from 'src/app/store/slices';
import { hp, tokens, wp } from 'src/app/theme/tokens';
import { useTranslation } from 'react-i18next';
import Text from 'src/components/common/Text';

export default function Players() {
    const { t } = useTranslation()
    const { colors } = useTheme();
    const { loading, players, create, edit, remove, pickFromCamera, pickFromLibrary } = usePlayersLogic();

    const [sheetOpen, setSheetOpen] = useState(false);
    const [editing, setEditing] = useState<Player | null>(null);

    const empty = !loading && players.length === 0;

    const openAdd = () => { setEditing(null); setSheetOpen(true); };
    const openEdit = (p: Player) => { setEditing(p); setSheetOpen(true); };

    const renderItem = ({ item }: { item: Player }) => (
        <View style={[styles.card, { backgroundColor: colors.bgAlt }]}>
            <View style={styles.row}>
                <View style={[styles.avatarWrap, { backgroundColor: colors.bg }]}>
                    {item.avatarUri ? (
                        <Image source={{ uri: item.avatarUri }} style={styles.avatar} />
                    ) : (
                        <Text style={{ color: colors.subtext }}>🙂</Text>
                    )}
                </View>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                <View style={styles.actions}>
                    <Pressable onPress={() => openEdit(item)} style={[styles.actionBtn, { backgroundColor: colors.bg }]}>
                        <Text style={{ color: colors.text }}>{t('players.edit')}</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            Alert.alert(t('players.delete')!, `«${item.name}»؟`, [
                                { text: 'Cancel', style: 'cancel' },
                                { text: t('players.delete')!, style: 'destructive', onPress: () => remove(item.id) },
                            ]);
                        }}
                        style={[styles.actionBtn, { backgroundColor: colors.bg }]}
                    >
                        <Text style={{ color: colors.text }}>{t('players.delete')}</Text>
                    </Pressable>
                </View>
            </View>


        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={styles.header}>
                <Text type='bold' style={[styles.title, { color: colors.text }]}>{t('players.title')}</Text>
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
    title: { fontSize: hp(4) },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    card: {
        width: wp(92), alignSelf: "center", borderRadius: 16, padding: 12, marginBottom: hp(1.5),
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12,justifyContent:"space-around"},
    avatarWrap: {
        width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center',
        shadowColor: "#000", shadowRadius: 6, shadowOpacity: 0.1, shadowOffset: { width: 3, height: 3 }

    },
    avatar: { width: '100%', height: '100%' },
    name: { fontSize: 16, fontWeight: '700', flex: 1 },
    actions: { flexDirection: 'row',width:"50%", gap: 8, marginTop: 10 ,justifyContent:'space-around'},
    actionBtn: { flex: 0.4, height: hp(4.5), borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 3, height: 3 } },
    fab: {
        position: 'absolute', right: 16, bottom: 24, width: 56, height: 56, borderRadius: 28,
        alignItems: 'center', justifyContent: 'center', elevation: 4,
    },
    fabText: { color: '#fff', fontSize: 28, fontWeight: '900', marginTop: -2 },
});
