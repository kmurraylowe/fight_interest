const mongoose = require('mongoose')

const fightSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
  },
  Fighter1: {
    type: String,
    required: true,
  },
  Fighter2: {
    type: String,
    required: true,
  },
  for: {
    type: String,
    required: true,
  },
  against: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('fightModel', fightSchema)