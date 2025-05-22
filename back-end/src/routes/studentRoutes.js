const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Test = require('../models/Test');
const Result = require('../models/Result');

// Get all tests assigned to the logged-in student
router.get('/my-tests', protect, async (req, res) => {
  try {
    const tests = await Test.find({ assignedTo: req.user._id }).populate('questions');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific test assigned to the logged-in student by testId
router.get('/my-tests/:testId', protect, async (req, res) => {
  try {
    const test = await Test
      .findOne({ _id: req.params.testId, assignedTo: req.user._id })
      .populate('questions');

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit test answers for a test
router.post('/submit/:testId', protect, async (req, res) => {
  try {
    const { answers } = req.body;
    const test = await Test.findById(req.params.testId).populate('questions');

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    let score = 0;
    const resultAnswers = [];

    for (const ans of answers) {
      const question = test.questions.find(q => q._id.toString() === ans.questionId);
      if (!question) continue;

      const isCorrect = question.correctAnswer === ans.selectedOption;
      if (isCorrect) score++;

      resultAnswers.push({
        questionId: question._id,
        selectedOption: ans.selectedOption,
        isCorrect,
      });
    }

    const result = new Result({
      studentId: req.user._id,
      testId: test._id,
      score,
      answers: resultAnswers,
    });

    await result.save();

    res.status(201).json({ message: 'Test submitted successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all results of logged-in student
router.get('/my-results', protect, async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user._id })
      .populate('testId', 'title')
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
