var express = require('express')
const { jsonParser } = require('../../config/parser')
// const { signUp, login } = require('../controllers/auth')
const { updateUserProfile, getUserProfile } = require('../controllers/users/profile')

const authRoute = express.Router()

authRoute.get('/', jsonParser, getUserProfile)
authRoute.put('/', jsonParser, updateUserProfile)

module.exports = authRoute