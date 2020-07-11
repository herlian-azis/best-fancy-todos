const helper = require('../helpers/helper')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    try {
        if(req.headers.token){
            req.user = helper.verification(req.headers.token)
            next()
        } else {
            throw (createError(400, 'Invalid Token'))
        }
    }
    catch (error) {
        next(error)
    }
}