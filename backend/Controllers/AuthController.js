const UserModel = require('../Models/UserModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary')
//Register a user      =>api/v1/register


exports.registerUser = catchAsyncError(async(req,res,next)=>{
    
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width: 150,
        crop:"scale"
    })
    const {email,password,name} = req.body;

    const user = await UserModel.create({
        name,password,email,
        avatar:{
            public_id: result.public_id,
            url : result.secure_url
        }
    })
    
    sendToken(user,200,res)
})



//login user    => /api/v1/login
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password',400))
    }

    const user = await UserModel.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401))

    }
    sendToken(user,200,res)
})

//Logout user    => /api/v1/logout
exports.logOut = catchAsyncError( async(req,res,next)=>{
    //when user logout clear the cookie
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

// =>/api/v1/passeor/forgot
exports.forgotPassword = catchAsyncError( async (req,res,next)=>{

    
    const user = await UserModel.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler('User not found with this email',404))

    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    //Create reset password url   protocol = http or https
    // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    
    // const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
 

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email:user.email,
            subject: 'Event Password Recovery',
            message
        })

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;   
    await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message, 500))
    }


})



//Reset Password    =>api/v1/password/reset/:token
exports.resetPassword = async(req,res,next)=>{
    //get req.param to token from email

    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')


    const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt : Date.now()
        }
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        res.status(400).json({message:"Password does not match"})
    }

    //setup new password
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;  

    await user.save();

    sendToken(user,200,res);

    
}

//Get currently logged in user detail    => /api/v1/me 
exports.getUserProfile = async(req,res,next)=>{
    const user = await UserModel.findById(req.user.id);   //req.user.id - from auth middleware

    res.status(200).json({success:true,user})
}



//Update / change password  => /api/v1/password/update
exports.updatePassword = async(req,res,next)=>{
    //get userid and password
    const user = await UserModel.findById(req.user.id).select('+password');

    //Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect'))
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user,200,res);  
}



//Update user profile     =>api/v1/me/update
exports.updateProfile = async(req,res,next)=>{
    const newUserData={
        name : req.body.name,
        email: req.body.email
    }


    // Update avatar : TODO
    if (req.body.avatar !== '') {
        const user = await UserModel.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
     
    const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
    })
}


//Admin Routes

//Get all users   =>api/v1/admin/users
exports.allUsers = async(req,res,next)=>{
    const users  = await UserModel.find()

    res.status(200).json({
        succes:true,
        users 
    })
}

//Get user details   =>api/v1/admin/user/:id
exports.getUserDetail = async(req,res,next)=>{
    const id = req.params.id;
    const user = await UserModel.findById(id)

    if(!user) {
        return next(new ErrorHandler(`User does not found with id: ${id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
}


//Update user profile   => /api/v1/admin/user/:id
exports.updateUserProfile = async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email: req.body.email,
        role : req.body.role
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify: false
    })

    res.status(200).json({
        success:true
    })
}


// Delete users     => api/v1/admin/user/:id
exports.deleteUserProfile = async(req,res,next)=>
{
    const id = req.params.id;

    
        const user = await UserModel.findById(id)

        if(!user){
            return next(new ErrorHandler(`User not found with this ${id}`))
        }
        
        //remove avatar
        // const image_id = user.avatar.public_id;
        // const res = await cloudinary.v2.uploader.destroy(image_id); 
        await user.remove();
    res.status(200).json({
        success: true,
        // isDeleted:true
    })
   
}
