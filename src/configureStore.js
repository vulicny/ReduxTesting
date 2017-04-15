/**
 * Created by ulicny on 12.04.2017.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {todos} from './reducers/index.js';

import logger from 'redux-logger';

/*
const thunk = (store) => (next) => (action) => {
  if(typeof action ==='function') {
      return action(store.dispatch, store.getState);
  } else {
      return next(action);
  }
};


const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach((middleware) => {
        store.dispatch = middleware(store);
    })
};

*/

const configureStore = () => {

        let middlewares = [thunk];

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