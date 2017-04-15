/**
 * Created by ulicny on 15.04.2017.
 */

import {combineReducers} from 'redux';

const createList = (filter) => {
    const ids = (state = [], action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'RECEIVE_TODOS' :
                return action.response.map(todo => todo.id);
            default:
                return state;
        }
    };
    const fetching = (state = false, action) => {
        if(action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'REQUEST_TODOS':
                return true;
            case 'RECEIVE_TODOS' :
                return false;
            default:
                return state;
        }
    };

    return combineReducers(
        {
            ids,
            fetching,
        }
    )
};

export default createList;
export const getIds = (state) => state.ids;
export const isFetching = (state) => state.fetching;
