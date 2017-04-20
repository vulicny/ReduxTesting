/**
 * Created by ulicny on 15.04.2017.
 */

import {combineReducers} from 'redux';

const createList = (filter) => {
    const ids = (state = [], action) => {

        switch (action.type) {
            case 'FETCH_TODOS_SUCCESS' :
                return (action.filter === filter)
                    ? action.response.result
                    : state;
            case 'ADD_TODO_SUCCESS' :
                return (filter !== 'completed')
                    ? [...state, action.response.result]
                    : state;
            case 'UPDATE_TODO_SUCCESS':
                //handle same way as toggle (from filter list update is interesting just change of finished)
            case 'TOGGLE_TODO_SUCCESS' :
                if(filter ==='active' && action.response.entities.todos[action.response.result].finished) {
                    //remove from active list
                    return state.filter((id) =>id !== action.response.entities.todos[action.response.result].id )
                } else if (filter === 'completed' && ! action.response.entities.todos[action.response.result].finished) {
                    //remove from completed list
                    return state.filter((id) =>id !== action.response.entities.todos[action.response.result].id )
                }
                return state;
            default:
                return state;
        }
    };
    const fetching = (state = false, action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_TODOS_REQUEST':
                return true;
            case 'FETCH_TODOS_SUCCESS' :
            case 'FETCH_TODOS_FAILURE' :
                return false;
            default:
                return state;
        }
    };

    const errorMessage = (state = null, action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_TODOS_FAILURE' :
                return action.error;
            case 'FETCH_TODOS_SUCCESS' :
                return null;
            default:
                return state;
        }

    };

    return combineReducers({
        ids,
        fetching,
        errorMessage
    })
};

export default createList;
export const getIds = (state) => state.ids;
export const isFetching = (state) => state.fetching;
export const getError = (state) => state.errorMessage;
