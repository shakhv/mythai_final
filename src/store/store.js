import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import { promiseReducer } from './promiseReducer';
import cardReducer from './cardReducer'

export const store = createStore(combineReducers({
    promise: promiseReducer,
    cardReducer: cardReducer
}),applyMiddleware(thunk))
