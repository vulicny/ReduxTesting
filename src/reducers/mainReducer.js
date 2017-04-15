/**
 * Created by ulicny on 12.04.2017.
 */

import {combineReducers} from 'redux';
import {todos} from './todoReducer.js';


//main reducer
const todoAppReducer = combineReducers({
    todos,
});

export {todoAppReducer};

