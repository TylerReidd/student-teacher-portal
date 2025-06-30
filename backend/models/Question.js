const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  studentId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
  questionText: {type: String, required: true},
  responseText: {type: String},
  createdAt: {type: Date, defaut: Date.now}
})

module.exports = mongoose.model('Question', questionSchema)