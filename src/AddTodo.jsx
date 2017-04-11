/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import {connect} from 'react-redux';
import {addTodoAction} from './todoActions.js'

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this);
        this.dispatch = props.dispatch;  //get through connect
    }

    addTodo(value) {
        this.dispatch(addTodoAction(value))
    }

    render() {
        let input;
        return (
            <div>
                <input type="text" ref={node => input = node}/>
                <input type="button" onClick={() => {
                    this.addTodo(input.value);
                    input.value = ''
                }} value="Add"/>
            </div>

        )
    }
}
//connect by default map dispatch
export default connect()(AddTodo);
