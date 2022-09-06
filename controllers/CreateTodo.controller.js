const fs = require("fs");
const mapper = require('../db/DynamoClient')
const Todo = require('../models/Todo.model')
const { v4: uuidv4 } = require('uuid');

const CreateTodoController = async (request, response) => {
    if (!request.body.name) {
        return response.status(400).send('Missing name')
    }

    try {
        const todo = new Todo()
        todo.uuid = uuidv4()
        todo.name = request.body.name
        todo.completed = false

        await mapper.put(todo)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: 'DynamoError' })
    }

    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send('Sorry, something went wrong.')
        }

        const todos = JSON.parse(data)
        const maxId = Math.max.apply(Math, todos.map(t => {
            return t.id
        }))

        todos.push({
            id: maxId + 1,
            complete: false,
            name: request.body.name
        })

        fs.writeFile('./store/todos.json', JSON.stringify(todos), () => {
            return response.json({'status': 'ok'})
        })
    })
}

module.exports = CreateTodoController
