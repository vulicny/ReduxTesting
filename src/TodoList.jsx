/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Todo from './Todo.jsx'

class TodoList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {visibleTodos, toggleTodo} = this.props;
        return (
            <ul>
                {visibleTodos.map((todo) => {
                    return (
                        <Todo key={todo.id} {...todo} toggleTodo={() => toggleTodo(todo.id)}/>
                    )
                })}
            </ul>
        )
    }
}

export default TodoList;
