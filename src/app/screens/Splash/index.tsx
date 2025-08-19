import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {tokens} from 'src/app/theme/tokens';
import {useSplashLogic} from './logic';
import {useTheme} from 'src/app/theme';

export default function Splash() {
  const {colors} = useTheme();
  const {t} = useTranslation('common');
  const {goNext} = useSplashLogic();

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.quad),
    });
    opacity.value = withTiming(1, {duration: 600});
  }, []);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  useEffect(() => {
    goNext();
  }, [goNext]);

  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.logoWrap, rStyle]}>
        <View
          style={[
            styles.logoBadge,
            {backgroundColor: colors.surface, borderColor: colors.border},
          ]}
        />
        <Text style={[styles.title, {color: colors.text}]}>
          {t('app.name')}
        </Text>
        <Text style={[styles.subtitle, {color: colors.subtext}]}>
          {t('splash.loading')}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  logoWrap: {alignItems: 'center', gap: tokens.spacing(1)},
  logoBadge: {width: 120, height: 120, borderRadius: 28, borderWidth: 1.2},
  title: {fontSize: 28, fontWeight: '800', marginTop: tokens.spacing(2)},
  subtitle: {fontSize: 14, marginTop: 4},
});
