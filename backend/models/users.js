const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongooseHidden = require('mongoose-hidden')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  height: { type: String, required: true },
  bio: { type: String, required: true },
  interest: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true }
})

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

userSchema.plugin(uniqueValidator)
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.password !== this._passwordConfirmation) {

      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })

userSchema
  .pre('save', function hashPassword(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()

  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)