/**
 * auth.js
 * Sets up authentication middleware
 */
const passport = require('passport');

module.exports = passport.authenticate('jwt', { session: false });
