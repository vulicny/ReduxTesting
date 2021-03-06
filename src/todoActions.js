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

    return api.fetchTodosRemote(filter).then(
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

const addTodo = (item) => (dispatch) => {

    return api.addTodoRemote(item).then(response => {
        return dispatch({
            type: 'ADD_TODO_SUCCESS',
            response: normalize(response, todo),
        });
    });
};

const updateTodo = (item) => (dispatch) => {

    return api.updateTodoRemote(item).then(response => {
        return dispatch({
            type: 'UPDATE_TODO_SUCCESS',
            response: normalize(response, todo),
        });
    });
};

const toggleTodo = (id) => (dispatch) => {
    return api.toggleTodoRemote(id).then(response => {
        return dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response: normalize(response, todo),
        })
    })
};


const authenticate = (credentials) => (dispatch) => {

    dispatch({
        type: 'LOGIN_REQUEST',
        isFetching: true,
        isAutheticated: false,
        credentials
    });

    return api.authenticate(credentials).then(
        response =>{
        return dispatch({
            type: 'LOGIN_SUCCESS',
            isFetching: false,
            isAutheticated: true,
            id_token: response
        });
    },
    error=> {
        return dispatch({
            type: 'LOGIN_FAILURE',
            error: error.message || 'Authentication failed.',
        });
    })
};

export {fetchTodos, addTodo, updateTodo, toggleTodo, authenticate};
