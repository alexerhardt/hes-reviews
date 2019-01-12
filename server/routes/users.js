const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

/**
 * @route  POST /users/signup
 * @desc   Signs up a user to the service
 * @access Public
 */
router.post('/signup', (req, res, next) => {
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
        email: req.body.email,
        password: req.body.password
      });

      // Encrypt password then save everything to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return next(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch(next);
        });
      })
    }
  })
});



/**
 * @route  POST /users/login
 * @desc   Login user and return JWT token
 * @access Public
 */
router.post('/login', (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 24 * 60 * 60 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token 
            });
          }
        )
      }
      else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});



/**
 * @route  GET /users/current
 * @desc   Returns current user
 * @access Private
 * TODO: Check if we can abridge the middleware
 */
router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);


module.exports = router;