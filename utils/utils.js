/**
 * Strips a course code from non-alphabetic characters
 */
exports.courseIdFromCode = (code) => {
  return code.trim().replace(/\W*_*/g, '').toLowerCase();
}
