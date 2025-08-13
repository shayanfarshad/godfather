// src/screens/Settings/index.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSettingsLogic } from './logic';
import PaywallModal from './PaywallModal';
import { useTheme } from 'src/app/theme';
import { tokens } from 'src/app/theme/tokens';

export default function Settings() {
  const { colors } = useTheme();
  const { t } = useTranslation('common');
  const {
    theme, lang, premiumActive,
    toggleTheme, changeLang,
    goScenarioBuilder,
    paywallOpen, setPaywallOpen, activatePremiumMock,
    sound, notifications, toggleSound, toggleNotifications
  } = useSettingsLogic();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.header, { color: colors.text }]}>{t('settings.title')}</Text>

      <Section title={t('settings.theme')}>
        <Row>
          <Choice
            active={theme === 'dark'}
            label={t('settings.theme.dark')}
            onPress={theme === 'dark' ? undefined : toggleTheme}
          />
          <Choice
            active={theme === 'light'}
            label={t('settings.theme.light')}
            onPress={theme === 'light' ? undefined : toggleTheme}
          />
        </Row>
      </Section>

      <Section title={t('settings.language')}>
        <Row>
          <Choice
            active={lang === 'fa'}
            label={t('settings.language.fa')}
            onPress={() => changeLang('fa')}
          />
          <Choice
            active={lang === 'en'}
            label={t('settings.language.en')}
            onPress={() => changeLang('en')}
          />
        </Row>
      </Section>

      <Section title={t('settings.premium')} subtitle={t('settings.premium.desc')}>
        <Pressable
          onPress={goScenarioBuilder}
          style={[styles.blockBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={[styles.blockBtnText, { color: colors.text }]}>{t('settings.premium.manage')}</Text>
          <Badge text={premiumActive ? '✔' : '★'} />
        </Pressable>

        {!premiumActive && (
          <Pressable
            onPress={() => setPaywallOpen(true)}
            style={[styles.blockBtn, { backgroundColor: colors.premium }]}
          >
            <Text style={[styles.blockBtnText, { color: '#1b1a1a' }]}>{t('settings.premium.activate')}</Text>
          </Pressable>
        )}
      </Section>

      <Section title={t('settings.sound')}>
        <Toggle value={sound} onPress={toggleSound} />
      </Section>

      <Section title={t('settings.notifications')}>
        <Toggle value={notifications} onPress={toggleNotifications} />
      </Section>

      <PaywallModal
        visible={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onActivate={activatePremiumMock}
      />
    </View>
  );
}

/* ---------- UI helpers ---------- */

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.section, { borderColor: colors.border }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {subtitle ? <Text style={[styles.sectionSub, { color: colors.subtext }]}>{subtitle}</Text> : null}
      <View style={{ marginTop: 10 }}>{children}</View>
    </View>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

function Choice({ label, active, onPress }: { label: string; active: boolean; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.choice,
        { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? 'transparent' : colors.border },
      ]}
    >
      <Text style={[styles.choiceText, { color: active ? '#fff' : colors.text }]}>{label}</Text>
    </Pressable>
  );
}

function Toggle({ value, onPress }: { value: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.toggle, { backgroundColor: value ? colors.primary : colors.surface, borderColor: colors.border }]}>
      <View style={[styles.knob, { left: value ? 28 : 2, backgroundColor: '#fff' }]} />
    </Pressable>
  );
}

function Badge({ text }: { text: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: colors.bgAlt }]}>
      <Text style={{ color: colors.text, fontWeight: '800' }}>{text}</Text>
    </View>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: tokens.spacing(2), paddingTop: tokens.spacing(5), paddingBottom: tokens.spacing(3) },
  header: { fontSize: 22, fontWeight: '800', marginBottom: tokens.spacing(2) },

  section: { borderWidth: 1, borderRadius: 16, padding: 12, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  sectionSub: { fontSize: 13, marginTop: 4 },

  row: { flexDirection: 'row', gap: 10 },
  choice: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  choiceText: { fontSize: 14, fontWeight: '800' },

  blockBtn: { height: 52, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 8, flexDirection: 'row', gap: 8 },
  blockBtnText: { fontSize: 15, fontWeight: '800' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },

  toggle: { width: 52, height: 28, borderRadius: 18, borderWidth: 1, justifyContent: 'center' },
  knob: { position: 'absolute', width: 24, height: 24, borderRadius: 12 },
});
