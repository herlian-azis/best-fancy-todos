const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const authentication = require('../middlewares/authentication')

route
    .use('/', userRoute)
    .use('/todos', authentication, todoRoute)

module.exports = route