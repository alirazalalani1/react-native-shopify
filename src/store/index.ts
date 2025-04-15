import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './slices/auth.slice.ts';
import appSlice from './slices/app.slice.ts';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedAppReducer = persistReducer(appPersistConfig, appSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    app: persistedAppReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
export type IRootState = ReturnType<typeof store.getState>;
