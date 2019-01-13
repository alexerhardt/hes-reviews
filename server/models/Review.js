const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./Course');
const { isSemesterValid } = require('../../utils/utils');

const ReviewSchema = new Schema({
  // author: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User',
  //   required: [true, 'Review must have an author']
  // },
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