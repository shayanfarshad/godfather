import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type ThemeMode = 'dark' | 'light';
type Lang = 'fa' | 'en';
const initial = { theme: 'dark' as ThemeMode, lang: 'fa' as Lang };

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initial,
  reducers: {
    setTheme(s, a: PayloadAction<ThemeMode>) { s.theme = a.payload; },
    setLang(s, a: PayloadAction<Lang>) { s.lang = a.payload; }
  }
});
export const {actions: settingsAction, reducer: SettingsReducer} = settingsSlice;
