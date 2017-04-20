/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import {connect} from 'react-redux';
import {updateTodo} from './todoActions.js'
import {Checkbox} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';

let dateFormat = require('dateformat');

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //text field validation state
            validation: null,
            //false when text in table is not in editMode (default)
            editText: false,
            //false when due_date in the table is not in editMode (default)
            editDue_date:false,
            //defaults for item from props
            id: this.props.id,
            text: this.props.text,
            //holds the original text - used to set to state.text when not save through enter press
            text_original: this.props.text,
            due_date: this.props.due_date,
            finished: this.props.finished
        };
        this.updateTodo = this.props.updateTodo; //gets through connect
        this.setValidationState = this.setValidationState.bind(this);
        this.edit = this.edit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    setValidationState(value) {
        const length = value.length;
        if (length > 0) {
            this.setState({validation: 'success'});
        } else {
            this.setState({validation: 'error'});
        }
    }
    edit(value, property) {
        console.log("Edit " + property);
        this.setState({[property]: value});
        //reset text validation state
        this.setState({validation:null});
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({[e.target.name]: value});
        if(e.target.name ==='text') {
            this.setValidationState(value);
        }
        if(e.target.name === 'due_date') {
            this.setState({[e.target.name]: dateFormat(value, 'mm/dd/yyyy')});
            // due_date date as date input component submitted immediately on change
            this.updateTodo({
                id: this.state.id,
                // update just due_date
                due_date: dateFormat(value, 'mm/dd/yyyy'),
            });
        }
    }

    onMouseOut(e) {
        console.log("Mouse Out");
        this.setState({editText: false});
        this.setState({text:this.state.text_original});
        this.setState({editDue_date: false});
    }

    onKeyPress(e) {
        if (e.keyCode === 13) {
            // enter pressed - update this item through dispatch
            if(this.state.text) {
                this.updateTodo({
                    id: this.state.id,
                    //update just text
                    text: this.state.text,
                });
                this.setState({text_original: this.state.text});
            } else {
                this.setState({text:this.state.text_original});
            }
            this.setState({editText: false});
            this.setState({editDue_date: false});
        } else if (e.keyCode === 27) {
            //escape pressed
            this.setState({editText: false});
            this.setState({text:this.state.text_original});
            this.setState({editDue_date: false});
        }
    }

    render() {
        const {toggleTodo, finished} = this.props;
        let now = new Date();
        let adjusted = dateFormat(now, 'mm/dd/yyyy');
        const done = finished ? 'yes' : 'no';

        let color = 'black';
        if (finished) {
            color = 'green';
        } else if (new Date(this.state.due_date).getTime() < new Date(adjusted).getTime()) {
            color = 'red';
        }

        const textComponent = (this.state.editText) ?
            <FormGroup
                controlId="formBasicText"
                validationState={this.state.validation}
                >
                <FormControl
                    name="text"
                    type="text"
                    placeholder="Enter non empty text"
                    autoFocus
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyPress}
                    value={this.state.text}
                />
                <FormControl.Feedback />
            </FormGroup>
             :
            this.state.text;

        const due_dateComponent = (this.state.editDue_date) ?
            <input name="due_date" type="date"
                   autoFocus
                   onKeyPress={this.onKeyPress}
                   onChange={this.onChange}
                   onKeyDown={this.onKeyPress}
                   value={this.state.due_date}/> :
            this.state.due_date;
        return (

            <tr style={{
                textDecoration: finished ? 'line-through' : 'none',
                color: color,
            }}>
                <td  onClick={toggleTodo}>
                    <Checkbox style={{
                        height: "5px"
                    }} checked={finished} readOnly>
                    </Checkbox>
                </td>
                <td style={{
                    width: "300px",
                }}  onDoubleClick={() => this.edit(true, 'editText')}
                     onMouseLeave={this.onMouseOut}>{textComponent}</td>
                <td style={{
                    width: "300px",
                }} onDoubleClick={() => this.edit(true, 'editDue_date')}
                    onMouseLeave={this.onMouseOut}>{due_dateComponent}</td>
                <td>{done}</td>
            </tr>

        );

    }
}

const mapDispatchToProps = (dispatch) => ({
    updateTodo: (todo) => {
        dispatch(updateTodo(todo));
    },

});
export default connect(null, mapDispatchToProps)(Todo);