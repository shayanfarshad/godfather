import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRegisterLogic } from './logic';
import { useNavigation } from '@react-navigation/native';
import TextField from 'src/components/fields/TextField';
import { useTheme } from 'src/app/theme';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const nav = useNavigation<any>();
  const L = useRegisterLogic();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Animated.View style={{ opacity: L.fade, transform: [{ translateY: L.slide }] }}>
        <Text style={[styles.title, { color: colors.text }]}>{t('auth.register.title')}</Text>

        <TextField label={t('auth.fields.name')} value={L.name} onChangeText={L.setName}
                   placeholder={t('auth.placeholders.name')}
                   error={L.errors.name ? t(L.errors.name) : undefined}/>
        <TextField label={t('auth.fields.email')} value={L.email} onChangeText={L.setEmail}
                   placeholder={t('auth.placeholders.email')} keyboardType="email-address"
                   error={L.errors.email ? t(L.errors.email) : undefined}/>
        <TextField label={t('auth.fields.password')} value={L.password} onChangeText={L.setPassword}
                   placeholder={t('auth.placeholders.password')} secureTextEntry secureToggle
                   error={L.errors.password ? t(L.errors.password) : undefined}/>
        <TextField label={t('auth.fields.confirm')} value={L.confirm} onChangeText={L.setConfirm}
                   placeholder={t('auth.placeholders.confirm')} secureTextEntry secureToggle
                   error={L.errors.confirm ? t(L.errors.confirm) : undefined}/>

        {!!L.error && (
          <Text style={{ color: colors.danger, marginBottom: 12 }}>
            {t(`auth.server.${L.error}`, t('auth.server.UNKNOWN'))}
          </Text>
        )}

        <Pressable
          disabled={L.status === 'loading'}
          onPress={L.submit}
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: colors.primary, opacity: pressed || L.status === 'loading' ? 0.8 : 1 }
          ]}
        >
          {L.status === 'loading'
            ? <ActivityIndicator color="#000" />
            : <Text style={styles.btnText}>{t('auth.register.cta')}</Text>}
        </Pressable>

        <Pressable onPress={() => nav.goBack()} style={{ marginTop: 14 }}>
          <Text style={{ color: colors.primary }}>{t('auth.register.toLogin')}</Text>
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
