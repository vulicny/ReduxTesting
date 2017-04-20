/**
 * Created by ulicny on 18.04.2017.
 */

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const v4 = require('node-uuid');
let dateFormat = require('dateformat');

let app = express();
const DATE_MASK = "mm/dd/yyyy";
let now = dateFormat(new Date(), DATE_MASK);

const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'read this',
            due_date:  now,
            finished: true
        },
        {
            id: v4(),
            text: 'write notes',
            due_date: now,

            finished: false
        },
        {
            id: v4(),
            text: 'final read',
            due_date: now,
            finished: false
        }
    ]
};


// create application/json parser
var jsonParser = bodyParser.json();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.get('/', function (request, response, next) {
    response.send("TODOs Server");
});

app.get('/todos', function (request, response, next) {
    const filter = request.query.filter;
    let result = [];
    console.log("get todos with filter: " + filter);
    switch (filter) {
        case 'all' :
            result = fakeDatabase.todos;
            break;
        case 'active' :
            result = fakeDatabase.todos.filter((i) => (!i.finished));
            break;
        case 'completed' :
            result = fakeDatabase.todos.filter((i) => (i.finished));
            break;
        default :
            result = fakeDatabase.todos;
    }
    response.send(result);
});

app.get('/todos/:id', function (request, response, next) {
    console.log("get: " + request.params.id);
    let index = fakeDatabase.todos.findIndex((value) => {
        return (request.params.id == value.id)
    });
    if (index != -1) {
        response.send(fakeDatabase.todos[index]);
    } else {
        response.status(404).end('Not found');
    }
});

app.post('/todos', jsonParser, function (request, response, next) {
    let item = request.body;
    item.id = v4();
    if(item.due_date) {
        //due date is optional
        item.due_date = dateFormat(item.due_date, DATE_MASK);
    }
    fakeDatabase.todos.push(item);
    console.log("add: " + item);
    response.send(item);
});

app.put('/todos/:id', jsonParser, function (request, response, next) {
    console.log("update: " + request.params.id);
    let item = request.body;
    let index = fakeDatabase.todos.findIndex((value) => {
        return (request.params.id == value.id)
    });
    if (index !== -1) {
        console.log('update item: ' + fakeDatabase.todos[index]);
        if(item.text) {
            fakeDatabase.todos[index].text = item.text;
        }
        if(item.due_date) {
            fakeDatabase.todos[index].due_date = dateFormat(item.due_date, DATE_MASK);
        }
        if(item.finished !== undefined) {
            fakeDatabase.todos[index].finished = item.finished;
        }
        response.send(fakeDatabase.todos[index]);
    } else {
        response.status(404).end('Not found');
    }
});

app.put('/todos/toggle/:id', jsonParser, function (request, response, next) {
    console.log("toggle: " + request.params.id);
    let index = fakeDatabase.todos.findIndex((value) => {
        return (request.params.id == value.id)
    });
    if (index !== -1) {
        console.log('toggle item: ' + fakeDatabase.todos[index]);
        fakeDatabase.todos[index].finished = !fakeDatabase.todos[index].finished;
        response.send(fakeDatabase.todos[index]);
    } else {
        response.status(404).end('Not found');
    }
});

app.delete('/todos/:id', jsonParser, function (request, response, next) {
    console.log("delete: " + request.params.id);
    let item = request.body;
    console.log(item);
    let index = fakeDatabase.todos.findIndex((value) => {
        return (request.params.id == value.id)
    });
    if (index !== -1) {
        fakeDatabase.todos.splice(index, 1);
        response.send("Success");
    } else {
        response.status(404).end('Not found');
    }
});

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('TODOs server listening at http://' + host + ':' + port);
});
