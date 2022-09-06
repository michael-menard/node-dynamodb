const fs = require("fs");

const GetTodoController = (request, response) => {
    const showPending = request.query.showpending

    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send('Sorry, something went wrong.')
        }

        const todos = JSON.parse(data)

        if (showPending !== "1") {
            return response.json({todos: todos})
        } else {
            return response.json({todos: todos.filter(t => {return t.complete === false})})
        }
    })
}

module.exports = GetTodoController
