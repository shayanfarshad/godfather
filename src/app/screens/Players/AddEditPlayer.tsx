import React, { useMemo, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Player } from 'src/app/store/slices';
import { useTheme } from 'src/app/theme';
import ImageSourceModal from 'src/components/ImageSourceModal';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (player: { id?: string; name: string; avatarUri?: string | null }) => void;
  onPickLibrary: () => Promise<string | null>;
  onPickCamera: () => Promise<string | null>;
  player?: Player | null;
};

export default function AddEditPlayer({
  visible, onClose, onSave, onPickLibrary, onPickCamera, player
}: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation('common');
  const [name, setName] = useState(player?.name ?? '');
  const [avatarUri, setAvatarUri] = useState<string | null>(player?.avatarUri ?? null);
  const [imageSheetOpen, setImageSheetOpen] = useState(false);

  React.useEffect(() => {
    setName(player?.name ?? '');
    setAvatarUri(player?.avatarUri ?? null);
  }, [player]);

  const isEditing = !!player;
  const canSave = useMemo(() => name.trim().length > 0, [name]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.backdrop} />
      <View style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          {isEditing ? t('players.edit') : t('players.add')}
        </Text>

        <Pressable
          testID="PLAYER_AVATAR_PICK"
          onPress={() => setImageSheetOpen(true)}
          style={[styles.avatarBtn, { borderColor: colors.border, backgroundColor: colors.bgAlt }]}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <Text style={{ color: colors.subtext }}>{t('players.pickImage')}</Text>
          )}
        </Pressable>

        <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.bgAlt }]}>
          <TextInput
            placeholder={t('players.name')!}
            placeholderTextColor={colors.subtext}
            value={name}
            onChangeText={setName}
            style={[styles.input, { color: colors.text }]}
          />
        </View>

        <View style={styles.row}>
          <Pressable onPress={onClose} style={[styles.btn, { backgroundColor: colors.bgAlt, borderColor: colors.border }]}>
            <Text style={[styles.btnText, { color: colors.text }]}>{t('players.cancel')}</Text>
          </Pressable>
          <Pressable
            disabled={!canSave}
            onPress={() => {
              onSave({ id: player?.id, name: name.trim(), avatarUri });
              onClose();
            }}
            style={[
              styles.btn,
              { backgroundColor: canSave ? colors.primary : colors.border, borderColor: 'transparent' }
            ]}
          >
            <Text style={[styles.btnText, { color: '#fff' }]}>{t('players.save')}</Text>
          </Pressable>
        </View>
      </View>

      {/* Image Source Bottom Sheet */}
      <ImageSourceModal
        visible={imageSheetOpen}
        onClose={() => setImageSheetOpen(false)}
        onPickCamera={async () => {
          const uri = await onPickCamera();
          if (uri) setAvatarUri(uri);
        }}
        onPickLibrary={async () => {
          const uri = await onPickLibrary();
          if (uri) setAvatarUri(uri);
        }}
        testID="IMAGE_SOURCE"
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0008' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1 },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 12 },
  avatarBtn: { width: 96, height: 96, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', alignSelf: 'center', marginBottom: 12 },
  avatar: { width: '100%', height: '100%' },
  inputWrap: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12 },
  input: { fontSize: 16 },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
  btn: { flex: 1, height: 48, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 16, fontWeight: '700' },
});
