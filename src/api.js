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
}

