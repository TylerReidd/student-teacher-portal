const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

router.post('/', async(req,res)=> {
  try {
    const {title, type, content, description} = req.body;
    const resource = new Resource({title, type, content,description})
    await resource.save()
    res.status(201).json(resource)
  } catch (err) {
    res.status(500).json({error: 'failed to add resource'})
  }
})

// get resources
router.get('/',async(req,res) => {
  try {
    const resources = await Resource.find().sort({createdAt: -1})
    res.json(resources);
  } catch( err) {
    res.status(500).json({error: 'failed to fetch resources'})
  }
})

//update resource
router.put('/:id', async (req,res) => {
  try {
    const updated =await Resource.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated);
  } catch (err) {
    res.status(500).json({error: 'Failed to update resource'})
  }
})

module.exports = router