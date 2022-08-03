const mongoose = require('mongoose');

const { default: isEmail } =  require('validator/lib/isEmail')
const { default: isMobilePhone } =  require('validator/lib/isMobilePhone')

const UserSchema = mongoose.Schema({
    firstname: { type: String, required: [true, 'Full Name is required'] },
    lastname: { type: String, required: [true, 'Last Name is required'] },
    email: {
      type: String, lowercase: true, required: [true, 'Email is required'],
      validate: [{ validator: isEmail, message: val => "please enter a valid email", }]
    },
    phone: {
      type: String,
      validate: [{ validator: isMobilePhone, message: val => "please enter a valid phone Number", }]
    },
    password: { type: String, required: [true, 'Password is required'] },
    location: { type: String },
    type: { type: Number, default: 0 },
    role: { type: Number, default: 0 }
  
  }, {
    timestamps: true
  });

const ResetToken = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  code: { type: Number, required: true },
  attempt: { type: Number, default: 0 },
  type: { type: String, default: 'password', enum: ['password'] },

}, { timestamps: true })

exports.UserSchema = mongoose.model('User', UserSchema);
exports.ResetTokenSchema = mongoose.model('ResetToken', ResetToken);
  