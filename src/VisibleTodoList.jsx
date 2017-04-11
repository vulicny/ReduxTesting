/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Todo from './Todo.jsx'

class VisibleTodoList extends React.Component {
    constructor(props, context) {
        super(props)
        this.store = context.store;
        this.toggleTodo = this.toggleTodo.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    toggleTodo(id) {
        this.store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
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
        const visibleTodos =
            this.getVisibilityTodos(this.store.getState().todos, this.store.getState().visibilityFilter);
        return (
            <ul>
                {visibleTodos.map((todo) => {
                    return (
                        <Todo key={todo.id} {...todo} toggleTodo={() => this.toggleTodo(todo.id)}/>
                    )
                })}
            </ul>
        );
    }
}

VisibleTodoList.contextTypes = {
    store: React.PropTypes.object
};
export default VisibleTodoList; 