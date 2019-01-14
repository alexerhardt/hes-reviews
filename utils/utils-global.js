/**
 * utils-global.js
 * Global utilities, useful both client and server-side
 */

 exports.isEmptyObject = (obj) => {
  Object.keys(obj).length === 0 && obj.constructor === Object
 }

/**
 * Strips a course code from non-alphabetic characters
 */
exports.courseIdFromCode = (code) => {
  return code.trim().replace(/\W*_*/g, '').toLowerCase();
}

/**
 * 
 */
exports.isSemesterValid = (semesterName) => {
  return semesterName.match(/^(january|spring|summer|fall)$/g);
}
