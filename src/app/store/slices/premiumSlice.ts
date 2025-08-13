import { createSlice } from '@reduxjs/toolkit';
const premiumSlice = createSlice({
  name: 'premium',
  initialState: { active: false },
  reducers: {
    activate(s) { s.active = true; },
    deactivate(s) { s.active = false; }
  }
});
export const {actions: premiumAction, reducer: PremiumReducer} = premiumSlice;
