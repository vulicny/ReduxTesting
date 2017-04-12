/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {setFilterAction} from './todoActions.js'

class FilterLink extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const filter = this.props.filter === 'all' ? '/' : this.props.filter;
        return (

            <NavLink
                to={filter}
                activeStyle={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    color: 'black'
                }}
                isActive={(match, location) =>
                    (location && location.pathname.endsWith(filter))
                }
            >
                {this.props.children}
            </NavLink>
        );
    }
}

export default FilterLink;