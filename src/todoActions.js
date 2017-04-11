/**
 * Created by ulicny on 11.04.2017.
 */

//global ID counter - temporary solution
let globalId = 1;

const addTodoAction = (text) => ({
    type: 'ADD_TODO',
    id: globalId++,
    text: text,
    finished: false
});

const toggleTodoAction = (id) => ({
    type: 'TOGGLE_TODO',
    id: id
});

const setFilterAction = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    visibilityFilter: filter
});

export {addTodoAction, toggleTodoAction, setFilterAction};
