/**
 * Created by ulicny on 11.04.2017.
 */

import React from 'react';
import {Form} from 'react-bootstrap';
import {Row}  from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Todo from './Todo.jsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {toggleTodo, fetchTodos} from './todoActions.js'
import {getVisibilityTodos, getError, getIsFetching} from './reducers/index.js';
import FetchError from "./FetchError.jsx";

class TodoList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }

    render() {
        const {visibleTodos, error, isFetching, toggleTodo} = this.props;

        if (isFetching && !visibleTodos.length) {
            return (
                <div>
                    <Row> <Col xs={12} md={8}>
                        <p>Loading ...</p>
                    </Col>
                    </Row>
                </div>
            )

        } else {
            if (error) {
                return (
                    <div>
                        <Row> <Col xs={12} md={8}>
                            <FetchError errorMessage={error} onRetry={() => this.fetchData()}/>
                        </Col>
                        </Row></div>
                );
            } else {
                return (
                    <div>
                        <Row>
                            <Col xs={12} md={8}>
                                <ul>
                                    {visibleTodos.map((todo) => {
                                        return (
                                            <Todo key={todo.id} {...todo} toggleTodo={() => toggleTodo(todo.id)}/>
                                        )
                                    })}
                                </ul>
                            </Col>
                        </Row>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const filter = ownProps.match.params.filter || 'all';
    return {
        visibleTodos: getVisibilityTodos(state, filter),
        error: getError(state, filter),
        isFetching: getIsFetching(state, filter),
        filter: filter
    }
};

const mapDispatchToProps = (dispatch) => ({
    toggleTodo: (id) => {
        dispatch(toggleTodo(id));
    },
    fetchTodos: (filter) => {
        dispatch(fetchTodos(filter));
    },
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)
    (TodoList));
