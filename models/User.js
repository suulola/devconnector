const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please supply your name'
  },
  email: {
    type: String,
    required: 'Please supply your mail'
  },
  password: {
    type: String,
    required: 'Please supply a password'
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }



})

module.exports= mongoose.model('User', userSchema)