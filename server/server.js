const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;
const db = process.env.MONGODB_URI;

dotenv.config();

app.use(cors());
app.use(express.json());

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Register routes
app.use('/api/items', require('./routes/api/items'));

// Set static folder in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
