/**
 * Created by ulicny on 10.04.2017.
 */

import React from 'react';
import TodoList from './TodoList.jsx'
import AddTodo from './AddTodo.jsx'
import Footer from './Footer.jsx'

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>

                <AddTodo/>

                <TodoList/>

                <Footer/>

            </div>
        )
    }
}
export default TodoApp;
