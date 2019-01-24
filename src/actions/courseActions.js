import axios from 'axios';
import { redirectToErrorPage } from '../utils/utils-client';

export const getCourses = (history) => (dispatch) => {
  axios
    // .get('/api/courses/all')
    .get('/api/test/force-500')
    .then((res) => {
      console.log('courses get response', res);
    })
    .catch((err) => {
      redirectToErrorPage(err, history);
    });
}; 

