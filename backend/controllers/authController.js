const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// This should be your User model — adjust path as needed
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });


    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, role: newUser.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
