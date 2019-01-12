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

CourseSchema.methods.toJSON = function() {
  return {
    id: this._id.toString(),
    code: this.code,
    name: this.name,
    reviewCount: this.reviewCount,
    avgRating: this.avgRating,
    avgDifficulty: this.avgDifficulty,
    avgWorkload: this.avgWorkload
  }
}

module.exports = Course = mongoose.model('courses', CourseSchema);
