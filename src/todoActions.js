/**
 * Created by ulicny on 11.04.2017.
 */

//global ID counter - temporary solution
var globalId = 0;

const addTodoAction = (text) => {
    return {
        type: 'ADD_TODO',
        id: globalId++,
        text: text,
        finished: false
    }
};

const toggleTodoAction = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id: id
    }
};

const setFilterAction = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        visibilityFilter: filter
    }
}

export {addTodoAction, toggleTodoAction, setFilterAction};
