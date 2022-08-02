const { parseResponse } = require("../../mixin/response")
const { updateUserProfile, getUserProfile } = require("../../services/user/profile")

exports.updateUserProfile = async function (req, res) {
  const { email, password, type, role,  ...data } = req.body
  const avatar = req.file

  try {
    if (!data) {
      throw new Error('update field is required')
    }
    const user = await updateUserProfile(req.user.id, data, avatar)
    if (user.error) {
      if (avatar) {
        fs.unlinkSync(avatar.path)
      }
      return res.status(400).json(user)
    }
    return res.status(200).send(user)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.getUserProfile = async function (req, res,next) {
  const response = { message: "failed to get profile data", status: 400 }

  try {
    const user = await getUserProfile(req.user.id)
    if (user.error) {
      response.data = user
    }else{
      response.message = "get profile sucessful"
      response.status = 200
      response.data = user
    }
  } catch (error) {
    response.data = { error: error.message }
  }

  parseResponse(req,response)
  next()
}