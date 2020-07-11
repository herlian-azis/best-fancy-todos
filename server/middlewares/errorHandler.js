function clientErrorHandler (err, req, res, next){
    try {
        if(err.name == 'SequelizeDatabaseError'){
            next(err)
        } else {
            res
                .status(err.statusCode || 400)
                .json({ errors: err.message.split('\n') })
        }
    }
    catch(err){
        next(err)
    }
}

function serverErrorHandler(err, req, res, next){
    res.status(500).json({ errors: 'Server currently unable to handle this request'})
}

module.exports = { clientErrorHandler, serverErrorHandler }