import axios from 'axios';
import { GET_COURSES, UPDATE_COURSE } from '../actions/types';
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

export const updateCourse = (courseData) => (dispatch) => {
  dispatch({
    type: UPDATE_COURSE,
    payload: courseData
  });
};

