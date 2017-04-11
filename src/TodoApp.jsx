/**
 * Created by ulicny on 10.04.2017.
 */

import React from 'react';
import FilterLink from './FilterLink.jsx'
import TodoList from './TodoList.jsx'
import AddTodo from './AddTodo.jsx'
import Footer from './Footer.jsx'

var globalId = 0;

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
        this.getVisibilityTodos = this.getVisibilityTodos.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    addTodo(value) {
        this.props.store.dispatch({
            type: 'ADD_TODO',
            id: globalId++,
            text: value,
            finished: false
        })
    }

    toggleTodo(id) {
        this.props.store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
        });
    }

    setFilter(filter) {
        this.props.store.dispatch({
            type:'SET_VISIBILITY_FILTER',
            visibilityFilter:filter
        });
    }

    getVisibilityTodos(todos, filter) {
        switch (filter) {
            case 'SHOW_ALL' :
                return todos;
            case 'SHOW_ACTIVE' :
                return todos.filter(t => !t.finished);
            case 'SHOW_FINISHED' :
                return todos.filter(t => t.finished);
            default:
                return todos;
        }
    }

    render() {
        let input;
        let visibleTodos = this.getVisibilityTodos(this.props.state.todos, this.props.state.visibilityFilter);
        return (
            <div>

                <AddTodo addTodo={this.addTodo}/>

                <TodoList visibleTodos={visibleTodos} toggleTodo={this.toggleTodo}/>

                <Footer onFilterClick={this.setFilter} currentFilter={this.props.state.visibilityFilter}/>

            </div>
        )
    }
}

export default TodoApp;
