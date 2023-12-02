/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */

import {Platform} from 'react-native';

export const commonSpacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

const androidSpacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  // Add Android-specific spacing values here
} as const;

const iosSpacing = {
  // Add iOS-specific spacing values here
} as const;

// Combine platform-specific spacing with common spacing
export const spacing: Record<string, number> = {
  ...commonSpacing,
  ...(Platform.OS === 'android' ? androidSpacing : iosSpacing),
} as const;

// export type Spacing = keyof typeof spacing;
export type Spacing = keyof typeof spacing;
