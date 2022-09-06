const fs = require("fs");
const TodoModel = require('../models/Todo.model')
const mapper = require('../db/DynamoClient')


const GetTodoController = async (request, response) => {
    const showPending = request.query.showPending


    const todos = []
    for await (const todo of mapper.scan(TodoModel)) {
        if (showPending === '1') {
            if (todo.completed !== false) todos.push(todo)
        } else {
            todos.push(todo)
        }


    }

    return response.status(200).json({todos})


    // fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         return response.status(500).send('Sorry, something went wrong.')
    //     }
    //
    //     const todos = JSON.parse(data)
    //
    //     if (showPending !== "1") {
    //         return response.json({todos: todos})
    //     } else {
    //         return response.json({todos: todos.filter(t => {return t.complete === false})})
    //     }
    // })
}

module.exports = GetTodoController
