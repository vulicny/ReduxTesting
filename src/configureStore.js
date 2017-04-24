/**
 * Created by ulicny on 12.04.2017.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {todoApp} from './reducers/index.js';

import logger from 'redux-logger';


const configureStore = () => {

        let middlewares = [thunk];

        if (process.env.NODE_ENV !== 'production') {
            middlewares.push(logger)
        }

        return createStore(
            todoApp,
            applyMiddleware(...middlewares)
        );
    }
;

export {configureStore};