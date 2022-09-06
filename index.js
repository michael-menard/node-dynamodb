const express = require('express')
const fs = require('fs')
const app = express()

const HelloWorldController = require('./controllers/HelloWorld.controller')
const GetTodoController = require('./controllers/GetTodo.controller')
const UpdateTodoController = require('./controllers/UpdateTodo.controller')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', HelloWorldController)

app.get('/todos', GetTodoController)

app.put('/todos/:id/complete', UpdateTodoController)

app.post('/todo', (request, response) => {
    if (!request.body.name) {
        return response.status(400).send('Missing name')
    }

    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send('Sorry, something went wrong.')
        }

        const todos = JSON.parse(data)
        const maxId = Math.max.apply(Math, todos.map(t => { return t.id }))

        todos.push({
            id: maxId + 1,
            complete: false,
            name: request.body.name
        })

        fs.writeFile('./store/todos.json', JSON.stringify(todos), () => {
            return response.json({'status': 'ok'})
        })
    })
})

app.listen(3000, () => {
    console.log('Application running on http://localhost:3000')
})
