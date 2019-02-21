const express = require('express');
const router = express.Router();

const Course = require('../models/Course');

/**
 * @route  GET /courses/all
 * @desc   Returns the information for all courses
 * @access Public
 */
router.get('/all', (req, res, next) => {
  Course
    .find({})
    .then((rawCourseData) => {
      const courseJSON = rawCourseData.map(course => course.toJSON());
      return res.json(courseJSON);
    })
    .catch(next);
});

/**
 * @route  GET /courses/by-id
 * @desc   Returns the information for a single course
 * @access Public
 */
router.get('/by-id/:courseId', (req, res, next) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({courseCode: 'courseId required'});
  }

  Course
    .findById(courseId)
    .then((course) => {
      if (!course) {
        return res.status(400).json({courseCode: 'course not found'});
      }

      return res.json(course.toJSON());
    })
    .catch(next);
});

 module.exports = router;