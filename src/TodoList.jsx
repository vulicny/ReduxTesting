/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Todo from './Todo.jsx';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {toggleTodoAction} from './todoActions.js'
import {getVisibilityTodos} from './todoReducer.js';

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

const mapStateToProps = (state, ownProps) => ({
    visibleTodos: getVisibilityTodos(state, ownProps.match.params.filter || 'all')
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
