// src/screens/Settings/PaywallModal.tsx
import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'src/app/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onActivate: () => void;
};

export default function PaywallModal({ visible, onClose, onActivate }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation('common');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>{t('paywall.title')}</Text>
          <Text style={[styles.subtitle, { color: colors.subtext }]}>{t('paywall.subtitle')}</Text>

          <Pressable onPress={onActivate}
            style={[styles.cta, { backgroundColor: colors.premium }]}>
            <Text style={styles.ctaText}>{t('paywall.cta')}</Text>
          </Pressable>

          <Pressable onPress={onClose} style={[styles.cancel, { borderColor: colors.border }]}>
            <Text style={[styles.cancelText, { color: colors.text }]}>{t('settings.premium.later')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#0008', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 420, borderRadius: 20, borderWidth: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  subtitle: { fontSize: 14, marginBottom: 16 },
  cta: { height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#1b1a1a', fontSize: 16, fontWeight: '800' },
  cancel: { marginTop: 10, height: 46, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontSize: 15, fontWeight: '700' },
});
