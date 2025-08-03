// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './services/reducers';

// 1) Configure persistence
const persistConfig = {
  key: 'root',               // storage key prefix
  storage: AsyncStorage,     // use React Native AsyncStorage
  whitelist: ['auth'],       // only persist the "auth" slice (adjust to your slice names)
  // blacklist: ['ui'],      // or blacklist slices you DON'T want to persist
};

// 2) Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3) Create store with middleware
const middleware = [thunk];
const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

// 4) Create persistor for your <PersistGate>
export const persistor = persistStore(store);
export default store;