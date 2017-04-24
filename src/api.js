/**
 * Created by ulicny on 13.04.2017.
 */

import {v4} from 'node-uuid';
require('isomorphic-fetch');


const serverHost = "http://localhost:8081"


const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'read this',
            due_date: new Date().getDate(),
            finished: true
        },
        {
            id: v4(),
            text: 'write notes',
            due_date: new Date().getDate(),
            finished: false
        },
        {
            id: v4(),
            text: 'final read',
            due_date: new Date().getDate(),
            finished: false
        }
    ]
};

const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
};


/**
 * Fetches todos based on the filter ('all'. 'active', 'completed')
 * @param filter
 * @returns {*|Promise.<TResult>}
 */
export const fetchTodosRemote = (filter) => {
    const filterParamater = '?filter='+ filter;
    return fetch(serverHost + "/todos" + filterParamater, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
};

/**
 * Creates new item representing todos
 * @param item - item of TODOs
 * @returns {Promise.<>|*}
 */
export const addTodoRemote = (item) => {

    return fetch(serverHost + "/todos", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                text: item.text,
                due_date: item.due_date,
                finished: false
            }
        )
    }).then(response => response.json())
};

/**
 * Updates existing todos
 * @param item
 * @returns {*|Promise.<>}
 */
export const updateTodoRemote = (item) => {

    return fetch(serverHost + "/todos/" + item.id, {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    }).then(response => response.json())
};

/**
 * Toogle existing todos finished property
 * @param id
 * @returns {*|Promise.<TResult>}
 */
export const toggleTodoRemote = (id) => {
    return fetch(serverHost + "/todos/toggle/" + id, {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
};


export const authenticate =  (credentials) => {
    return fetch(serverHost + "/login", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(response => response.json())
};


export const fetchTodos = (filter) => {
    return delay(500).then(() => {
        // if (Math.random() > 0.5) {
        //     throw new Error("Boom!");
        // }

        switch (filter) {
            case 'all' :
                return fakeDatabase.todos;
            case 'active' :
                return fakeDatabase.todos.filter((i) => (!i.finished));
            case 'completed' :
                return fakeDatabase.todos.filter((i) => (i.finished));
            default :
                return fakeDatabase;
        }
    });
};

export const addTodo = (text) => {
    return delay(500).then(() => {
        const todo = {
            id: v4(),
            text: text,
            finished: false
        }
        fakeDatabase.todos.push(todo);
        return todo;
    });
};

export const toggleTodo = (id) => {
    return delay(500).then(() => {
        const index = fakeDatabase.todos.findIndex((todo) => id === todo.id);
        if (index !== -1) {
            const todo = fakeDatabase.todos[index];
            fakeDatabase.todos[index].finished = !todo.finished;
            return Object.assign({}, fakeDatabase.todos[index]);

        } else {
            throw new Error("Todo not found ID: " + id);
        }
    });
};
