/**
 * Created by ulicny on 16.04.2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar} from 'react-bootstrap'
import {Header} from 'react-bootstrap/lib/Navbar';
import {Brand} from 'react-bootstrap/lib/Navbar';
import {Toggle} from 'react-bootstrap/lib/Navbar';
import {Collapse} from 'react-bootstrap/lib/Navbar';
import {Form} from 'react-bootstrap/lib/Navbar';
import {Nav} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FilterLink from './FilterLink.jsx'
import {withRouter} from 'react-router';


class AppHeader extends React.Component {

    constructor(props) {
        super(props);
        props.history.push("/");

        this.handleLink = this.handleLink.bind(this);

    }

    handleLink(path) {
        this.props.history.push(path);
    }

    render() {

        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand onClick={() => this.handleLink("/")}>ToDo App</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} onClick={() => this.handleLink("/")}>All</NavItem>
                            <NavItem eventKey={2} onClick={() => this.handleLink("completed")}>Completed</NavItem>
                            <NavItem eventKey={3} onClick={() => this.handleLink("active")}>Active</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={4} href="#">Login</NavItem>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }
}

export default withRouter(AppHeader);