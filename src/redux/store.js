import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import partnerReducer from './slices/partnerSlice';

// Config de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['partner'] 
};

const rootReducer = combineReducers({
  partner: partnerReducer,
  // Agrega otros slices aquí si los tienes
});

// Redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
