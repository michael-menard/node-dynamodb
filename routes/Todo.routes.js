const express = require('express')
const GetTodoController = require("../controllers/GetTodo.controller");
const UpdateTodoController = require("../controllers/UpdateTodo.controller");
const CreateTodoController = require("../controllers/CreateTodo.controller");

const router = new express.Router()

router.get('/todos', GetTodoController)
router.put('/todos/:uuid/complete', UpdateTodoController)
router.post('/todos', CreateTodoController)


module.exports = router
