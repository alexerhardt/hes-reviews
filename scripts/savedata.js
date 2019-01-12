const mongoose = require('mongoose');
const data = require('./random-data.json');

const uri = 'mongodb://localhost:27017/hes-dev';

const Course = require('../server/models/Course');

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {

    console.log('connection established');

    data.map((course, i) => {
      const newCourse = new Course ({
        code: course.code,
        name: course.name,
        reviewCount: course.reviews, 
        avgRating: course.rating,
        avgDifficulty: course.difficulty,
        avgWorkload: course.workload
      });

      newCourse
        .save()
        .then(() => {
          if (i === data.length - 1) {
            console.log('task done');
            mongoose.disconnect();
          }
        })
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.log(err));
