import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Player = {
  id: string;
  name: string;
  avatarUri?: string | null;
};

type PlayersState = {
  list: Player[];
};

const initialState: PlayersState = {
  list: [],
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.list = action.payload;
    },
    addPlayer(state, action: PayloadAction<Player>) {
      state.list.push(action.payload);
    },
    updatePlayer(state, action: PayloadAction<Player>) {
      const ix = state.list.findIndex(p => p.id === action.payload.id);
      if (ix >= 0) state.list[ix] = action.payload;
    },
    deletePlayer(state, action: PayloadAction<string>) {
      state.list = state.list.filter(p => p.id !== action.payload);
    }
  },
});
export const {actions: playersAction, reducer: PlayersReducer} = playersSlice;

