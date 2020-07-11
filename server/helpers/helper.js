const jwt = require('jsonwebtoken')

function changeFormatDate(date){
    return date.toLocaleDateString('id')
}

function generate(payload){
    return jwt.sign(payload, process.env.SECRET)
}

function verification(token){
    return jwt.verify(token, process.env.SECRET)
}


module.exports = { changeFormatDate, generate, verification }