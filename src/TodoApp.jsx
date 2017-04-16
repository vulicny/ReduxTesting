/**
 * Created by ulicny on 10.04.2017.
 */

import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import TodoList from './TodoList.jsx'
import AddTodo from './AddTodo.jsx'
import Footer from './Footer.jsx'
import AppHeader from './AppHeader.jsx'
import {Button} from 'react-bootstrap';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>

                <AppHeader/>
                <AddTodo/>
                <TodoList/>
                <Footer/>

            </div>
        )
    }
}
export default TodoApp;
