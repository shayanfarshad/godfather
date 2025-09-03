// src/app/components/Text.tsx
import React from 'react';
import {
  Text as RNText,
  TextProps,
  TextStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/store';
import { useTheme } from 'src/app/theme';

type FontType = 'bold' | 'light' | 'medium' | 'iran';

interface CustomTextProps extends TextProps {
  type?: FontType;
  style?: StyleProp<TextStyle>; // ✅ قبول TextStyle یا آرایه
}

const Text: React.FC<CustomTextProps> = ({
  type = 'medium',
  style,
  numberOfLines,        // بذار همون props RN کار کنه (undefined = نامحدود)
  ...restProps
}) => {
  const language = useAppSelector(s => s.Settings.lang, shallowEqual); // 'fa' | 'en'
  const { colors } = useTheme();

  // اگر style آرایه/آبجکت باشه، resolve می‌کنیم تا به color دسترسی داشته باشیم
  const resolved = StyleSheet.flatten(style) || {};
  const baseStyle: TextStyle = {
    fontSize: language === 'en' ? 20 : 16,
    color: resolved.color ?? colors.text, // ✅ اگر کاربر color نداد، از theme
    fontFamily: font(type, language),
    textAlign: language === 'fa' ? 'left' : 'right',
  };

  return (
    <RNText
      {...restProps}
      numberOfLines={numberOfLines}   // ✅ undefined = نامحدود
      ellipsizeMode={restProps.ellipsizeMode ?? 'tail'}
      style={[baseStyle, style]}      // ✅ آرایه‌ی تک‌سطحی (بدون نِست)
    >
      {restProps.children}
    </RNText>
  );
};



export const font = (type: FontType, language: string): string => {
  if (language === 'en') {
    switch (type) {
      case 'bold': return 'WinkySans-Bold';
      case 'light': return 'WinkySans-Light';
      case 'medium': return 'WinkySans-Medium';
      case 'iran':  return 'WinkySans-Regular';
    }
  } else {
    switch (type) {
      case 'bold': return 'IRANSansXNoEn-Bold';
      case 'light': return 'IRANSansXNoEn-Light';
      case 'medium': return 'IRANSansXNoEn-Medium';
      case 'iran':  return 'IRANSansXNoEn-Iran';
    }
  }
};

export default Text;
