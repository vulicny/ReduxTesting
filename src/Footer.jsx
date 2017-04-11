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
                <FilterLink onFilterClick={this.props.onFilterClick} currentFilter={this.props.currentFilter}
                            filter="SHOW_ALL">All</FilterLink>
                {' '}
                <FilterLink onFilterClick={this.props.onFilterClick}  currentFilter={this.props.currentFilter}
                            filter="SHOW_ACTIVE">Active</FilterLink>
                {' '}
                <FilterLink onFilterClick={this.props.onFilterClick}  currentFilter={this.props.currentFilter}
                            filter="SHOW_FINISHED">Completed</FilterLink>

            </div>
        );
    }
}

export default Footer;