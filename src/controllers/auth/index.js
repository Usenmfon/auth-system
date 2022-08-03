const { JWT_TOKEN } = require("../../../config/secret")
const { DataValidator, loginRules, signUpRules } = require("../../../config/validators")
const { parseValidationError } = require("../../mixin/errorHandlers")
const { parseResponse } = require("../../mixin/response")
const { signUp, login, sendPasswordResetLink, resetPassword } = require("../../services/auth")

const jwt = require('jsonwebtoken');
// const { EventEmitter } = require("../../../config/event")


// console.log(EventEmitter)



function auth(user) {
  const data = { id: user._id, email: user.email, role: user.role}
  // const token = jwt.sign({ data: data }, JWT_TOKEN, { expiresIn: 60 * 15 })
  const token = jwt.sign({ data: data }, JWT_TOKEN)
  return { token: token, email: user.email, role: user.role, firstname: user.firstname,lastname:user.lastname }
}



exports.signUp = async function (req, res, next) {
  const data = req.body
  const response = { message: "failed to signUp", status: 400 }

  let validate = new DataValidator(data, signUpRules)
  let isValid = validate.passes()
  let error = validate.errors
  
  if (!isValid) {
    response.message = "Invalid input "
    let errorData = parseValidationError(error, validate.errorCount)
    response.data = errorData
  } else {
    await signUp(data).then((user) => {
      if (user.error) {
        response.data = user
        response.message = user.error
      } else {
        response.status = 201
        // EventEmitter.emit("signup",user)
        response.message = "signUp sucessful"
        response.data = auth(user, res)
      }
    }).catch(e => {
      response.data = e.message
    })
  }
  parseResponse(req, response)
  next()
}



exports.login = async function (req, res, next) {
  const data = req.body
  const response = { message: "failed to login", status: 400 }

  let validate = new DataValidator(data, loginRules)

  let isValid = validate.passes()
  let error = validate.errors

  if (!isValid) {
    response.message = "Invalid input "
    let errorData = parseValidationError(error, validate.errorCount)
    response.data = errorData
  } else {
    await login(data).then((user) => {
      if (user.error) {
        response.data = user
        response.message = user.error
      } else {
        response.status = 201
        response.message = "login sucessful"
        response.data = auth(user, res)
      }
    }).catch(e => {
      response.data = e.message
    })
  }
  parseResponse(req, response)
  next()
}

exports.forgotPassword = async function (req, res) {
  const email = req.body?.email

  if (!email) {
    return res.status(400).json({ error: 'email is required' })
  }

  try {
    // console.log('sending mail')
    const user = await sendPasswordResetLink(email)
    if (user.error) {
      return res.status(400).json(user)
    }
    
  } catch (e) {
    return res.status(400).json({error:e.message})
  }


  return res.status(201).send('reset link has been sent')

}


exports.resetPassword = async function (req, res) {
  const data = req.body
  if (!(data.code && !isNaN(data.code) && data.password)) {
    return res.status(400).json({ error: 'invalid reset link' })
  }

  const user = await resetPassword(data)

  if (user.error) {
    return res.status(400).json(user)
  }

  return res.status(201).send('reset password sucessful')

}
