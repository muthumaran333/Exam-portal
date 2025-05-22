const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Test title is required'],
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Test duration is required'],
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }
  ],
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // students only
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // admin
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Test', testSchema);
