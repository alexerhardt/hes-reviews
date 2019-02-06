/**
 * utils-global.js
 * Global utilities, useful both client and server-side
 */

 exports.isEmptyObject = (obj) => {
   const ret = Object.keys(obj).length === 0 && obj.constructor === Object
   console.log('isEmptyObject, ret: ', ret);
   return ret;
 }

/**
 * Strips a course code from non-alphanumeric characters
 */
exports.stripCourseCode = (code) => {
  return code.trim().replace(/\W*_*/g, '').toLowerCase();
}

/**
 * 
 */
exports.isSemesterValid = (semesterName) => {
  return semesterName.match(/^(january|spring|summer|fall)$/g);
}
