import { configureStore, combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
    token: tokenReducer,
});

const store = configureStore(rootReducer);

export default store;
