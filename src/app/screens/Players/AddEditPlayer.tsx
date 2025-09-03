import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, TextInput, Pressable, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Player } from 'src/app/store/slices';
import { useTheme } from 'src/app/theme';
import ImageSourceModal from 'src/components/ImageSourceModal';
import { Modal } from 'src/components/common/Modal';
import Text from 'src/components/common/Text';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import i18n from 'src/app/i18n/i18n';
import { hp, wp } from 'src/app/theme/tokens';

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
  const isRTL = i18n.language === 'fa';

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [name, setName] = useState(player?.name ?? '');
  const [avatarUri, setAvatarUri] = useState<string | null>(player?.avatarUri ?? null);
  const [imageSheetOpen, setImageSheetOpen] = useState(false);
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%"], []);
  React.useEffect(() => {
    setName(player?.name ?? '');
    setAvatarUri(player?.avatarUri ?? null);
  }, [player]);

  const isEditing = !!player;
  const canSave = useMemo(() => name.trim().length > 0, [name]);

  useEffect(() => {
    const m = sheetRef.current;
    if (!m) return;
    if (visible) m.present();
    else m.dismiss();
  }, [visible]);


  const handleClose = useCallback(() => {
    setName("")
    onClose?.();
  }, [onClose]);
  return (
    <>
      <Modal
        modalRef={sheetRef}
        onDismiss={handleClose}
        snapPoints={snapPoints}
    backgroundStyle={{ backgroundColor: colors.bg }}
      >
        <Text type="bold" style={[styles.title, { color: colors.text }]}>
          {isEditing ? t('players.edit') : t('players.add')}
        </Text>

        <Pressable
          testID="PLAYER_AVATAR_PICK"
          onPress={() => setImageSheetOpen(true)}
          style={[
            styles.avatarBtn,
            { borderColor: colors.border, backgroundColor: colors.bgAlt },
          ]}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <Text style={{ color: colors.subtext }}>{t('players.pickImage')}</Text>
          )}
        </Pressable>

        <View
          style={[
            styles.inputWrap,
            { borderColor: colors.border, backgroundColor: colors.bgAlt },
          ]}
        >
          <TextInput
            placeholder={t('players.name')!}
            placeholderTextColor={colors.subtext}
            value={name}
            onChangeText={setName}
            style={[
              styles.input,
              { color: colors.text, textAlign: isRTL ? 'right' : 'left', writingDirection: isRTL ? 'rtl' : 'ltr' },
            ]}
            returnKeyType="done"
            onSubmitEditing={() => {
              if (canSave) {
                onSave({ id: player?.id, name: name.trim(), avatarUri });
                handleClose();
              }
            }}
          />
        </View>

        <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Pressable
            onPress={handleClose}
            style={[styles.btn, { backgroundColor: colors.bgAlt, borderColor: colors.border }]}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>{t('players.cancel')}</Text>
          </Pressable>

          <Pressable
            disabled={!canSave}
            onPress={() => {
              onSave({ id: player?.id, name: name.trim(), avatarUri });
              handleClose();
            }}
            style={[
              styles.btn,
              {
                backgroundColor: canSave ? colors.primary : colors.border,
                borderColor: 'transparent',
                opacity: canSave ? 1 : 0.7,
              },
            ]}
          >
            <Text type="bold" style={[styles.btnText, { color: '#fff' }]}>{t('players.save')}</Text>
          </Pressable>
        </View>
      </Modal >

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
    </>
  );
}

const styles = StyleSheet.create({

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0008'
  },
  sheet: {
    position: 'absolute',
    left: 0, right: 0,
    bottom: 0,
    padding: 16, borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1
  },
  title: { fontSize: hp(2.2), marginVertical: hp(1) },
  avatarBtn: { width: 96, height: 96, borderRadius: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 12, shadowColor: "#000", shadowRadius: 6, shadowOpacity: 0.2, shadowOffset: { width: 3, height: 3 } },
  avatar: { width: '100%', height: '100%' },
  inputWrap: { borderRadius: 16, paddingHorizontal: wp(4), paddingVertical: hp(1), marginBottom: 12, shadowColor: "#000", shadowRadius: 6, shadowOpacity: 0.2, shadowOffset: { width: 3, height: 3 } },
  input: { fontSize: 16, fontFamily: i18n.language === 'fa' ? 'IRANSansXNoEn-Light' : "WinkySans-Light", padding: 0, margin: 0 },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
  btn: { flex: 1, height: hp(5.5), borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowRadius: 6, shadowOpacity: 0.2, shadowOffset: { width: 3, height: 3 } },
  btnText: { fontSize: hp(1.7), },
});
