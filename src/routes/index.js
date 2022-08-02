var express = require('express')
// const { isAuthenticated } = require('../middleware/auth')
const { renderResponse } = require('../middleware/global')

const authRoute = require('./auth')

const routes = express.Router()

routes.use('/auth', authRoute, renderResponse)

module.exports = routes