/**
 * Created by ulicny on 06.04.2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {counter} from './counterReducer.js'
import MyCounter from "./MyCounter.jsx";
import {createMyStore} from './myReactStore.js'
import {todos, visibilityFilter} from './todoReducer.js'
import TodoApp from './TodoApp.jsx'


const todoApp = combineReducers({
    todos,
    visibilityFilter
});

let store = createStore(todoApp);

const render = () => {
    ReactDOM.render(<TodoApp store={store} todos={store.getState().todos}/>, document.getElementById('app'))
};
render();

store.subscribe(render);

/**
 let store = createMyStore(counter);
 const increment = ()=>{
    store.dispatch({type:'INCREMENT'});
};
 const decrement = ()=> {
    store.dispatch({type:'DECREMENT'});
};
 ReactDOM.render(<MyCounter store={store} increment={increment} decrement={decrement}/>, document.getElementById('app'));

 */