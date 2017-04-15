/**
 * Created by ulicny on 07.04.2017.
 */
let expect = require('expect');
let deepFreeze = require('deep-freeze');
import {combineReducers} from 'redux';
import byId, * as fromById from './byId'
import createList, * as fromList from './createList';


const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO' :
            return {
                id: action.id,
                text: action.text,
                finished: action.finished
            };
        case 'TOGGLE_TODO' :
            if (state.id !== action.id) {
                return state;
            } else {
                return Object.assign({}, state, {finished: !state.finished});
            }
        default:
            return state;
    }
};

const listByFilter = combineReducers({
    all: createList("all"),
    active: createList('active'),
    completed: createList('completed'),
});

const todos = combineReducers({
    byId,
    listByFilter,
});

export const getVisibilityTodos = (state, filter) => {
    const ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map((id) => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter)  => {
  return fromList.isFetching(state.listByFilter[filter]);
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

export {todos};

