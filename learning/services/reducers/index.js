import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import aiReducers from './aiReducers';

const rootReducer = combineReducers({
    auth,
    aiReducers,
});

const persistConfig = {
    key: 'root',
    storage,
};

export default persistReducer(persistConfig, rootReducer);