import { combineReducers } from "@reduxjs/toolkit";

import {
  AppReducer,
  UserInfoReducer,
  GameReducer,
  RolesInfoReducer,
  PlayersReducer
} from "./slices";

export const RootReducer = combineReducers({
  App: AppReducer,
  User: UserInfoReducer,
  Game: GameReducer,
  Roles:RolesInfoReducer,
  Players:PlayersReducer

});

export type RootState = ReturnType<typeof RootReducer>;
