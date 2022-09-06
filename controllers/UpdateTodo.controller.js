const fs = require("fs");
const mapper = require('../db/DynamoClient')
const Todo = require("../models/Todo.model");


const UpdateTodoController = async (request, response) => {
    const uuid = request.params.uuid

    let todo
    try {
        todo = await mapper.get(Object.assign(new Todo(), {uuid}))
    } catch (err) {
        console.error(err)
        return response.status(500).json({error: 'DynamoError'})
    }

    todo.completed = true

    try {
        await mapper.put({item: todo})
    } catch (error) {
        console.error(error)
    }

    return response.status(200).json({status: 'ok'})


    // const findTodoById = (todos, id) => {
    //     for (let i = 0; i < todos.length; i++) {
    //         if (todos[i].id === parseInt(id)) {
    //             return i
    //         }
    //     }
    //     return -1
    // }

    // fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         return response.status(500).send('Sorry, something went wrong.')
    //     }
    //
    //     let todos = JSON.parse(data)
    //     const todoIndex = findTodoById(todos, id)
    //
    //     if (todoIndex === -1) {
    //         return response.status(404).send('Sorry, not found.')
    //     }
    //
    //     todos[todoIndex].complete = true
    //
    //     fs.writeFile('./store/todos.json', JSON.stringify(todos), () => {
    //         return response.json({'status': 'ok'})
    //     })
    // })
}

module.exports = UpdateTodoController
