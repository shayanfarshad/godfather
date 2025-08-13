import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLoginLogic } from './logic';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'src/app/theme';
import TextField from 'src/components/fields/TextField';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const nav = useNavigation<any>();
  const { email, setEmail, password, setPassword, submit, errors, status, error, fade, slide } = useLoginLogic();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
        <Text style={[styles.title, { color: colors.text }]}>{t('auth.login.title')}</Text>

        <TextField
          label={t('auth.fields.email')}
          value={email}
          onChangeText={setEmail}
          placeholder={t('auth.placeholders.email')}
          keyboardType="email-address"
          error={errors.email ? t(errors.email) : undefined}
        />
        <TextField
          label={t('auth.fields.password')}
          value={password}
          onChangeText={setPassword}
          placeholder={t('auth.placeholders.password')}
          secureTextEntry
          secureToggle
          error={errors.password ? t(errors.password) : undefined}
        />

        {!!error && (
          <Text style={{ color: colors.danger, marginBottom: 12 }}>
            {t(`auth.server.${error}`, t('auth.server.UNKNOWN'))}
          </Text>
        )}

        <Pressable
          disabled={status === 'loading'}
          onPress={submit}
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: colors.primary, opacity: pressed || status === 'loading' ? 0.8 : 1 }
          ]}
        >
          {status === 'loading'
            ? <ActivityIndicator color="#000" />
            : <Text style={[styles.btnText]}>{t('auth.login.cta')}</Text>}
        </Pressable>

        <Pressable onPress={() => nav.navigate('Register' as never)} style={{ marginTop: 14 }}>
          <Text style={{ color: colors.primary }}>{t('auth.login.toRegister')}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 18 },
  btn: { height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  btnText: { fontWeight: '800', fontSize: 16, color: '#1F1525' }
});
