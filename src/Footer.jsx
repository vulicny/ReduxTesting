/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import Link from './Link.jsx'


class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Show:
                {' '}
                <Link filter="SHOW_ALL">All</Link>
                {' '}
                <Link filter="SHOW_ACTIVE">Active</Link>
                {' '}
                <Link filter="SHOW_FINISHED">Completed</Link>

            </div>
        );
    }
}

export default Footer;