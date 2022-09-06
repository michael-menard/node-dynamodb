const fs = require("fs");

const CreateTodoController = (request, response) => {
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
}

module.exports = CreateTodoController
