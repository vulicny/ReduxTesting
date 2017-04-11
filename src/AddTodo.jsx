/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';

//global ID counter - temporary solution
var globalId = 0;

class AddTodo extends React.Component {
    constructor(props, context) {
        super(props)
        this.addTodo = this.addTodo.bind(this);
        this.store = context.store;
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(()=>this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    addTodo(value) {
        this.store.dispatch({
            type: 'ADD_TODO',
            id: globalId++,
            text: value,
            finished: false
        })
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
AddTodo.contextTypes = {
    store: React.PropTypes.object
};
export default AddTodo;
