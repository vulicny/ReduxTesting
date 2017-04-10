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
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO' :
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map((item) => todo(item, action));
        default:
            return state;
    }
};


const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER' :
            return action.visibilityFilter;
        default:
            return state;
    }

};

const todoApp = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
}


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

const testVisibilityFilter = () => {
    let stateBefore = 'SHOW_ALL';
    let stateAfter = 'SHOW_COMPLETED';
    let action = {
        type: 'SET_VISIBILITY_FILTER',
        visibilityFilter: 'SHOW_COMPLETED'
    }
    deepFreeze(stateBefore);
    expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
}

const testTodoApp = () => {
    let action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'my todo',
        finished: false

    };

    let stateBefore = {
        todos: [],
        visibilityFilter: 'SHOW_ALL'
    };

    let stateAfter_1 = {
        todos: [
            {
                id: 0,
                text: 'my todo',
                finished: false
            }
        ],
        visibilityFilter:'SHOW_ALL'
    };

    let stateAfter_2 = {
        todos: [
            {
                id: 0,
                text: 'my todo',
                finished: false
            }
        ],
        visibilityFilter:'SHOW_COMPLETED'
    };

    let action_filter = {
        type: 'SET_VISIBILITY_FILTER',
        visibilityFilter: 'SHOW_COMPLETED'
    };


    expect(todoApp(stateBefore, action)).toEqual(stateAfter_1);
    expect(todoApp(stateAfter_1,action_filter )).toEqual(stateAfter_2);

}

//run the tests
testAddTodos();
testToggleTodo();
testVisibilityFilter();
testTodoApp();
console.log('All tests passed.');