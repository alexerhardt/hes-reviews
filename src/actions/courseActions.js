import axios from 'axios';
import { GET_COURSES } from '../actions/types';
import { redirectToErrorPage } from '../utils/utils-client';

export const getCourses = (history) => (dispatch) => {
  axios
    .get('/api/courses/all')
    .then((res) => {
      dispatch({
        type: GET_COURSES,
        payload: res.data
      });
    })
    .catch((err) => {
      redirectToErrorPage(err.response, history);
    });
}; 

