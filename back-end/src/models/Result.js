const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      }
    }
  ]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Result', resultSchema);
