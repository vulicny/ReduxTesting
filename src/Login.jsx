import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap'
import {authenticate} from './todoActions.js'
import {withRouter} from 'react-router';


class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {authenticate} = this.props;
        let inputUsername;
        let inputPassword;

        return (
            <div>

                <Col xs={12} md={8}>
                    <Form horizontal>
                        <FormGroup
                            controlId="formBasicText">
                            <Col componentClass={ControlLabel} sm={2}>
                                Name
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    inputRef={ref => {
                                        inputUsername = ref;
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    inputRef={ref => {
                                        inputPassword = ref;
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={5}>
                                <ButtonToolbar>
                                    <Button bsStyle="primary" bsSize="small"
                                            onClick={() => {
                                            }}>Cancel</Button>
                                    <Button bsStyle="success" bsSize="small" onClick={() => {
                                        authenticate(inputUsername.value, inputPassword.value);
                                        this.props.history.push('/');
                                    }}>Login</Button>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>

                    </Form>
                </Col>


            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    authenticate: (userName, password) => {
        dispatch(authenticate({
            userName: userName,
            password: password
        }));
    },
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
