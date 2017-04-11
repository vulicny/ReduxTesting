/**
 * Created by ulicny on 11.04.2017.
 */
import { v4 } from 'node-uuid';


const addTodoAction = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
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
