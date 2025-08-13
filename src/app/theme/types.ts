// src/app/theme/types.ts
export type ThemeName = 'dark' | 'light';

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  surface: string;
  border: string;
  text: string;
  subtext: string;
  primary: string;
  premium: string;
  danger: string;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
}
