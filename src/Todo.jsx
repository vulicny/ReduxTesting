/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
let dateFormat = require('dateformat');

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {toggleTodo, text, finished, due_date} = this.props;
        let now = new Date();
        let adjusted = dateFormat(now, 'mm/dd/yyyy');

        let color = 'black';
        if(finished) {
            color = 'green';
        } else if(new Date(due_date).getTime() < new Date(adjusted).getTime()) {
            color = 'red';
        }
        return (
            <li onClick={toggleTodo}
                style={{
                    textDecoration: finished ? 'line-through' : 'none',
                    color: color
                }}>
                {text}  {' - '} {due_date}
            </li>
        );
    }
}

export default Todo;