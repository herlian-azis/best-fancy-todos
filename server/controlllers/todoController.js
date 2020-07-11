'use strict'

const { Todo } = require('../models')
const createError = require('http-errors')

module.exports = class TodoController {
    static showAll(req, res, next){
        Todo
            .findAll({
                where: {
                    UserId: req.user.id
                },
                order: [['due_date', 'ASC']]
            })
            .then(list => {
                res.status(200).json(list)
            })
            .catch(next)
    }

    static findById(req, res, next){
        Todo
            .findOne({
                where: {
                    id: req.params.id,
                }
            })
            .then(found => {
                if (found){
                    res.status(200).json(found)
                } else {
                    next(createError(404, 'Data not found'))
                }
            })
            .catch(next)
    }

    static createTodo(req, res, next){
        let { title, description, status, due_date } = req.body
        let id = req.user.id
        Todo
            .create({
                title,
                description,
                status,
                due_date,
                UserId: id
            })
            .then(created => {
                res.status(201).json(created)
            })
            .catch(next)
    }

    static updateTodo(req, res, next){
        let { title, description, status, due_date } = req.body
        
        Todo
            .findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            })
            .then(found => {
                if(found){
                    return found.update({
                        title,
                        description,
                        status,
                        due_date
                    },
                    {   
                        returning:true
                    })
                } else {
                    next(createError(404, 'Data not found'))
                }
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)
    }
    
    static deleteTodo(req, res, next){
        let deletedData = ""

        Todo
            .findByPk(req.params.id)
            .then(deleted => {
                deletedData = deleted

                if (deleted){
                    return Todo.destroy({   
                        where: {
                            id: req.params.id
                        }
                    })
                } else {
                    next(createError(404, 'Data not found'))
                }
            })
            .then(result => {
                res.status(200).json(deletedData)
            })
            .catch(next)
    }

    static changeStatus(req, res, next){
        let currentStatus = ''

        Todo
            .findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                },
            })
            .then(data => {
                if(!data){
                    throw createError(404, 'Data not found')
                }

                if (data.status == 'completed'){
                    currentStatus = 'incomplete'
                } else {
                    currentStatus = 'completed'
                }

                return data.update({status: currentStatus})
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

