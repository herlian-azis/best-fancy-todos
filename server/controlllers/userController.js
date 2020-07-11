const { User } = require('../models')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const helper = require('../helpers/helper')
const axios = require('axios')

const mailboxValidator = axios.create({
    baseURL: 'https://api.mailboxvalidator.com/v1/validation/single?key=ZLDJ9PTKF83YSRQUUJW9&',
});

class UserController {
    static login(req, res, next){
        console.log(req.body);
        
        let result
        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if(user){
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        result = {
                            id: user.id,
                            email: user.email,
                        }
                        let token = helper.generate(result)
                        res.status(200).json({ accessToken: token })
                    } else {
                        next(createError(404, 'Incorrect Username or Password'))
                    }
                } else {
                    next(createError(404, 'Incorrect Username or Password'))
                }
            })
            .catch(next)
    }

    static register(req, res, next){
        // console.log(req.body);

        let { username, email, password } = req.body

        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                // console.log();
                
                if(!user){
                    return mailboxValidator.get(`&email=${email}`)
                }
                throw createError(400, 'Email already registered')
            })
            .then(user => {
                if(user.data.is_verified == 'True'){
                    return User.create({
                        username,
                        email,
                        password
                    })
                }
                throw createError(400, 'Email does not exist or not verified')
            })
            .then(({ username, email }) => {
                res.status(201).json({ username, email })
            })
            .catch(next)
    }

    static  googleLogin(req, res, next){
        console.log(req.payload)
        User
            .findOne({
                where: {
                    email: req.payload.email
                }
            })
            .then(user => {
                if(!user){
                    return User.create({
                        username: req.payload.name,
                        email: req.payload.email,
                        password: process.env.PASSWORD_DEFAULT
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                // console.log(user.id)
                let token = helper.generate(payload)
                res.status(200).json({ accessToken: token})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}


module.exports = UserController