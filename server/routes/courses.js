const express = require('express');
const router = express.Router();

const Course = require('../models/Course');

/**
 * @route  GET /courses/all
 * @desc   Returns the information for all courses
 * @access Public
 */
router.get('/all', (req, res, next) => {
  // Retrieve all courses from the DB
  // Format them into format consumable by client (maybe?)
  Course
    .find({})
    .then((rawCourseData) => {
      const courseJson = rawCourseData.map((course) => ({
        code: course.code,
        name: course.name,
        reviewCount: course.reviewCount,
        avgRating: course.avgRating,
        avgDifficulty: course.avgDifficulty,
        avgWorkload: course.avgWorkload
      }));

      return res.json(courseJson);
    })
    .catch(next);
});

/**
 * @route  GET /courses/:id
 * @desc   Returns the information for a single course
 * @access Public
 */


 module.exports = router;