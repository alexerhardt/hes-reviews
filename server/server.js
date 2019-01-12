require('./config/index.js');
require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const courses = require('./routes/courses');

const app = express();

// Compress all responses
app.use(compression());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static pages from public
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

// Use Passport middleware and configure it
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/courses', courses);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


if (process.env.NODE_ENV !== 'production') {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
