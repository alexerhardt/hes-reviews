const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const User = require('../models/User');
const users = require('./seed/users');
const courses = require('./seed/courses');
const hooks = require('./hooks/hooks');

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