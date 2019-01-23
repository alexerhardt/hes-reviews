import axios from 'axios';

export const getCourses = () => (dispatch) => {
  axios
    .get('/api/courses/all')
    .then((res) => {
      console.log('courses get response', res);
    })
    .catch((err) => {
      console.log('course get error');
    })
}; 
