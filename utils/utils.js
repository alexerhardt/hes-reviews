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
