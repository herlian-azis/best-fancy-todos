const userRoute = require('express').Router()

const UserController = require('../controlllers/userController')
const googleVerify = require('../middlewares/googleVerify')

userRoute
        .post('/google/signin', googleVerify, UserController.googleLogin)
        .post('/login', UserController.login)
        .post('/register', UserController.register)

module.exports = userRoute