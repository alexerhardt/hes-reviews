const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const User = require('../models/User');

const users =  [
  {
    email: 'test_user_one@test.com',
    password: 'test_password'
  }
];

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    const userOne = new User(users[0]).save();
    return Promise.all([userOne]);
  }).then(() => done());
}

let token = undefined;

const loginUser = (done) => {
  request(app)
    .post('/api/users/login')
    .send(users[0])
    .end((_, res) => {
      token = res.body.token;
      done();
    });
};

describe('GET /api/users/current', () => {
  before(populateUsers);
  before(loginUser);

  it('should get the current user data', (done) => {
    request(app)
      .get('/api/users/current')
      .expect(200)
      .set('Authorization', token)
      .expect((res) => {
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
});