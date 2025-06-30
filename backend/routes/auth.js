const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'bigsecret135792468'

//register
router.post('/register', async (req,res) => {
  const {email, password, role, name} = req.body;
  const existing = await User.findOne({email})
  if (existing) return res.status(400).json({error: 'Email already exists'})

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({email, passwordHash,role, name})
  await user.save()
  res.status(201).json({message: 'User registered'})
})


// login
router.post('/login', async(req, res) => {
  const {emai, password} =req.body;
  const user = await findOne({email})
  if(!user) return res.status(400).json({error: "Invalid email or password"});

  const token = jwt.sign({id: user._id, role: user.role}. JWT_SECRET, {expiresIn: '1d'})
  res.json({token, user: {id: user._id, role: user.role, email: user.emai, name: user.name}})
})

module.exports = router