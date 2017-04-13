/**
 * Created by ulicny on 12.04.2017.
 */
import {createStore} from 'redux';
import {todoAppReducer} from './mainReducer.js';
import {loadState, saveState} from './localStorage.js';
import throttle from 'lodash/throttle';


const configureStore = () => {

    const persistedState = loadState();
    let store = createStore(
        todoAppReducer,
        persistedState
    );

    const addLoggingToDispatch = (store) => {
        const rawDispatch = store.dispatch;
        if (!console.group) {
            return rawDispatch;
        }
        return (action) => {
            console.group(action.type);
            console.log('%c prev state', 'color: gray', store.getState());
            console.log('%c action', 'color: blue', action);
            const returnValue = rawDispatch(action);
            console.log('%c next state', 'color: green', store.getState());
            console.groupEnd(action.type);
            return returnValue;
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }
    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        })
    }, 1000));

    return store;
};

export {configureStore};