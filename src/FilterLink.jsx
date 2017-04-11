/**
 * Created by ulicny on 11.04.2017.
 */
import React from 'react';

class FilterLink extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.filter === this.props.currentFilter) {
            return (<span>{this.props.children}</span>)
        }
        return (
                <a href='#' onClick={()=>this.props.onFilterClick(this.props.filter)}>
                    {this.props.children}
                </a>

        )
    }
}

export  default FilterLink;
