const todoRoute = require('express').Router()
const authorization = require('../middlewares/authorization')
const todoController = require('../controlllers/todoController')

todoRoute
        .get('/', todoController.showAll)
        .post('/', todoController.createTodo)
        .get('/:id', authorization, todoController.findById)
        .patch('/:id', authorization ,todoController.changeStatus)
        .delete('/:id', authorization , todoController.deleteTodo)


module.exports = todoRoute