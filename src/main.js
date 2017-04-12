/**
 * Created by ulicny on 06.04.2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from './configureStore'
import {Root} from './Root.js'

const store = configureStore();

ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('app'));

