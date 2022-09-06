const express = require('express')
const app = express()
const TodoRoutes = require('./routes/Todo.routes')

const HelloWorldController = require('./controllers/HelloWorld.controller')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', HelloWorldController)
app.use(TodoRoutes)








app.listen(3000, () => {
    console.log('Application running on http://localhost:3000')
})
