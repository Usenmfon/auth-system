var express = require('express')
const { jsonParser } = require('../../config/parser')
const { signUp, login, resetPassword, forgotPassword } = require('../controllers/auth')

const authRoute = express.Router()

authRoute.post('/signup', jsonParser, signUp)
authRoute.post('/login', jsonParser, login)
authRoute.post('/forgotpassword', jsonParser, forgotPassword)
authRoute.post('/resetpassword', jsonParser, resetPassword)

module.exports = authRoute