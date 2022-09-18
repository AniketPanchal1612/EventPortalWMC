const express = require('express')
const { newRegister, getSingleRegister, myRegisterEvent, allRegisters, deleteRegisterEvent } = require('../Controllers/RegisterController')
const router = express.Router()




const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/register/new').post(isAuthenticatedUser, newRegister)
router.route('/register/:id').get(isAuthenticatedUser, getSingleRegister)
router.route('/registers/me').get(isAuthenticatedUser, myRegisterEvent)
router.route('/admin/registers').get(isAuthenticatedUser, authorizeRoles('admin'), allRegisters)
router.route('/admin/register/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteRegisterEvent)

module.exports = router