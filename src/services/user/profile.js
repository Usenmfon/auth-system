const { parseDBError } = require("../../mixin/errorHandlers")
const { UserSchema } = require("../../model/user")
const { userSelectFields } = require("../serializers")

// function uploadProfileImage(){
  
// }

exports.updateUserProfile = async function (id, data, avatar) {
  if (avatar) data.avatar = avatar.filename
    const user = await UserSchema.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .select([...userSelectFields])
      .lean()
      .catch(e => {
        return { error: parseDBError(e) }
      })
    return user
}

exports.getUserProfile = async function (id) {
    const user = UserSchema.findById(id)
      .select([...userSelectFields])
      .lean()
      .catch(e => {
        return { error: parseDBError(e) }
      })
    return user
}

exports.getStaffProfile = async function (id) {
    const user = UserSchema.findById(id)
      .select([...userSelectFields])
      .lean()
      .catch(e => {
        return { error: parseDBError(e) }
      })
    return user
}