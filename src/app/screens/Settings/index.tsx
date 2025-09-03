// src/screens/Settings/index.tsx
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from 'src/components/common/Text';
import { useSettingsLogic } from './logic';
import PaywallModal from './PaywallModal';
import { useTheme } from 'src/app/theme';
import { hp, tokens, wp } from 'src/app/theme/tokens';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const {
    theme, lang, premiumActive,
    toggleTheme, changeLang,
    goScenarioBuilder,
    paywallOpen, setPaywallOpen, activatePremiumMock,
    sound, notifications, toggleSound, toggleNotifications
  } = useSettingsLogic();

  console.log('Settings rendered with theme:', theme, 'lang:', lang, 'premiumActive:', premiumActive);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text type='bold' style={{ color: colors.text, fontSize: hp(4) }}>{t('settings.title')}</Text>

      <Section background={colors.bgAlt} title={t('settings.theme')}>
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

      <Section background={colors.bgAlt} title={t('settings.language')}>
        <Row>
          <Choice
            active={lang === 'fa'}
            label={t('settings.language.fa')}
            onPress={() => lang === "fa" ? undefined : changeLang('fa')}
          />
          <Choice
            active={lang === 'en'}
            label={t('settings.language.en')}
            onPress={() => lang === "en" ? undefined : changeLang('en')}
          />
        </Row>
      </Section>

      <Section background={colors.bgAlt} title={t('settings.premium')} subtitle={t('settings.premium.desc')}>
        {/* <Pressable
          onPress={goScenarioBuilder}
          style={[styles.blockBtn, { backgroundColor: colors.bg }]}
        >
          <Text style={[styles.blockBtnText, { color: colors.text }]}>{t('settings.premium.manage')}</Text>
          <Badge text={premiumActive ? '✔' : '★'} />
        </Pressable> */}

        {!premiumActive && (
          <Pressable
            onPress={() => setPaywallOpen(true)}
            style={[styles.blockBtn, { backgroundColor: colors.premium }]}
          >
            <Text style={{ color: '#1b1a1a' }}>{t('settings.premium.activate')}</Text>
          </Pressable>
        )}
      </Section>

      <Section background={colors.bgAlt} title={t('settings.sound')}>
        <Toggle value={sound} onPress={toggleSound} />
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

function Section({ title, subtitle, background, children }: { title: string; subtitle?: string; background: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.section, { backgroundColor: background }]}>
      <Text style={{ color: colors.text }}>{title}</Text>
      {subtitle ? <Text style={{ color: colors.subtext }}>{subtitle}</Text> : null}
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
        { backgroundColor: active ? colors.primary : colors.bg },
      ]}
    >
      <Text style={{ color: active ? '#fff' : colors.text }}>{label}</Text>
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

  section: { borderRadius: 16, padding: 12, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  sectionSub: { fontSize: 13, marginTop: 4 },

  row: { flexDirection: 'row', gap: 10 },
  choice: {
    flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowRadius: 6, shadowOpacity: 0.1, shadowOffset: {
      width: 4, height: 4
    }
  },
  choiceText: { fontSize: 14, fontWeight: '800' },

  blockBtn: {
    height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 8, flexDirection: 'row', gap: 8,
    shadowColor: "#000", shadowRadius: 6, shadowOpacity: 0.1, shadowOffset: {
      width: 4, height: 4
    }
  },
  blockBtnText: { fontSize: 15, fontWeight: '800' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },

  toggle: { width: wp(13.2), height: 28, borderRadius: 18, justifyContent: 'center' },
  knob: { position: 'absolute', width: 24, height: 24, borderRadius: 12 },
});
