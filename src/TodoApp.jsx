/**
 * Created by ulicny on 10.04.2017.
 */

import React from 'react';
import VisibleTodoList from './VisibleTodoList.jsx'
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

                <VisibleTodoList/>

                <Footer/>

            </div>
        )
    }
}
export default TodoApp;
