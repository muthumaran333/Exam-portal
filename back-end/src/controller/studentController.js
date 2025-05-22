const Test = require('../models/Test');
const Result = require('../models/Result');

// Get all tests assigned to the logged-in student
exports.getMyTests = async (req, res) => {
  try {
    const tests = await Test.find({ assignedTo: req.user._id }).populate('questions');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit test answers
exports.submitTest = async (req, res) => {
  try {
    const { answers } = req.body; // [{ questionId, selectedOption }]
    const test = await Test.findById(req.params.testId).populate('questions');

    if (!test) return res.status(404).json({ message: 'Test not found' });

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
};

// Get results of logged-in student
exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user._id })
      .populate('testId', 'title')
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
