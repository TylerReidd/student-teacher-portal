const express = require('express')
const router = express.Router();
const Question = require('../models/Question')


router.post('/', async(req,res) => {
  try {
    const {studentId, questionText} = req.body;
    const question = new Question({studentId, questionText});
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({error: 'Failed to submit question'})
  }
})

router.put('/:id/response', async (req,res) => {
  try {
    const {responseText} = req.body;
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      {responseText},
      {new: true}
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({error: 'Failed to respond to question'})
  }
})


//get all the questions for the teacher

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().populate('studentId', 'email');
    res.json(questions);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch questions'})
  }
})


// get all questions by a student

router.get('/student/:studentId', async(req, res) => {
  try {
    const questions = await Question.find({studentId: req.params.studentId});
    res.json(questions);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch student questions'})
  }
})

module.exports = router;