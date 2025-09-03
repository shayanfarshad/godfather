import { View, Pressable, StyleSheet, Image } from 'react-native';
import Text from 'src/components/common/Text';
import { useHomeLogic } from './logic';
import { useTheme } from 'src/app/theme';
import { hp, tokens, wp } from 'src/app/theme/tokens';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { colors, name: isDark } = useTheme();
  const { goPlayers, goRules, goSettings, goPlay } = useHomeLogic();
  const { t } = useTranslation("common");
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <View style={styles.headRow}>
          <Pressable style={[styles.headBox, { backgroundColor: colors.bgAlt }]}>
            <FontAwesome5Icon name='power-off' size={hp(3)} color={colors.text} />
          </Pressable>
          <Pressable style={[styles.headBox, { backgroundColor: colors.bgAlt }]}>
            <FontAwesome5Icon name='user' size={hp(3)} color={colors.text} />
          </Pressable>

        </View>

        <Image style={{ width: wp(60), height: hp(18) }} source={isDark === "light" ? require("../../../../assets/images/applogo4.png") : require("../../../../assets/images/applogo.png")} />
        <Image style={{ width: wp(50), height: hp(10) }} source={isDark === "light" ? require("../../../../assets/images/darkTitle.png") : require("../../../../assets/images/lightTitle.png")} />
      </View>

      <View style={styles.grid}>
        <HomeButton
          testID="HOME_PLAYERS"
          label={t('players.title')}
          onPress={goPlayers}
          bg={colors.bgAlt}
          fg={colors.text}
          iconColor={colors.surface}
          border={colors.border}
          icon="users"
        />
        <HomeButton
          testID="HOME_SCENARIO"
          label={t('scenario.title')}
          onPress={goRules}
          bg={colors.bgAlt}
          fg={colors.text}
          iconColor={colors.surface}

          border={colors.border}
          icon='book'
        />
        <HomeButton
          testID="HOME_SETTINGS"
          label={t('settings.title')}
          onPress={goSettings}
          bg={colors.bgAlt}
          fg={colors.text}
          iconColor={colors.surface}

          border={colors.border}
          icon="gear"
        />
        <HomeButton
          testID="HOME_PLAY"
          label={t('gameplay.title')}
          onPress={goPlay}
          bg={colors.bgAlt}
          fg={colors.text}
          iconColor={colors.surface}
          icon='play'
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
  border?: string;
  emphasize?: boolean;
  testID?: string;
  icon: string
  iconColor?: string;
};

function HomeButton({ label, onPress, bg, fg, emphasize, testID, icon, iconColor }: ButtonProps) {
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
          transform: [{ scale: pressed ? 0.98 : 1 }],
          shadowOpacity: emphasize ? 0.2 : 0.1,
        },
      ]}
    >
      <FontAwesome5Icon name={icon} size={hp(4)} color={iconColor} />
      <Text style={{ color: fg }}>{label}</Text>
    </Pressable>
  );
}

const GAP = tokens.spacing(2);

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: tokens.spacing(2), paddingTop: tokens.spacing(6) },
  header: {
    marginBottom: tokens.spacing(4),
    alignItems: "center"
  },
  headRow: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing(2),
  },
  headBox: {
    padding: tokens.spacing(2),
    borderRadius: tokens.radius.lg
  },
  title: { fontSize: 24, fontWeight: '800' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: GAP,
  },
  btn: {
    width: wp(44),
    height: hp(18),
    borderRadius: tokens.radius.xl,
    paddingHorizontal: tokens.spacing(2),
    paddingVertical: tokens.spacing(2),
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowOffset: { width: 4, height: 6 },
  }
});
