/**
 * auth.js
 * Sets up authentication middleware
 */
const passport = require('passport');

module.exports = passport.authenticate('jwt', { session: false });

// debug function seen here:
// https://dmitryrogozhny.com/blog/easy-way-to-debug-passport-authentication-in-express
// module.exports = function(req, res, next) {
//   // call passport authentication passing the "local" strategy name and a callback function
//   passport.authenticate('jwt', function (error, user, info) {
//     // this will execute in any case, even if a passport strategy will find an error
//     // log everything to console
//     console.log('error: ', error);
//     console.log('user: ', user);
//     console.log('info: ', info);

//     if (error) {
//       res.status(401).send(error);
//     } else if (!user) {
//       res.status(401).send(info);
//     } else {
//       next();
//     }

//     res.status(401).send(info);
//   })(req, res);
// };