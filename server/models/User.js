const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true 
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });


UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } 
  else {
    next();
  }
});

module.exports = User = mongoose.model('users', UserSchema);
