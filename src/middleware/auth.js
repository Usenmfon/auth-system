const jwt = require('jsonwebtoken')
const { JWT_TOKEN } = require('../../config/secret')

const tokenSecret = JWT_TOKEN

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) res.status(401).json({ message: "No authentication token" })
  else {
      jwt.verify(token.split(" ")[1], tokenSecret, async (err, value) => {
          if (err) {
              return res.status(403).json({ message: 'invalid authenticate token' })
            } 
        req.user = value.data
      next()
    })
  }
}

exports.isStaff = (req, res, next) => {
  if (req.user.role >= 1) {
    next()
  } else {
    return res.status(403).json({ message: "Staff Permission denied" })
  }
}

exports.isManager = (req, res, next) => {
  if (req.user.role >= 3) {
    next()
  } else {
    return res.status(403).json({ message: "Permission denied" })
  }
}

exports.isAdmin = (req, res, next) => {
  if (req.user.role >= 5) {
    next()
  } else {
    return res.status(403).json({ message: "Permission denied" })
  }
}