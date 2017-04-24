/**
 * Created by ulicny on 10.04.2017.
 */

import React from 'react';
import TodoList from './TodoList.jsx'
import AddTodo from './AddTodo.jsx'
import Footer from './Footer.jsx'
import AppHeader from './AppHeader.jsx'
import {connect} from 'react-redux';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthenticated} = this.props;
        return (
            <div>
                <AppHeader/>
                {isAuthenticated &&
                <div>
                    <AddTodo/>
                    <TodoList/>
                    <Footer/>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAutheticated
    }
};


export default connect(mapStateToProps)(TodoApp);

