const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())

const assignmentRoutes = require('./routes/assignments');
app.use('/api/assignments', assignmentRoutes);

const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => {
  res.send('Server is running')
})


mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error(err));