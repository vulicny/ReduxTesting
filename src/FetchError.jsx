/**
 * Created by ulicny on 15.04.2017.
 */

import React from 'react';

class FetchError extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {errorMessage, onRetry} = this.props;
        return (
            <div>
                <p>Could not fetch todos. {errorMessage}</p>
                <button onClick={onRetry}>Retry</button>
            </div>
        );
    }
}
export default FetchError; 