const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  reviewCount: {
    type: Number
  },
  avgRating: {
    type: Number
  },
  avgDifficulty: {
    type: Number
  },
  avgWorkload: {
    type: Number
  }
});

module.exports = Course = mongoose.model('courses', CourseSchema);
