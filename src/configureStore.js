/**
 * Created by ulicny on 12.04.2017.
 */
import {createStore, applyMiddleware} from 'redux';
import {todos} from './reducers/index.js';
import promise from 'redux-promise';
import logger from 'redux-logger';



const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach((middleware) => {
        store.dispatch = middleware(store);
    })
};


const configureStore = () => {

        let middlewares = [promise];

        if (process.env.NODE_ENV !== 'production') {
            middlewares.push(logger)
        }
        let store = createStore(
            todos,
            applyMiddleware(...middlewares)
        );

        return store;
    }
;

export {configureStore};