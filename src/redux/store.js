import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice';
import bookSlice from './book/bookSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
  account : accountSlice,
  book : bookSlice
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
