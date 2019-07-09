const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    reviewCount: {
      type: Number,
      required: true,
    },
    aggRating: {
      type: Number,
      required: true,
    },
    aggDifficulty: {
      type: Number,
      required: true,
    },
    aggWorkload: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

CourseSchema.methods.toJSON = function() {
  return {
    id: this._id.toString(),
    code: this.code,
    name: this.name,
    reviewCount: this.reviewCount,
    aggRating: this.aggRating,
    aggDifficulty: this.aggDifficulty,
    aggWorkload: this.aggWorkload,
  };
};

module.exports = Course = mongoose.model('courses', CourseSchema);
