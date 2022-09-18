const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const userModel = require('../Models/UserModel')
const ErrorHandler = require('../utils/errorHandler')
dotenv.config()
//Check if user authenticated or not
//this method authenticate backend side not frontend

//if isAuthenticatedUser yes then all products show to users
exports.isAuthenticatedUser = async(req,res,next)=>{
    
    //get token from params
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message:"Login first to access resource"})
    } 

    //verify token
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await userModel.findById(decoded.id);

    next();
}

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) 
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403)
                )
        next()
    }
}