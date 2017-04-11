/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let input;
        const addTodo = this.props.addTodo;
        return (
            <div>
                <input type="text" ref={node => input = node}/>
                <input type="button" onClick={() => {
                    addTodo(input.value);
                    input.value = ''
                }} value="Add"/>
            </div>

        )
    }
}

export default AddTodo;
