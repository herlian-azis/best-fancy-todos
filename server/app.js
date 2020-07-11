// if(process.env.NODE_ENV == 'development'){
// }
require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

const route = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded( { extended:true } ))

    .use(route)
    .use(errorHandler.clientErrorHandler)
    .use(errorHandler.serverErrorHandler)

    .listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})
