const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const User = require('../models/User');
const Review = require('../models/Review');
const Course = require('../models/Course');
const users = require('./seed/users');
const courses = require('./seed/courses');
const hooks = require('./hooks/hooks');
const mocks = require('./mocks/mocks');

let token = undefined;
const loginUser = function(done) {
  request(app)
    .post('/api/users/login')
    .send(users[0])
    .end(function(_, res) {
      token = res.body.token;
      done();
    });
};

describe('GET /api/users/current', function() {
  before(hooks.populateUsers);
  before(loginUser);

  it('should get the current user data', function(done) {
    request(app)
      .get('/api/users/current')
      .expect(200)
      .set('Authorization', token)
      .expect(function(res) {
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
});


describe('POST /api/reviews/post', function() {
  before(hooks.populateUsers);
  before(hooks.populateCourses);
  before(loginUser);

  it('should post a new review', function(done) {
    request(app)
      .post('/api/reviews/post')
      .send(mocks.reviews.good[0])
      .set('Authorization', token)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }

        const id = res.body.review.id;
        Review
          .findById(id)
          .then(function (review) {
            expect(review).toMatchObject(mocks.reviews.good[0]);
            done();
          })
          .catch(function (e) { done(e) });
      });
  });
});