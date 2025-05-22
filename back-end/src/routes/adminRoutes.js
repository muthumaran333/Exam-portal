const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const Test = require('../models/Test');
const Question = require('../models/Questions');
const User = require('../models/User');
const Result = require('../models/Result');

// Get all questions
router.get('/questions', isAdmin, async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Create a new test
router.post('/create-test', isAdmin, async (req, res) => {
  try {
    const { title, duration, questionIds } = req.body;

    if (!title || !duration || !Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({ error: 'Please provide title, duration, and questionIds (non-empty array).' });
    }

    const test = new Test({
      title,
      duration,
      questions: questionIds,
      createdBy: req.user._id
    });

    await test.save();
    res.status(201).json({ message: 'Test created successfully', test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new question
router.post('/create-question', isAdmin, async (req, res) => {
  try {
    const { text, options, correctAnswer } = req.body;

    if (!text || !Array.isArray(options) || options.length < 2 || !correctAnswer) {
      return res.status(400).json({ error: 'Please provide question text, options (at least 2), and correctAnswer.' });
    }

    // ✅ Enhanced validation: Ensure correctAnswer is one of the options
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ error: 'Correct answer must be one of the provided options.' });
    }

    const question = new Question({ text, options, correctAnswer });
    await question.save();
    
    res.status(201).json({ message: 'Question created', question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Assign test to students
router.post('/assign-test/:testId', isAdmin, async (req, res) => {
  try {
    const { studentIds } = req.body;

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ error: 'Provide a non-empty array of studentIds.' });
    }

    const test = await Test.findByIdAndUpdate(
      req.params.testId,
      { $addToSet: { assignedTo: { $each: studentIds } } },
      { new: true }
    );

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    res.json({ message: 'Test assigned', test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password for security
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all tests (admin only)
router.get('/tests', isAdmin, async (req, res) => {
  try {
    const tests = await Test.find({}).populate('questions', 'text'); // Optional populate
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get results of a test
// router.get('/results/:testId', isAdmin, async (req, res) => {
//   try {
//     const results = await Result.find({ testId: req.params.testId }).populate('studentId', 'name email');
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/results/:testId', async (req, res) => {
  const { testId } = req.params;
  const { testName } = req.query;

  try {
    const query = { testId };

    if (testName) {
      query.testName = testName;
    }

    const results = await Result.find(query);

    if (!results.length) {
      return res.status(404).json({ message: 'No results found for the specified test.' });
    }

    res.status(200).json({ testId, testName, results });
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ message: 'Server error while fetching results.' });
  }
});

module.exports = router;
