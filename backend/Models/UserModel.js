const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[30,'Your name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique: true,
        validate:[validator.isEmail,'Please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minlength:[6,'Your password is must be longer than 6 character'],
        select:false
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date
})

//encrypt password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

//return json web token
dotenv.config()
userSchema.methods.getJwtToken =function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    //this.pass= original stored password
    //match this email- entered password and stored db password
    return await bcrypt.compare(enteredPassword,this.password)
}

//generate password reset token 

//Generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generate a Token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //hash and set to resetPasswordToken
    //hash token only for database
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //set token expire time
    this.resetPasswordExpire = Date.now() + 30*60*1000 

    //without hash
    return resetToken
}
module.exports = mongoose.model('User',userSchema)