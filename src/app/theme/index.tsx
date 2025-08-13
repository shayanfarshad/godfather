// src/app/theme/index.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { useAppSelector } from '../store';
import { darkTheme } from './dark';
import { lightTheme } from './light';
import type { Theme, ThemeName } from './types';

const ThemeCtx = createContext<Theme>(darkTheme);
export const useTheme = () => useContext(ThemeCtx);

const themes: Record<ThemeName, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = (useAppSelector(s => s.Settings.theme) ?? 'dark') as ThemeName;

  const value = useMemo<Theme>(() => {
    return themes[mode] ?? darkTheme;
  }, [mode]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
};
