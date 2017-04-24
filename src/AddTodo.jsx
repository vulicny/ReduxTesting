/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {HelpBlock} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addTodo} from './todoActions.js'

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
        //state is used only for UI validation
        this.state = {
            value: '',
            validation: null
        };
        this.addTodo = this.addTodo.bind(this);
        this.setValidationState = this.setValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.dispatch = props.dispatch;  //get through connect
    }

    addTodo(item) {
        if (this.state.validation === 'success') {
            this.dispatch(addTodo(item));
            this.setState({validation: null});
            this.setState({value: ''});
        } else {
            this.setState({validation: 'error'});
        }
    }

    setValidationState(value) {
        const length = value.length;
        if (length > 0) {
            this.setState({validation: 'success'});
        } else {
            this.setState({validation: 'error'});
        }
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({value: value});
        this.setValidationState(value);
    }

    render() {
        let input, date;
        let errorComp = 'Enter text';
        if (this.state.validation === 'error') {
            errorComp = 'Enter non empty text';
        }

        return (
            <div>
                <Col xs={12} md={6}>
                    <Form inline>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validation}>
                            <ControlLabel>Todo</ControlLabel>
                            {' '}
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder={errorComp}
                                inputRef={ref => {
                                    input = ref;
                                }}
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        {' '}
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Due date</ControlLabel>
                            {' '}
                            <FormControl
                                type="date"
                                placeholder={errorComp}
                                inputRef={ref => {
                                    date = ref;
                                }}
                            />
                        </FormGroup>
                        {' '}
                        <Button bsStyle="primary" onClick={() => {
                            this.addTodo({
                                text: input.value,
                                due_date: date.value
                            });
                        }}>Add</Button>
                    </Form>
                </Col>
            </div>

        )
    }
}
//connect by default map dispatch
export default connect()(AddTodo);
