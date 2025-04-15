import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './slices/auth.slice.ts';

const persistedConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistedConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
export type IRootState = ReturnType<typeof store.getState>;
