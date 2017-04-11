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
import {Provider} from 'react-redux';


const todoApp = combineReducers({
    todos,
    visibilityFilter
});

//default state - just todos here not visibilityFilter
const persistedState = {
    todos: [{
        id: 0,
        text: 'Welcome to React-Redux',
        finished: false
    }]
};
let store = createStore(todoApp, persistedState);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('app'));


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