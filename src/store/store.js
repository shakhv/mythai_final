import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import { promiseReducer } from './promiseReducer';
import cardReducer from './cardReducer'
import searchInputReducer from './searchReducer';

export const store = createStore(combineReducers({
    promise: promiseReducer,
    cardReducer: cardReducer,
    searchReducer: searchInputReducer
}),applyMiddleware(thunk))
