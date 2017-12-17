var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var DoctorsUserSchema = new mongoose.Schema({
        firstname:{
        type: String,
        unique: false,
        required: true,
        trim: true,  
      },
      lastname:{
        type: String,
        unique: false,
        required: true,
        trim: true, 
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  birthday:{
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  maritalstatus: {
    type: String,
    required: true,
  },
  age:{
      type: Number,
      default: Date.now,
  },

}, { collection: 'doctors-personal-info' });

var DrUser = mongoose.model('doctors', DoctorsUserSchema);
module.exports = DrUser;