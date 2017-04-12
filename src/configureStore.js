/**
 * Created by ulicny on 12.04.2017.
 */
import {createStore} from 'redux';
import {todoAppReducer} from './todoReducer'
import {loadState, saveState} from './localStorage.js';
import throttle from 'lodash/throttle';


const configureStore = () => {

    const persistedState = loadState();
    let store = createStore(
        todoAppReducer,
        persistedState
    );

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        })
    }, 1000));

    return store;
};

export {configureStore};