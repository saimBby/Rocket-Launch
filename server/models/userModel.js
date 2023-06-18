const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    confirmedPassword: {
      type: String,
      required: true
    },
    fullname: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
      throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
      throw Error("Email Not found")
    }

    const match = await bcrypt.compare(password, user.confirmedPassword)
    if (!match) {
      throw Error('Incorrect password')
    }

    return user
}

userSchema.statics.signup = async function(fullname, email, confirmedPassword) {

    // validation
    if (!fullname || !email || !confirmedPassword) {
      throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }

    const exists = await this.findOne({ email })

    if (exists) {
      throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(confirmedPassword, salt)

    const user = await this.create({ email, confirmedPassword: hash, fullname })

    return user
}

module.exports = mongoose.model('tamsusers', userSchema)