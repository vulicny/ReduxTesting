/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Todo from './Todo.jsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {toggleTodoAction, fetchTodos} from './todoActions.js'
import {getVisibilityTodos} from './reducers/todoReducer.js';

class TodoList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
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

const mapStateToProps = (state, ownProps) => {
    const filter = ownProps.match.params.filter || 'all';
    return {
        visibleTodos: getVisibilityTodos(state, filter),
        filter: filter
    }
};

const mapDispatchToProps = (dispatch) => ({
    toggleTodo: (id) => {
        dispatch(toggleTodoAction(id));
    },
    fetchTodos: (filter) => {
        dispatch(fetchTodos(filter));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)
    (TodoList));
