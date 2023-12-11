import { combineReducers, createStore } from 'redux';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
    token: tokenReducer,
});

const store = createStore(rootReducer);

export default store;
