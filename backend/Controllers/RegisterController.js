const RegisterModel = require('../Models/RegisterModel')
const EventModel = require('../Models/EventModel')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')



//Create a new order   => api/v1/register/new
exports.newRegister =catchAsyncError( async(req,res,next)=>{
    //pullout information
    const {
        registerInfo,
        registerEventDetail,
     } = req.body;

     const register = await RegisterModel.create({
        registerInfo,
        registerEventDetail,
        user: req.user._id
    })

    res.status(200).json({success:true, register})
}
)



//Get single order    =>/api/v1/register/:id
exports.getSingleRegister = catchAsyncError( async(req,res,next)=>{

    const register = await RegisterModel.findById(req.params.id).populate('user','name email')

    if(!register){
        return next(new ErrorHandler('No Event register found with this ID',404))
    }

    res.status(200).json({success:true,register})
})



//Get Logged in user order    =>/api/v1/order/me
// get all orders only logged in user get
exports.myRegisterEvent = catchAsyncError( async(req,res,next)=>{

    const registers = await RegisterModel.find({user:req.user.id})
    
    res.status(200).json({success:true,registers})
})


// get all orders for ADMIN  => /api/v1/admin/orders/
exports.allRegisters = async(req,res,next)=>{

    const registers = await RegisterModel.find()

    let totalRegistration = 0;
    registers.forEach(register=>{
        totalRegistration += register.registerEventDetail.quantity
    })

    res.status(200).json({
        success:true,
        totalRegistration,
        registers
    })
}


//Delete order ADMIN   =>/api/v1/admin/order/:id
exports.deleteRegisterEvent = async(req,res,next)=>{
    const register = RegisterModel.findById(req.params.id)

    if(!register){
        return next(new ErrorHandler('No Event register found with this ID',404))

    }
    await register.remove();

    res.status(200).json({success:true,message:"Registration deleted successfully"})
}


