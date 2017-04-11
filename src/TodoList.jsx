/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Todo from './Todo.jsx';
import {connect} from 'react-redux';
import {toggleTodoAction} from './todoActions.js'

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

const getVisibilityTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL' :
            return todos;
        case 'SHOW_ACTIVE' :
            return todos.filter(t => !t.finished);
        case 'SHOW_COMPLETED' :
            return todos.filter(t => t.finished);
        default:
            return todos;
    }
};

const mapStateToProps = (state) => ({
    visibleTodos: getVisibilityTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch) => ({
    toggleTodo: (id) => {
        dispatch(toggleTodoAction(id));
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
