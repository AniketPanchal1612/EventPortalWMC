const express = require('express')
const app = express();

const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error')
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());



const event = require('./Routes/EventRoute')
const auth = require('./Routes/AuthRoute')
const register = require('./Routes/RegisterRoute')
app.use('/api/v1',event)
app.use('/api/v1',auth)
app.use('/api/v1',register)


//middleware to handle error
app.use(errorMiddleware)

module.exports = app