/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import FilterLink from './FilterLink.jsx'


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Show:
                {' '}
                <FilterLink filter="SHOW_ALL">All</FilterLink>
                {' '}
                <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
                {' '}
                <FilterLink filter="SHOW_FINISHED">Completed</FilterLink>

            </div>
        );
    }
}

export default Footer;