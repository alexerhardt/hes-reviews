const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateSignupInput = require('../validation/signup');

const User = require('../models/User');

/**
 * @route  POST /users/signup
 * @desc   Signs up a user to the service
 * @access Public
 */
router.post('/signup', (req, res) => {
  console.log('signup req received, body: ', req.body);
  // Validate signup request, return error if not valid
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if email already exists
  // Return error if valid, else create new user
  User.findOne({ email: req.body.email} ).then((user) => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Encrypt password then save everything to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // TODO: This error handling is atrocious, fix it
          // Throw if hash fails, or if newUser can't be saved
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      })
    }
  })
});

module.exports = router;