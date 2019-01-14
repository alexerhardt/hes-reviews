const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./Course');
const { isSemesterValid, isEmptyObject } = require('../../utils/utils-global');

const ReviewSchema = new Schema({
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'Review must have an author']
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: [true, 'Review must have a course id']
  },
  semester: {
    type: String,
    required: [true, 'Review must have a semester'],
    validate: [isSemesterValid, '{VALUE} not a valid semester']
  },
  year: {
    type: Number,
    min: [2016, 'Year must be after 2016'],
    max: [(new Date()).getFullYear(), 'Year cannot be in the future'],
    required: [true, 'Review must have a year'],
    validate: [Number.isInteger, 'Year must be an integer'] 
  },
  rating: {
    type: Number,
    min: [1, 'Minimum {PATH} is 1'],
    max: [5, 'Maximum {PATH} is 5'],
    required: [true, 'Review must have a {PATH}'],
    validate: [Number.isInteger, '{PATH} must be an integer']
  },
  difficulty: {
    type: Number,
    min: [1, 'Minimum {PATH} is 1'],
    max: [5, 'Maximum {PATH} is 5'],
    required: [true, 'Review must have a {PATH}'],
    validate: [Number.isInteger, '{PATH} must be an integer']
  },
  workload: {
    type: Number,
    min: [0, 'Minimum {PATH} is 1'],
    max: [40, 'Maximum {WORKLOAD} is 40'],
    required: [true, 'Review must have a {PATH}'],
    validate: [Number.isInteger, '{PATH} must be an integer']
  },
  body: {
    type: String,
    required: [true, 'You must write something']
  }
}, { timestamps: true });

ReviewSchema.path('course').validate({
  validator: (value, respond) =>
  {
    return Course
              .findOne({_id: value}, (err, doc) => {
                return !err && doc;
              });
  },

  message: 'Cannot find a course with id: {VALUE}'
});

/**
 * insertCourseAggregates
 * Updates the course aggregates with the values of an inserted review
 */
ReviewSchema.methods.insertCourseAggregates = function() {
  const review = this;
  const update = { 
    $inc: { 
      reviewCount: 1, 
      aggRating: review.rating,
      aggDifficulty: review.difficulty,
      aggWorkload: review.workload
    }
  }
  const result = Course.findByIdAndUpdate(review.course, update, { new: true } );
  return Promise.all([result, review]);
}


// /**
//  * updateCourseAggregates
//  * Updates the course aggregates with the values of an inserted review
//  */
// ReviewSchema.methods.updateCourseAggregates = function(changes) {
//   if (!changes.difficulty || !changes.rating || !changes.workload) {
//     return Promise.reject();
//   }

//   const review = this;
//   const update = {
//     $inc: { 
//       aggRating: changes.rating,
//       aggDifficulty: changes.difficulty,
//       aggWorkload: changes.workload, 
//     }
//   }
//   const result = Course.findByIdAndUpdate(review.course, update, { new: true } );
//   return Promise.all([result, review]);
// }

ReviewSchema.methods.updateCourseAggregates = function(changes) {
  const review = this;
  let newValues = {};
  if (!changes) {
    newValues = { 
      reviewCount: 1,
      aggRating: review.rating, 
      aggDifficulty: review.difficulty, 
      aggWorkload: review.workload 
    }
  }
  else {
    const { aggRating, aggDifficulty, aggWorkload } = changes;
    if (aggRating == undefined || aggDifficulty == undefined || aggWorkload == undefined) {
      return Promise.reject('Missing update values');
    }
    newValues = { aggRating, aggDifficulty, aggWorkload };
  }
  
  const update = { $inc: newValues };
  const result = Course.findByIdAndUpdate(review.course, update, { new: true } );
  return Promise.all([result, review]);
}


ReviewSchema.methods.toJSON = function() {
  return {
    id: this._id.toString(),
    author: this.author,
    course: this.course,
    semester: this.semester,
    year: this.year,
    rating: this.rating,
    difficulty: this.difficulty,
    workload: this.workload,
    body: this.body
  }
}

ReviewSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {

    let validationErrors = {};
    Object.keys(err.errors).forEach((key) => {
      validationErrors[key] = err.errors[key].message
    });

    const error = {
      status: 400,
      message: err.message,
      validationErrors,
      stack: err.stack
    }

    next(error);
  }

  next();
});

module.exports = Review = mongoose.model('reviews', ReviewSchema);