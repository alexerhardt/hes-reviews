let input = require('./course-data.json');

let output = Object.keys(input)
                   .map(key => {
                     let roll = Math.random() > 0.5;
                     return {
                       code: key,
                       name: input[key],
                       reviews: roll ? 0 : Math.floor(Math.random() * 200),
                       rating: roll ? null : Math.round(Math.random() * 5 * 100) / 100,
                       staff: roll ? null : Math.round(Math.random() * 5 * 100) / 100,
                       difficulty: roll ? null : Math.round(Math.random() * 5 * 100) / 100,
                       workload: roll ? null : Math.floor(Math.random() * 40)
                     }
                    });

console.log(JSON.stringify(output, null, 2));

