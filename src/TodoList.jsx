/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Todo from './Todo.jsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {toggleTodoAction, fetchTodos, requestTodosAction} from './todoActions.js'
import {getVisibilityTodos, getIsFetching} from './reducers/index.js';

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
        const {filter, fetchTodos, requestTodos} = this.props;
        requestTodos(filter);
        fetchTodos(filter);
    }

    render() {
        const {visibleTodos, isFetching, toggleTodo} = this.props;

        if (isFetching && !visibleTodos.length) {
            return (<p>Loadding ...</p>)
        } else {
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
}

const mapStateToProps = (state, ownProps) => {
    const filter = ownProps.match.params.filter || 'all';
    return {
        visibleTodos: getVisibilityTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        filter: filter
    }
};

const mapDispatchToProps = (dispatch) => ({
    toggleTodo: (id) => {
        dispatch(toggleTodoAction(id));
    },
    fetchTodos: (filter) => {
        dispatch(fetchTodos(filter));
    },
    requestTodos: (filter)=> {
        dispatch(requestTodosAction(filter))
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)
    (TodoList));
