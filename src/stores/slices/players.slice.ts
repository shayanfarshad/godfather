import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the structure of a Player
export interface Player {
  id: number;
  name: string;
  avatar: string;
}

// Define the initial state structure
interface PlayerState {
  players: Player[];
  showNotice: boolean;
}

// Initial state
const initialState: PlayerState = {
  players: [],
  showNotice: true,
};

// Create the Redux slice
const playersSlice = createSlice({
  name: 'Players',
  initialState,
  reducers: {
    // Add a player
    addPlayer: (state: PlayerState, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },

    // Remove a player by id
    removePlayer: (state: PlayerState, action: PayloadAction<number>) => {
      state.players = state.players.filter(
        player => player.id !== action.payload,
      );
    },


    // Reset the players list
    resetPlayers: (state: PlayerState) => {
      state.players = [];
    },

    // Set showNotice to false
    setNotice: (state: PlayerState) => {
      state.showNotice = false;
    },
  },
});

// Export actions
export const { actions: playersActions, reducer: PlayersReducer } = playersSlice;

