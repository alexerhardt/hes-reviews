const ObjectId = require('mongoose').mongo.ObjectID;

module.exports = [
  {
    _id: new ObjectId(),
    email: 'test_user1@test.com',
    password: 'test_password',
  },
  {
    _id: new ObjectId(),
    email: 'test_user2@test.com',
    password: '123456',
  },
];
