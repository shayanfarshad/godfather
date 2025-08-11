import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {t} from 'i18next';

// Define the structure of a Role, Player, and Job
interface Job {
  id: number;
  role: string;
}

export interface NightStory {
  id: number;
  turn: number;
  name: string;
  description: string;
  jobs: Job[];
}

interface LastMoveCard {
  id: number;
  title: string;
  description: string;
}

interface Duty {
  sixthSense?: boolean;
  buyCitizen?: boolean;
  getAbility?: boolean;
  guess?: boolean;
  saveOwn?: number;
  savePeople?: boolean;
  nightShot?: number;
  inquiry?: boolean;
  returns?: boolean;
}

export interface Role {
  id: number;
  title: string;
  active: boolean;
  shield: boolean;
  side: 'city' | 'mafia' | 'free';
  image: any; // You can replace this with a specific type for images if applicable
  description: string;
  duty?: Duty;
}

interface Player {
  id: number;
  name: string;
  avatar: string;
}

// Define the initial state structure
interface GameState {
  roles: Role[];
  players: Player[];
  rolePlayers: {player: Player; role: Role}[];
  playerWithoutRole: number;
  removedPlayers: {player: Player; role: Role}[];
  night: number;
  day: number;
  gameType: string;
  nightStory: NightStory[];
  nustraLastMove: LastMoveCard[];
  jackLastMove: LastMoveCard[];
}

// Initial state
const initialState: GameState = {
  roles: [],
  players: [],
  rolePlayers: [],
  removedPlayers: [],
  playerWithoutRole: 0,
  night: 0,
  day: 0,
  gameType: '',
  nightStory: [
    {
      id: 0,
      turn: 1,
      name: 'شب معارفه',
      description:
        'در این شب در ابتدا نوستراداموس استعلام ۳ یا ۲ نفر را میگیرد که با توجه به آن استعلام می تواند با مافیا یا شهروند بازی کند و در ادامه مافیا بیدار می شوند و هم دیگر را می شناسند ، دراین شب مافیا شلیک ندارند',
      jobs: [{id: 0, role: 'نوستراداموس'}],
    },
    {
      id: 1,
      turn: 2,
      name: 'شب',
      description: '',
      jobs: [
        {id: 0, role: 'مافیا'},
        {id: 1, role: 'دکتر'},
        {id: 2, role: 'لئون'},
        {id: 3, role: 'همشهری کین'},
        {id: 4, role: 'کنستانتین'},
      ],
    },
  ],
  nustraLastMove: [
    {
      id: 1,
      title: t('game.rolecards.lastMoveCards.lambsSilence'),
      description: t('game.rolecards.lastMoveCards.lambDesc'),
    },
    {
      id: 2,
      title: t('game.rolecards.lastMoveCards.IdentityDisclosure'),
      description: t('game.rolecards.lastMoveCards.identityDesc'),
    },
    {
      id: 3,
      title: t('game.rolecards.lastMoveCards.beautifulMind'),
      description: t('game.rolecards.lastMoveCards.beautifalNustraDesc'),
    },
    {
      id: 4,
      title: t('game.rolecards.lastMoveCards.bracelet'),
      description: t('game.rolecards.lastMoveCards.braceletDesc'),
    },
    {
      id: 5,
      title: t('game.rolecards.lastMoveCards.faceoff'),
      description: t('game.rolecards.lastMoveCards.faceoffDesc'),
    },
  ],
  jackLastMove: [
    {
      id: 1,
      title: t('game.rolecards.lastMoveCards.lambsSilence'),
      description: t('game.rolecards.lastMoveCards.lambDesc'),
    },
    {
      id: 2,
      title: t('game.rolecards.lastMoveCards.IdentityDisclosure'),
      description: t('game.rolecards.lastMoveCards.identityDesc'),
    },
    {
      id: 3,
      title: t('game.rolecards.lastMoveCards.beautifulMind'),
      description: t('game.rolecards.lastMoveCards.beautifalJackDesc'),
    },
    {
      id: 4,
      title: t('game.rolecards.lastMoveCards.bracelet'),
      description: t('game.rolecards.lastMoveCards.braceletDesc'),
    },
    {
      id: 5,
      title: t('game.rolecards.lastMoveCards.faceoff'),
      description: t('game.rolecards.lastMoveCards.faceoffDesc'),
    },
  ],
};

// Create the Redux slice
const gameSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    addDay: state => {
      state.day += 1;
      return state;
    },
    addNight: state => {
      state.night += 1;
      return state;
    },
    updateRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
      return state;
    },
    updateLastCards: (state, action: PayloadAction<LastMoveCard[]>) => {
      state.jackLastMove = action.payload; // Assuming jack's cards are updated
      return state;
    },
    updateRolePlayers: (
      state,
      action: PayloadAction<{player: Player; role: Role}[]>,
    ) => {
      state.rolePlayers = action.payload;
      return state;
    },

    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
      return state;
    },
    removeRole: (state, action: PayloadAction<Role>) => {
      state.roles = state.roles.filter(role => role.id !== action.payload.id);
      return state;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
      return state;
    },
    removePlayer: (state, action: PayloadAction<Player>) => {
      state.players = state.players.filter(
        player => player.id !== action.payload.id,
      );
      return state;
    },

    updateWithoutRole: (state, action: PayloadAction<number>) => {
      state.playerWithoutRole = action.payload;
      return state;
    },

    updateRemovedPlayers: (
      state,
      action: PayloadAction<{player: Player; role: Role}[]>,
    ) => {
      state.removedPlayers = action.payload;
      return state;
    },
    setGameType: (state, action: PayloadAction<string>) => {
      state.gameType = action.payload;
      return state;
    },
    resetLastMoves: state => {
      state.jackLastMove = initialState.jackLastMove;
      state.nustraLastMove = initialState.nustraLastMove;
      return state;
    },

    gameReset: state => {
      state.removedPlayers = [];
      state.roles = [];
      state.players = [];
      state.gameType = '';
      state.rolePlayers = [];
      state.night = 0;
      state.day = 0;
      return state;
    },
  },
});

export const {actions: gameActions, reducer: GameReducer} = gameSlice;
