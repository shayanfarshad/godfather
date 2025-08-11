import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    language: 'fa',
    theme: 'light',
  },
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      return state;
    },

    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      return state;
    },
  },
});

export const {actions: AppActions, reducer: AppReducer} = appSlice;
