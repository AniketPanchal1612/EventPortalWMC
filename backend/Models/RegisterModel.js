const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({

    registerInfo:{
        // name:{
        //     type:String,
        //     required:true
        // },
        phoneNo:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        course:{
            type:String,
            required:true
        },
        courseSpecialization:{
            type:String,
            required:true
        },
        yearOfGraduation:{
            type:Number,
            required:true
        },
        collageName:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default: Date.now
        }
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    registerEventDetail:
        {
            //name of event
            name:{
                type:String,
                required:true
            },
            quantity : {
                type:Number,
                required:true,
                default:1
            },
            image:{
                type:String,
                required:true
            },
            event:{
                type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
                
            } 

        }
    ,
    createdAt:{
        type:Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Register', registerSchema)