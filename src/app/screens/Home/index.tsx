import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useHomeLogic } from './logic';
import { useTheme } from 'src/app/theme';
import { tokens } from 'src/app/theme/tokens';

export default function Home() {
  const { t } = useTranslation('common');
  const { colors } = useTheme();
  const { goPlayers, goRules, goSettings, goPlay } = useHomeLogic();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{t('app.name')}</Text>
      </View>

      <View style={styles.grid}>
        <HomeButton
          testID="HOME_PLAYERS"
          label={t('players.title')}
          onPress={goPlayers}
          bg={colors.surface}
          fg={colors.text}
          border={colors.border}
        />
        <HomeButton
          testID="HOME_RULES"
          label={t('rules.title')}
          onPress={goRules}
          bg={colors.surface}
          fg={colors.text}
          border={colors.border}
        />
        <HomeButton
          testID="HOME_SETTINGS"
          label={t('settings.title')}
          onPress={goSettings}
          bg={colors.surface}
          fg={colors.text}
          border={colors.border}
        />
        <HomeButton
          testID="HOME_PLAY"
          label={t('gameplay.title')}
          onPress={goPlay}
          bg={colors.primary}
          fg="#ffffff"
          border={colors.primary}
          emphasize
        />
      </View>
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  bg: string;
  fg: string;
  border: string;
  emphasize?: boolean;
  testID?: string;
};

function HomeButton({ label, onPress, bg, fg, border, emphasize, testID }: ButtonProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: bg,
          borderColor: border,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          shadowOpacity: emphasize ? 0.2 : 0.1,
        },
      ]}
    >
      <Text style={[styles.btnText, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

const GAP = tokens.spacing(2);

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: tokens.spacing(2), paddingTop: tokens.spacing(6) },
  header: { marginBottom: tokens.spacing(4) },
  title: { fontSize: 24, fontWeight: '800' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: GAP,
  },
  btn: {
    width: '48%',
    height: 120,
    borderRadius: tokens.radius.xl,
    borderWidth: 1,
    paddingHorizontal: tokens.spacing(2),
    paddingVertical: tokens.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  btnText: { fontSize: 18, fontWeight: '700' },
});
