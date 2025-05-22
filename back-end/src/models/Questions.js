const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Question text is required'],
  },
  options: {
    type: [String], // Array of possible answers (e.g. ["A", "B", "C", "D"])
    validate: [arr => arr.length >= 2, 'At least two options are required'],
  },
  correctAnswer: {
    type: String, // Should match one of the options
    required: [true, 'Correct answer is required'],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Question', questionSchema);
