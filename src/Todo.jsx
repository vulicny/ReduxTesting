/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {toggleTodo, text, finished} = this.props;

        return (
            <li onClick={toggleTodo}
                style={{
                    textDecoration: finished ? 'line-through' : 'none',
                    color: finished ? 'green' : 'black'
                }}>
                {text}
            </li>
        );
    }
}

export default Todo;