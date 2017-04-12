/**
 * Created by ulicny on 12.04.2017.
 */

import React from 'react';
import {Provider} from 'react-redux';
import TodoApp from './TodoApp.jsx';

export const Root = ({store}) => (
    <Provider store={store}>
        <TodoApp/>
    </Provider>
);

