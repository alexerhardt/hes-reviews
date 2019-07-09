const mongoose = require('mongoose');
const data = require('./random-data.json');

// const uri = 'mongodb://localhost:27017/hes-dev';
const uri = 'mongodb://heroku_2dt7jnm3:7m254grtgq0e76reesatdu3evv@ds153304.mlab.com:53304/heroku_2dt7jnm3';

const Course = require('../server/models/Course');

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log('connection established');

    data.map((course, i) => {
      const newCourse = new Course({
        code: course.code,
        name: course.name,
        reviewCount: 0,
        aggRating: 0,
        aggDifficulty: 0,
        aggWorkload: 0,
      });

      newCourse
        .save()
        .then(() => {
          if (i === data.length - 1) {
            console.log('task done');
            mongoose.disconnect();
          }
        })
        .catch(err => console.log(err));
    });
  })
  .catch(err => console.log(err));
