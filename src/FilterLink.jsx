/**
 * Created by ulicny on 11.04.2017.
 */
import React from 'react';
import Link from './Link.jsx'

class FilterLink extends React.Component {
    constructor(props, context) {
        super(props)

        this.setFilter = this.setFilter.bind(this);
        this.store = context.store;
    }
    componentDidMount() {
        this.unsubscribe = this.store.subscribe(()=>this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    setFilter(filter) {
        this.store.dispatch({
            type:'SET_VISIBILITY_FILTER',
            visibilityFilter:filter
        });
    }
    render() {
        const currentFilter = this.store.getState().visibilityFilter;
        return (
                <Link active={(this.props.filter === currentFilter)}
                    onFilterClick={()=>this.setFilter(this.props.filter)}>
                    {this.props.children}
                </Link>
        )
    }
}
FilterLink.contextTypes = {
    store: React.PropTypes.object
};

export default FilterLink;
