const express = require('express');
const router = express.Router();

const Review = require('../models/Review');

/**
 * TODO:
 * @route   POST /api/reviews/post
 * @desc    Posts a new review on the site
 * @access  Private
 */
router.post('/post', (req, res, next) => {
  // TODO: Check if safe
  // https://stackoverflow.com/q/54167636/6854595
  const review = new Review({...req.body});

  review
    .save()
    .then((review) => res.json(review))
    .catch(next);
});


/**
 * TODO:
 * @route   GET /api/reviews/by-course-id 
 * @desc    Gets all the reviews for a course
 * @access  Private
 */


/**
 * TODO:
 * @route   GET /api/reviews/by-review-id
 * @desc    Gets a single review by id
 * @access  Private
 */


/**
 * TODO:
 * @route   PUT /api/reviews/update
 * @desc    Updates a single review
 * @access  Private
 */


/**
 * TODO:
 * @route   DELETE /api/reviews/delete
 * @desc    Deletes a review by its id
 * @access  Private
 */

 module.exports = router;