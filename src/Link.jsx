/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import {connect} from 'react-redux';

class Link extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {active, onFilterClick} = this.props;
        if (active) {
            return (<span>{this.props.children}</span>)
        }
        return (
            <a href='#' onClick={onFilterClick}>
                {this.props.children}
            </a>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        active: (state.visibilityFilter === ownProps.filter)
    }
};

const mapDispachToProps = (dispatch, ownProps) => {
    return {
        onFilterClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                visibilityFilter: ownProps.filter
            });
        }
    }
}
export default connect(mapStateToProps, mapDispachToProps)(Link);