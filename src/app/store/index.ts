import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";

import { RootReducer, RootState } from "./root-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage: AsyncStorage,
    version: 1,
    whitelist: ["Auth", "Premium", "Settings","Players","Scenarios"],
    blacklist: [
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


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const appStorePersistor = persistStore(appStore);

export type AppDispatch = typeof appStore.dispatch;

export const storeDispatch = appStore.dispatch;
