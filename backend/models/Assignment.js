const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},

  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}

})

module.exports = mongoose.model('Assignment',assignmentSchema)