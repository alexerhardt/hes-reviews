import axios from 'axios';
import { setAuthToken } from '../utils/utils-client';
import jwtDecode from 'jwt-decode';
import messages from '../messages/messages';

import { SET_CURRENT_USER, GET_ERRORS, SET_MESSAGE } from './types';

export const signupUser = (userData, switchTabs) => (dispatch) => {
  axios
    .post('/api/users/signup', userData)
    .then((res) => {
      dispatch(setMessage(messages.signupSuccess));
      switchTabs();
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token)
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(setMessage(messages.loginSuccess));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message
  };
};

export const getErrors = (errors) => {
  return {
    type: GET_ERRORS,
    payload: errors
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch(getErrors({}));
};

export const clearAllMessages = () => (dispatch) => {
  dispatch(getErrors({}));
  dispatch(setMessage({}));
};

