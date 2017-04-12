/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Todo from './Todo.jsx';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
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
        case 'all' :
            return todos;
        case 'active' :
            return todos.filter(t => !t.finished);
        case 'completed' :
            return todos.filter(t => t.finished);
        default:
            throw new Error('Unknown filter: ${filter}');
    }
};

const mapStateToProps = (state, ownProps) => ({
    visibleTodos: getVisibilityTodos(state.todos, ownProps.match.params.filter || 'all')
});

const mapDispatchToProps = (dispatch) => ({
    toggleTodo: (id) => {
        dispatch(toggleTodoAction(id));
    }

});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)
    (TodoList));
