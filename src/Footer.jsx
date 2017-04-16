/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import {Col} from 'react-bootstrap';
import FilterLink from './FilterLink.jsx'


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Col xs={12} md={8}>
                Show:
                {' '}
                <FilterLink filter="all">All</FilterLink>
                {' '}
                <FilterLink filter="completed">Completed</FilterLink>
                {' '}
                <FilterLink filter="active">Active</FilterLink>
                </Col>
            </div>
        );
    }
}

export default Footer;