const Test = require('../models/Test');
const Question = require('../models/Questions');
const Result = require('../models/Result');

// Create a new test
exports.createTest = async (req, res) => {
  try {
    const { title, duration, questionIds } = req.body;
    const test = new Test({
      title,
      duration,
      questions: questionIds,
      createdBy: req.user._id,
    });
    await test.save();
    res.status(201).json({ message: 'Test created successfully', test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer } = req.body;
    const question = new Question({ text, options, correctAnswer });
    await question.save();
    res.status(201).json({ message: 'Question created', question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign test to students
exports.assignTest = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const test = await Test.findByIdAndUpdate(
      req.params.testId,
      { $addToSet: { assignedTo: { $each: studentIds } } },
      { new: true }
    );
    res.json({ message: 'Test assigned', test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get results of a test
exports.getTestResults = async (req, res) => {
  try {
    const results = await Result.find({ testId: req.params.testId }).populate('studentId', 'name email');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
