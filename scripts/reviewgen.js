const mongoose = require('mongoose');
const faker = require('faker');

// const uri = 'mongodb://localhost:27017/hes-dev';
const uri = 'mongodb://heroku_2dt7jnm3:7m254grtgq0e76reesatdu3evv@ds153304.mlab.com:53304/heroku_2dt7jnm3';

const Review = require('../server/models/Review');
const Course = require('../server/models/Course');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate() {
  let year, month, day, hour, min;
  year = getRandomInt(2016, 2018);
  month = getRandomInt(1, 12);
  day = getRandomInt(1, 28);
  hour = getRandomInt(0, 23);
  min = getRandomInt(0, 59);
  return new Date(year, month, day, hour, min);
}

function getRandomSemester() {
  const semesters = ['january', 'spring', 'summer', 'fall'];
  let s = semesters[getRandomInt(0, semesters.length - 1)];
  return s;
}

function getRandomYear() {
  const years = [2016, 2017, 2018];
  let y = years[getRandomInt(0, years.length - 1)];
  return y;
}

function randomizeReviews(courseId) {
  const num = getRandomInt(0, 50);

  const reviews = [];

  for (let i = 0; i < num; i++) {
    const review = new Review({
      author: mongoose.Types.ObjectId('5c40ad7fe47e411f395a0cf7'),
      course: mongoose.Types.ObjectId(courseId),
      semester: getRandomSemester(),
      year: getRandomYear(),
      rating: getRandomInt(1, 5),
      difficulty: getRandomInt(1, 5),
      workload: getRandomInt(4, 40),
      body: faker.lorem.paragraphs(getRandomInt(1, 3)),
    });

    reviews.push(review);
  }

  // console.log('courseId: ', courseId);

  // TODO: This is monstrous and it gets stuck
  // Next time, try this:
  // https://stackoverflow.com/questions/28478606/saving-items-in-mongoose-for-loop-with-schema-methods
  reviews.forEach(review => {
    console.log('review id: ', review._id);
    review
      .save()
      .then(review => {
        console.log(
          'review saved, updating course aggregates for review: ',
          review._id,
        );
        review.updateCourseAggregates();
        console.log('updated course aggregates for review: ', review._id);
      })
      .catch(err => console.log(err));
  });
}

async function processCourses(courses) {
  for (const course of courses) {
    const ret = randomizeReviews(course.id);
    await ret;
  }
}

function main() {
  mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
      return Course.find({})
        .then(allCourses => {
          return Promise.all(allCourses);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .then(courses => {
      return processCourses(courses);
    })
    .then(() => {
      console.log('Done');
      // mongoose.disconnect();
    })
    .catch(err => {
      console.log(err);
    });
}

main();
