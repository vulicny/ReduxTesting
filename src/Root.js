/**
 * Created by ulicny on 12.04.2017.
 */

import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import TodoApp from './TodoApp.jsx';

export const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>

            <Route path="/:filter?" component={TodoApp}/>

        </BrowserRouter>
    </Provider>
);

