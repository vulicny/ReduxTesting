/**
 * Created by ulicny on 06.04.2017.
 */
/**
 * Created by ulicny on 06.04.2017.
 */
import React from 'react'
import { connect } from 'react-redux'


class MyCounter extends React.Component {
    constructor(props) {
        super(props)
        this.count = this.props.count;
        this.store = this.props.store;
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        // option with custom redux store implementation
        this.store.subscribe(()=>{
            this.setState({count:this.store.getState()});
        })
    }

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <input type="button" onClick={this.props.increment} value='+'/>
                <input type="button" onClick={this.props.decrement} value="-">
                </input>
            </div>
        )
    }
}

function select(state) {
    return {
        count: state
    }
}

//export default connect(select)(MyCounter)
export default MyCounter;
