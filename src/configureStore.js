/**
 * Created by ulicny on 12.04.2017.
 */
import {createStore, applyMiddleware} from 'redux';
import {todoAppReducer} from './reducers/mainReducer.js';
import promise from 'redux-promise';
import logger from 'redux-logger';



const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach((middleware) => {
        store.dispatch = middleware(store);
    })
};

/*
const logger = (store) => {
    let nextDispatch = store.dispatch;

    if (!console.group) {
        return nextDispatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = nextDispatch(action);
        console.log('%c nextDispatch state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }

};

*/
/*
const promise = (store) => {
    let nextDispatch = store.dispatch;
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then((response) => {
                return nextDispatch(response);
            })
        }
        return nextDispatch(action);
    }

};
*/

const configureStore = () => {

        let middlewares = [promise];

        if (process.env.NODE_ENV !== 'production') {
            middlewares.push(logger)
        }
        let store = createStore(
            todoAppReducer,
            applyMiddleware(...middlewares)
        );

        return store;
    }
;

export {configureStore};