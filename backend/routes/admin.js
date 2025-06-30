const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');



//get all the users
router.get('/users', async (req,res) => {
  try {
    const users = await User.find({}, '-passwordHash');
    res.json(users);
  } catch(err) {
    res.status(500).json({error: "failed to fetch users "})
  }
})

router.delete('/users/:id', async (req,res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({error: "Failed to delete user"});
  }
})


//reset user password
router.post('/users/:id/reset-password', async (req,res) => {
  try {
    const {newPassword} = req.body;
    const hash = await bcrypt.hash(newPassword, 10)
    await User.findByIdAndUpdate(req.params.id, {passwordHash: hash})
    res.json({message: "Password reset"})
  } catch(err) {
    res.status(500).json({error: "Failed to reset password"})
  }
})

module.exports = router;
