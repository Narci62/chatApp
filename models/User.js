const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountType = ["ADMIN", "BUYER","SELLER"];

const gender = ["MALE", "FEMALE", "NONE"]

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: gender,
  },
  image: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique : true
  },
  accountType: {
    type: String,
    required: true,
    enum : accountType
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneNumberVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerificationToken: {
    type: String
  },
  passwordChangeToken: {
    type: String
  },
  company : {
    type: Object
  },
  info : {
    type: Object
  },
  createdBy : {
    type: Object
  }
}, {
  timestamps: true
});

userSchema.index({ email: 'unique' });
userSchema.index({ phoneNumber: 'unique' });


module.exports = {
  User: mongoose.model('User', userSchema),
  accountType: accountType
};