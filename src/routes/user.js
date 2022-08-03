var express = require('express')
const { jsonParser } = require('../../config/parser')
// const { signUp, login } = require('../controllers/auth')
const { isAuthenticated, isStaff, isManager, isAdmin } = require('../middleware/auth')
const { updateUserProfile, getUserProfile, getStaffProfile, getManagerProfile, getAdminProfile } = require('../controllers/users/profile')

const authRoute = express.Router()

authRoute.get('/', jsonParser, isAuthenticated, getUserProfile)
authRoute.get('/staff', jsonParser, isAuthenticated, isStaff, getStaffProfile)
authRoute.get('/manager', jsonParser, isAuthenticated, isManager, getManagerProfile)
authRoute.get('/admin', jsonParser, isAuthenticated, isAdmin, getAdminProfile)
authRoute.put('/', jsonParser, isAuthenticated, updateUserProfile)

module.exports = authRoute