/**
 * Created by ulicny on 06.04.2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {counter} from './counterReducer.js'
import MyCounter from "./MyCounter.jsx";
import {createMyStore} from './myReactStore.js'
//let store = createStore(counter);

let store = createMyStore(counter);

const increment = ()=>{
    store.dispatch({type:'INCREMENT'});
};

const decrement = ()=> {
    store.dispatch({type:'DECREMENT'});
};


ReactDOM.render(<MyCounter store={store} increment={increment} decrement={decrement}/>, document.getElementById('app'));