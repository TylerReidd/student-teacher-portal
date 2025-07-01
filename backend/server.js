const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// app.options('*', cors());

app.use(express.json());

// Routes
const assignmentRoutes = require('./routes/assignments');
app.use('/api/assignments', assignmentRoutes);

const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const uploadRoutes = require('./routes/uploads');
app.use('/api/uploads', uploadRoutes);

const resourceRoutes = require('./routes/resources');
app.use('/api/resources', resourceRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Static files
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });
