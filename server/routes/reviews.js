const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

const Review = require('../models/Review');

/**
 * @route   POST /api/reviews/post
 * @desc    Posts a new review on the site
 * @access  Private
 */
router.post('/post', authenticate, (req, res, next) => {
  // TODO: Check if spread is safe
  // https://stackoverflow.com/q/54167636/6854595
  const author = req.user.id;
  const review = new Review({...req.body, author});

  review
    .save()
    .then((review) => res.json(review))
    .catch(next);
});


/**
 * @route   GET /api/reviews/by-course-id 
 * @desc    Gets all the reviews for a course
 * @access  Public 
 */
router.get('/by-course-id', (req, res, next) => {
  const courseId = req.body.courseId;
  if (!courseId) {
    return res.status(400).json({validationErrors: 'Missing course id'});
  }

  Review
    .find({course: courseId})
    .then((reviews) => {
      if (reviews.length === 0) {
        return res.status(404).json({message: courseId + ': course not found'});
      }

      return res.json(reviews.map(review => review.toJSON()));
    });
});


/**
 * TODO:
 * @route   GET /api/reviews/by-review-id
 * @desc    Gets a single review by id
 * @access  Public
 */



/**
 * @route   PUT /api/reviews/update
 * @desc    Updates a single review
 * @access  Private
 */
router.put('/update', authenticate, (req, res, next) => {
  const reviewId = req.body.reviewId;

  if (!reviewId) {
    return res.status(400).json({validationErrors: 'Missing course id'});
  }

  const { semester, year, rating, difficulty, workload, body } = req.body;
  const update = {
    semester,
    year,
    rating,
    difficulty,
    workload,
    body
  };

  Review
    .findByIdAndUpdate(reviewId, update, { runValidators: true})
    .then((review) => {
      if (!review) {
        return res.status(404).json({message: reviewId + ': review not found'});
      }

      return res.json(review.toJSON());
    })
    .catch(next);
});


/**
 * TODO:
 * @route   DELETE /api/reviews/delete
 * @desc    Deletes a review by its id
 * @access  Private
 */

 module.exports = router;