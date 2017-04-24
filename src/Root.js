/**
 * Created by ulicny on 12.04.2017.
 */

import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodoApp from './TodoApp.jsx';
import Login from './login.jsx'

export const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/:filter?" component={TodoApp}/>
            </Switch>

        </BrowserRouter>
    </Provider>
);

