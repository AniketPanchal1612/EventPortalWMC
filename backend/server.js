const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary')

dotenv.config({path:'backend/.env'})


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//setup .env


mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    // useCreateIndex:true
}).then(()=>
app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT} in ${process.env.NODE_ENV}`)
}))


