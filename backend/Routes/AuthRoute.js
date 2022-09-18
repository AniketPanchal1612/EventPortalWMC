const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetail, updateUserProfile, deleteUserProfile } = require('../Controllers/AuthController')
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')
router.post('/register',registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logOut)
router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUserDetail)
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateUserProfile)
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUserProfile)

module.exports = router