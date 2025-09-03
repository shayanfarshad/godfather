import { combineReducers } from "@reduxjs/toolkit";

import {
    AuthReducer,
    SettingsReducer,
    PremiumReducer,
    PlayersReducer,
    ScenariosReducer
} from "./slices";
import { GameSetupReducer } from "./slices/gameSetupSlice";

export const RootReducer = combineReducers({
    Auth: AuthReducer,
    Settings: SettingsReducer,
    Premium: PremiumReducer,
    Players: PlayersReducer,
    Scenarios:ScenariosReducer,
    GameSetup: GameSetupReducer,

});

export type RootState = ReturnType<typeof RootReducer>;
