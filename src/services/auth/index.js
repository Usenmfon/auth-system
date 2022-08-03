const { parseDBError } = require("../../mixin/errorHandlers")
const { UserSchema, ResetTokenSchema } = require("../../model/user")
const { randomInt } = require('crypto')
const { sendMail } = require("../../../config/mail")
const bcrypt = require('bcrypt')


exports.login = async function (data) {
  return UserSchema.findOne({ email: data.email })
    .select(['email', 'fullname', 'phone',  'password', 'role'])
    .then(async (user) => {
      if (!user) {
        return { error: 'email does not exist ' }
      }

      if (await bcrypt.compare(data.password, user.password)) {
        return user
      }
      return { error: 'incorrect password' }
    }).catch((e) => {
      return { error: parseDBError(e) }
    })
}


exports.signUp = async function (data) {
  return UserSchema.find({ email: data.email }).then(async (users) => {
    if (users.length) {
      return { error: 'email already exist' }
    }
    const user = UserSchema({ ...data })
    const error = user.validateSync()
    if (error) {
      throw error
    }

    const password = await bcrypt.hash(user.password, 5)
    user.password = password
    await user.save()
    return user
  }).catch((e) => {
    return { error: parseDBError(e) }
  })
}

exports.sendPasswordResetLink = async function (email) {
  const user = await UserSchema.findOne({ email: email }).catch(e => {
    return { error: parseDBError(e) }
  })
  if (!user) {
    return { error: 'email does not belong to any account' }
  }

  const code = randomInt(10001, 99999)

  const resetToken = await ResetTokenSchema.findOneAndUpdate({ user: user._id }, {  user: user._id, code: code }, { upsert: true, new: true }).catch((e) => {
    return { error: parseDBError(e) }
  })

  if (resetToken.error) {
    return resetToken
  }

  // const link = `localhost://8090/resetpassword/${user._id}/${code}`


  const response = await sendMail({
    to: user.email,
    subject: 'Password Reset Link',
    html: `<strong>Your reset OTP expires in 15 minutes </strong> <h1>${code}</h1>`
  }).catch(e => {
    console.log(e);
    return { error: 'cannot send email at the moment please try again send fail' }
  })
  return response

}


exports.resetPassword = async function (data) {
  const token = await ResetTokenSchema.findOne({ code: data.code, type: 'password' }).catch(e => {
    return { error: parseDBError(e) }
  })

  if (token == null || token.error) { return token?.error ? token : { error: 'invalid code' } }

  const maxTime = 1000 * 60 * 2 //token expires after 15minutes
  const timeDiff = new Date() - (token.createdAt ?? 0)
  const minutesPassed = Math.floor((timeDiff / 1000) / 60);

  if (minutesPassed >= maxTime) {
    return { error: 'code expired try reseting again' }
  }

  const password = await bcrypt.hash(data.password, 5)

  const user = await UserSchema.findByIdAndUpdate(token.user, { password: password }, { runValidators: true }).catch(e => {
    return { error: parseDBError(e) }
  })
  await token.delete()

  return user

}
