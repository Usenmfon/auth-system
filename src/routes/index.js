var express = require('express')
// const { isAuthenticated } = require('../middleware/auth')
const { renderResponse } = require('../middleware/global')

const authRoute = require('./auth')
const userRoute = require('./user')

const routes = express.Router()

routes.use('/auth', authRoute, renderResponse)
routes.use('/user', userRoute, renderResponse)

module.exports = routes