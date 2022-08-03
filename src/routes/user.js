var express = require('express')
const { jsonParser } = require('../../config/parser')
// const { signUp, login } = require('../controllers/auth')
const { isAuthenticated, isStaff } = require('../middleware/auth')
const { updateUserProfile, getUserProfile, getStaffProfile } = require('../controllers/users/profile')

const authRoute = express.Router()

authRoute.get('/', jsonParser, isAuthenticated, getUserProfile)
authRoute.get('/staff', jsonParser, isAuthenticated, isStaff, getStaffProfile)
authRoute.put('/', jsonParser, isAuthenticated, updateUserProfile)

module.exports = authRoute