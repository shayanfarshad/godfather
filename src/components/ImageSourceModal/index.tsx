import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../app/theme';
import { tokens } from '../../app/theme/tokens';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  onClose: () => void;
  onPickCamera: () => void;
  onPickLibrary: () => void;
  testID?: string;
};

export default function ImageSourceModal({
  visible, onClose, onPickCamera, onPickLibrary, testID
}: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation('common');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop} testID={testID ? `${testID}_BACKDROP` : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>{t('image.modal.title')}</Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>{t('image.modal.subtitle')}</Text>
          </View>

          <View style={styles.row}>
            <ActionButton
              testID={testID ? `${testID}_CAMERA` : undefined}
              label={t('image.modal.camera')}
              onPress={() => { onClose(); onPickCamera(); }}
            />
            <ActionButton
              testID={testID ? `${testID}_LIBRARY` : undefined}
              label={t('image.modal.library')}
              onPress={() => { onClose(); onPickLibrary(); }}
              primary
            />
          </View>

          <Pressable
            testID={testID ? `${testID}_CANCEL` : undefined}
            onPress={onClose}
            style={[styles.cancelBtn, { backgroundColor: colors.bgAlt, borderColor: colors.border }]}
          >
            <Text style={[styles.cancelText, { color: colors.text }]}>{t('image.modal.cancel')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function ActionButton({
  label,
  onPress,
  primary,
  testID,
}: { label: string; onPress: () => void; primary?: boolean; testID?: string }) {
  const { colors } = useTheme();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionBtn,
        {
          backgroundColor: primary ? colors.primary : colors.bgAlt,
          borderColor: primary ? 'transparent' : colors.border,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.actionText, { color: primary ? '#fff' : colors.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#0008', justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1,
    paddingHorizontal: tokens.spacing(2), paddingTop: tokens.spacing(2), paddingBottom: tokens.spacing(3),
  },
  header: { marginBottom: tokens.spacing(2) },
  title: { fontSize: 18, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 4 },
  row: { flexDirection: 'row', gap: tokens.spacing(1), marginBottom: tokens.spacing(1) },
  actionBtn: {
    flex: 1, height: 52, borderRadius: 14, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  actionText: { fontSize: 16, fontWeight: '700' },
  cancelBtn: {
    height: 48, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
    marginTop: tokens.spacing(1),
  },
  cancelText: { fontSize: 15, fontWeight: '700' },
});
