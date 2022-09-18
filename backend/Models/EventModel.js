const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter event name'],
        trim: true   //remove extra spaces
    },
    description: {
        type: String,
        required: [true, 'Please enter event description'],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this event'],

        //enum is for category
        enum: {
            values: [
                'Coding', 'Long Hackathon', 'Entertainment', 'Sports', 'Education'
            ],
            message: 'Please select correct category for event'
        }
    },
    organizedBy: {
        type: String,
        required: [true, 'Please enter name of organizor']
    },
    capacity: {
        type: Number,
        required: [true, 'Please enter capacity for event']
    },
    numsOfRegistration:{
        type: Number,
        required:[true,'Please enter product stock'],
        default:0
    },
    date: {
        type: Date,
        required: [true, 'Please enter date']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    duration: {
        type: Number,
        required: [true, 'Please enter duration of event']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Event', eventSchema)