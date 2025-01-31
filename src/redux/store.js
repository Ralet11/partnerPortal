import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import partnerReducer from './slices/partnerSlice';
import { partnerApi } from '../services/request/PartnerApi';

// Config de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['partner'] // Persistimos el estado de `partner`
};

// Root Reducer con `partnerApi.reducer`
const rootReducer = combineReducers({
  partner: partnerReducer,
  [partnerApi.reducerPath]: partnerApi.reducer, // Agregamos el reducer de RTK Query
});

// Redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }) // Desactiva serializableCheck para evitar advertencias con persistencia
      .concat(partnerApi.middleware), // Agrega el middleware de RTK Query
});

export const persistor = persistStore(store);
