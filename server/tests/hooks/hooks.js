const { app } = require('../../server');
const request = require('supertest');
const User = require('../../models/User');
const Course = require('../../models/Course');
const users = require('../seed/users');
const courses = require('../seed/courses');

module.exports.populateUsers = function(done) {
  User
    .deleteMany({})
    .then(() => {
      const saved = users.map((user) => new User(user).save());
      return Promise.all(saved);
    })
    .then(() => done());
};

module.exports.populateCourses = function(done) {
  Course
    .deleteMany({})
    .then(function() {
      const saved = courses.map((course) => new Course(course).save());
      return Promise.all(saved);
    })
    .then(function() {
      done();
    })
}



