import { combineReducers } from "@reduxjs/toolkit";

import {
    AuthReducer,
    SettingsReducer,
    PremiumReducer,
    PlayersReducer,
    ScenariosReducer
} from "./slices";

export const RootReducer = combineReducers({
    Auth: AuthReducer,
    Settings: SettingsReducer,
    Premium: PremiumReducer,
    Players: PlayersReducer,
    Scenarios:ScenariosReducer

});

export type RootState = ReturnType<typeof RootReducer>;
