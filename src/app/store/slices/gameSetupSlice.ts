// src/app/store/slices/gameSetupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScenarioKey = 'zodiac' | 'nustradamus' | 'jack' | 'elclasico';

export type SelectedRole = {
  key: string;                // کلید نقش (مثلا 'al_capone' یا 'citizen' یا 'mafioso')
  count: number;              // برای نقش‌های چندتایی مثل citizen/mafioso
  team?: 'mafia' | 'town' | 'neutral';
};

type GameSetupState = {
  selectedPlayerIds: string[];
  scenario?: ScenarioKey;
  roles: SelectedRole[];      // کارت‌های انتخاب‌شده (با شمارنده)
};

const initialState: GameSetupState = {
  selectedPlayerIds: [],
  scenario: "zodiac",
  roles: [],
};

const gameSetupSlice = createSlice({
  name: 'GameSetup',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<string[]>) {
      state.selectedPlayerIds = action.payload;
    },
    setScenario(state, action: PayloadAction<ScenarioKey | undefined>) {
      state.scenario = action.payload;
      // تغییر سناریو => پاکسازی نقش‌ها
      if (!action.payload) state.roles = [];
    },
    clearRoles(state) {
      state.roles = [];
    },
    // افزودن/ست‌کردن یک نقش واحد (برای کارت‌های تک‌مثالی)
    toggleSingleRole(state, action: PayloadAction<{ key: string; team?: 'mafia' | 'town' | 'neutral' }>) {
      const { key, team } = action.payload;
      const idx = state.roles.findIndex(r => r.key === key);
      if (idx >= 0) state.roles.splice(idx, 1);  // remove
      else state.roles.push({ key, count: 1, team });
    },
    // افزایش/کاهش نقش‌های چندتایی (citizen / mafioso)
    addCountRole(state, action: PayloadAction<{ key: string; team?: 'mafia' | 'town' }>) {
      const { key, team } = action.payload;
      const r = state.roles.find(x => x.key === key);
      if (r) r.count += 1;
      else state.roles.push({ key, count: 1, team });
    },
    subCountRole(state, action: PayloadAction<{ key: string }>) {
      const { key } = action.payload;
      const r = state.roles.find(x => x.key === key);
      if (!r) return;
      r.count -= 1;
      if (r.count <= 0) {
        const idx = state.roles.findIndex(x => x.key === key);
        if (idx >= 0) state.roles.splice(idx, 1);
      }
    },
  },
});

export const {actions: gameSetupAction, reducer: GameSetupReducer} = gameSetupSlice;
 

