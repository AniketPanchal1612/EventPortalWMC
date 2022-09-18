const EventModel = require('../Models/EventModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError')
const cloudinary = require('cloudinary')
const APIFeatures = require('../utils/apiFeatures')
//get all events for homepage   => /api/v1/products?keyword=apple
exports.getEvents = catchAsyncErrors(async (req, res, next) => {
    //eventascount for frontend
    const eventsCount = await EventModel.countDocuments()
    const resPerPage = 4
    const apiFeatures = new APIFeatures(EventModel.find(), req.query).search().pagination(resPerPage)
    const events = await apiFeatures.query;

    // const events = await EventModel.find()
    res.status(201).json({
        success: true,
        eventsCount,
        resPerPage,
        count: events.length,
        events
    })

})

//get single event    => /api/v1/product/:id
exports.getSingleEvent = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const event = await EventModel.findById(id)
    if (!event) {
        return next(new ErrorHandler('Event not found', 404));
    }

    res.status(201).json({ success: true, event })

})



exports.getAdminEvents = async (req, res, next) => {

    const events = await EventModel.find();

    res.status(200).json({
        events

    })

}
//create new event    => /api/v1/admin/event/new
exports.newEvent = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'events'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const event = new EventModel(req.body);
    await event.save()
    res.status(201).json({
        success: true,
        event
    })


    //in course 404

    res.status(501).json(error)

}
)
//update event   =>api/v1/admin/event/:id
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {

    let event = await EventModel.findById(req.params.id)

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Event not found'
        })
    }


    event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({ success: true, event })
})

//delete event     =>api/v1/admin/event/:id
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    const event = await EventModel.findById(req.params.id);
    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Event not found'
        })
    }

    await event.remove();
    res.status(200).json({
        success: true,
        message: 'Event is deleted successfully'
    })
})


