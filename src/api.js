/**
 * Created by ulicny on 13.04.2017.
 */

import {v4} from 'node-uuid';
const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'read this',
            finished: true
        },
        {
            id: v4(),
            text: 'write notes',
            finished: false
        },
        {
            id: v4(),
            text: 'final read',
            finished: false
        }
    ]
};

const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
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
