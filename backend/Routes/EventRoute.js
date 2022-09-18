const express = require('express')
const { newEvent, getEvents, getSingleEvent, updateEvent, deleteEvent, getAdminEvents } = require('../Controllers/EventController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const router = express.Router()


router.route('/events').get(getEvents)
router.route('/event/:id').get(getSingleEvent)

router.route('/admin/events').get(getAdminEvents)

router.route('/admin/event/new').post(isAuthenticatedUser,authorizeRoles('admin'), newEvent)
router.route('/admin/event/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateEvent)
router.route('/admin/event/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteEvent)


module.exports=router