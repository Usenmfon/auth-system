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

exports.isAdmin = (req, res, next) => {
  if (req.user.type >= 3) {
    next()
  } else {
    return res.status(403).json({ message: "Permission denied" })
  }
}

exports.isSuperAdmin = (req, res, next) => {
  if (req.user.type >= 5) {
    next()
  } else {
    return res.status(403).json({ message: "Permission denied" })
  }
}