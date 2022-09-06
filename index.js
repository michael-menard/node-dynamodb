const express = require('express')
const app = express()

const HelloWorldController = require('./controllers/HelloWorld.controller')
const GetTodoController = require('./controllers/GetTodo.controller')
const UpdateTodoController = require('./controllers/UpdateTodo.controller')
const CreateTodoController = require('./controllers/CreateTodo.controller')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', HelloWorldController)
app.get('/todos', GetTodoController)
app.put('/todos/:id/complete', UpdateTodoController)
app.post('/todo', CreateTodoController)







app.listen(3000, () => {
    console.log('Application running on http://localhost:3000')
})
