/**
 * Created by ulicny on 07.04.2017.
 */
let expect = require('expect');
let deepFreeze = require('deep-freeze');
import {combineReducers} from 'redux';


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

const byId = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_TODOS' :
            let nextState = {...state};
            action.response.forEach(todo => {
                nextState[todo.id] = todo;
            });
            return nextState;
        default:
            return state;
    }
};

const createList = (filter) => {
    return (state = [], action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'RECEIVE_TODOS' :
                return action.response.map(todo => todo.id);
            default:
                return state;
        }
    }
};

const idsByFilter = combineReducers({
    all: createList("all"),
    active: createList('active'),
    completed: createList('completed'),
});

const todos = combineReducers({
    byId,
    idsByFilter
});

export const getVisibilityTodos = (state, filter) => {
    const ids = state.todos.idsByFilter[filter];
    return ids.map((id) => state.todos.byId[id]);
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

exports.todos = todos;

