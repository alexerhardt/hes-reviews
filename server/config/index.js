/**
 * config/index.js
 * 
 * Sets up ports and MongoDB URIs for local / test modes
 */
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/hes-dev';
}
else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/hes-test';
}