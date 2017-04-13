/**
 * Created by ulicny on 07.04.2017.
 */
let expect = require('expect');
let deepFreeze = require('deep-freeze');


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

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO' :
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map((item) => todo(item, action));
        default:
            return state;
    }
};

export const getVisibilityTodos = (state, filter) => {
    switch (filter) {
        case 'all' :
            return state.todos;
        case 'active' :
            return state.todos.filter(t => !t.finished);
        case 'completed' :
            return state.todos.filter(t => t.finished);
        default:
            throw new Error('Unknown filter: ${filter}');
    }
};

//tests

const testAddTodos = () => {
    let action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'my todo',
        finished: false

    }
    let stateBefore = [];
    let stareAfter = [
        {
            id: 0,
            text: 'my todo',
            finished: false
        }
    ]
    deepFreeze(stateBefore);
    expect(todos(stateBefore, action)).toEqual(stareAfter);
}

const testToggleTodo = () => {
    let action = {
        type: 'TOGGLE_TODO',
        id: 0
    }
    let stateBefore = [
        {
            id: 0,
            text: 'my todo',
            finished: false
        },
        {
            id: 1,
            text: 'my todo 1',
            finished: false
        }
    ];
    let stateAfter = [
        {
            id: 0,
            text: 'my todo',
            finished: true
        },
        {
            id: 1,
            text: 'my todo 1',
            finished: false
        }
    ];
    deepFreeze(stateBefore);
    expect(todos(stateBefore, action)).toEqual(stateAfter);
}

//run the tests
testAddTodos();
testToggleTodo();


console.log('All tests passed.');

exports.todos = todos;

