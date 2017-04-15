/**
 * Created by ulicny on 11.04.2017.
 */
import {v4} from 'node-uuid';
import * as api from './api';


const receiveTodosAction = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response,
});

const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodosAction(filter, response)
    );

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

export {fetchTodos, addTodoAction, toggleTodoAction, setFilterAction};
