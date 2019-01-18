import axios from 'axios';
import { setAuthToken } from '../utils/utils-client';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './types';

export const signupUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/signup', userData)
    .then((res) => {
      // dispatch({
      //   type: SET_CURRENT_USER,
      //   payload: { hello: 'world' }
      // });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token)
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log('authActions error', err.response.data);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    });
};

export const setCurrentUser = (decoded) => {
  console.log('setCurrentUser called', decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

