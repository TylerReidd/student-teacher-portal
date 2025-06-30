const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router();
const {signup} = require('../controllers/authController')
const JWT_SECRET = process.env.JWT_SECRET || 'bigsecret135792468'

//signup
router.post('/signup', signup);


// login
router.post('/login', async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})
  if(!user) return res.status(400).json({error: "Invalid email or password"});

  const token = jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1d'})
  res.json({token, user: {id: user._id, role: user.role, email: user.emai, name: user.name}})
})

module.exports = router