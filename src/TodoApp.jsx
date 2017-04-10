/**
 * Created by ulicny on 10.04.2017.
 */

import React from 'react';

var globalId = 0;

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this);
    }

    addTodo(value) {
        this.props.store.dispatch({
            type: 'ADD_TODO',
            id: globalId++,
            text: value,
            finished: false
        })
    }

    render() {
        let input;
        return (
            <div>
                <input type="text" ref={node => this.input = node}/>
                <input type="button" onClick={()=>{
                    this.addTodo(this.input.value);
                this.input.value=''}} value="Add"/>
        <ul>
            {this.props.todos.map((todo) => {
                return (
                <li key={todo.id}>
                    {todo.text}
                </li>)
            })}
        </ul>
    </div>
    )
    }
}

export default TodoApp;
