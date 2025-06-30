const express = require('express')
const router = express.Router()
const Assignment = require('../models/Assignment')


router.post('/', async(req, res) => {
  try{
    const {studentId, content} = req.body;
    const assignment = new Assignment({studentId, content})
    await assignment.save()
    res.status(201).json(assignment);
  } catch(err) {
    res.status(500).json({error: "failed to create assignment"})
  }
})


// get assignments for specific student
router.get('/:studentId', async(req,res) => {
  try {
    const {studentId} = req.params;
    const assignments = await Assignment.find({studentId})
    res.json(assignments)
  } catch(err){
    res.status(500).json({error: 'failed to fetch assignments'})
  }
})

module.exports = router;