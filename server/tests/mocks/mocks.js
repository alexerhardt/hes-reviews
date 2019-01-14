const users = require('../seed/users');
const courses = require('../seed/courses');

module.exports.reviews = {
  good: [
    {
      course: courses[0]._id,
      semester: "spring",
      year: 2017,
      rating: 5,
      difficulty: 4,
      workload: 10,
      body: "I loved this course"
    }
  ]
};