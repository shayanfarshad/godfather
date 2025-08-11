import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";

import { RootReducer, RootState } from "./root-reducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  whitelist: ["User", "App","Players","Roles"],
  blacklist: [
   "Game"
  ],
};
const persistedRootReducer = persistReducer(persistConfig, RootReducer);

export const appStore = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }),
});

export const appStorePersistor = persistStore(appStore);

export type AppDispatch = typeof appStore.dispatch;

export const storeDispatch = appStore.dispatch;
