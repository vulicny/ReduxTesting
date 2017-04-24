/**
 * Created by ulicny on 07.04.2017.
 */
let expect = require('expect');
let deepFreeze = require('deep-freeze');
import {combineReducers} from 'redux';
import byId, * as fromById from './byId'
import createList, * as fromList from './createList';
import {auth} from './auth'


const listByFilter = combineReducers({
    all: createList("all"),
    active: createList('active'),
    completed: createList('completed'),
});

const todos = combineReducers({
    byId,
    listByFilter,
});

const todoApp = combineReducers({
    auth,
    todos,
});

export const getVisibilityTodos = (state, filter) => {
    const ids = fromList.getIds(state.todos.listByFilter[filter]);
    return ids.map((id) => fromById.getTodo(state.todos.byId, id));
};

export const getIsFetching = (state, filter) => {
    return fromList.isFetching(state.todos.listByFilter[filter]);
};

export const getError = (state, filter) => {
    return fromList.getError(state.todos.listByFilter[filter])

};

//tests

const testAddTodos = () => {
    let action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'my todo',
        finished: false

    }
    let stateBefore = {};
    let stareAfter = {
        allIds: [0],
        byId: {
            0: {
                id: 0,
                text: 'my todo',
                finished: false
            }
        }
    }
    deepFreeze(stateBefore);
    expect(todos(stateBefore, action)).toEqual(stareAfter);
}

const testToggleTodo = () => {
    let action = {
        type: 'TOGGLE_TODO',
        id: 0
    }
    let stateBefore = {
        allIds: [0],
        byId: {
            0: {
                id: 0,
                text: 'my todo',
                finished: false
            }
        }
    };
    let stateAfter = {
        allIds: [0],
        byId: {
            0: {
                id: 0,
                text: 'my todo',
                finished: true
            }
        }
    };
    deepFreeze(stateBefore);
    expect(todos(stateBefore, action)).toEqual(stateAfter);
}

//run the tests
// testAddTodos();
// testToggleTodo();


console.log('All tests passed.');

export {todoApp};

