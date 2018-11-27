const numberOfReviews = 315;
const reviewText = 
`
This is my 2nd class in the program and I really enjoyed it overall. Although I took it in a full semester, I think this would be better as a summer course because there were about 4 "down" weeks in the course where I didn't do anything.

The projects span a wide range of topics, but are very manageable. I thought the 1st project, Buffer Overflow was the hardest if you don't have background in C and memory architecture. The 2nd, Malware Analysis, was very straightforward. The Cryptography project was also fairly easy since you don't have to write your own mathematical algorithms unless you really want to. (So you can make it more challenging if you desire by not using libraries.) Finally, 4th Web Security project definitely seemed very hard for those who had never done any web development. If you have encountered JS/HTML/PHP, it is fine.

The Canvas quizzes are worth 20% of your grade and open book. So basically, 20% of your grade should be 100% right off the bat. The exams were a bit more random/tricky with some material included that is barely even covered in 2 sentences in the book. I read most of the book, but overall I probably won't retain much since the book is dry and topics are quickly covered. I somewhat regret spending time reading since I don't feel I walked away from the reading with a really deep understanding, but rather with a surface level acquaintance with terminology to pass an exam. I'm sure I will forget all the specialized terminology within a few weeks, hopefully the general concepts stick though.

Overall, it was a fun course.
`;

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
  const semesters = ["Spring", "Summer", "Fall"];
  const years = ["2016", "2017", "2018"];

  let s = semesters[getRandomInt(0, semesters.length - 1)];
  let y = years[getRandomInt(0, years.length - 1)];

  return s + " " + y;
}


const data = [];

for(let i = 0; i < numberOfReviews; i++) {
  data.push({
    author: "fakereviewer@harvard.edu",
    reviewDate: getRandomDate(),
    semester: getRandomSemester(),
    difficulty: getRandomInt(1, 5),
    courseRating: getRandomInt(1, 5),
    staffRating: getRandomInt(1, 5),
    workload: getRandomInt(5, 20),
    reviewText: reviewText
  });
}

console.log(JSON.stringify(data, null, 2));