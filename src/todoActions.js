/**
 * Created by ulicny on 11.04.2017.
 */
import {v4} from 'node-uuid';
import {getIsFetching} from './reducers/index';
import * as api from './api';
import {normalize} from 'normalizr';
import {todo, arrayOfTodos} from './schema'


const fetchTodos = (filter) => (dispatch, getState) => {

    if (getIsFetching(getState(), filter)) {
        //skip if it is just fetching for given filter (avoid parallel submits for the same filter on server(API))
        return Promise.resolve();
    }
    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter
    });

    return api.fetchTodos(filter).then(
        response => {
            return dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter,
                response: normalize(response, arrayOfTodos),
            })
        },
        error => {
            return dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter,
                error: error.message || 'Something went wrong.',
            });
        }
    );
};

const addTodo = (text) => (dispatch) => {

    return api.addTodo(text).then(response => {
        return dispatch({
            type: 'ADD_TODO_SUCCESS',
            response: normalize(response, todo),
        });
    });
};

const toggleTodo = (id) => (dispatch) => {
    return api.toggleTodo(id).then(response => {
        return dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response: normalize(response, todo),
        })
    })
};

export {fetchTodos, addTodo, toggleTodo};
