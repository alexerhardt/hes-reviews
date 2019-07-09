import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setAuthToken } from '../utils/utils-client';
import messages from '../messages/messages';

import { SET_CURRENT_USER, GET_ERRORS, SET_MESSAGE } from './types';

export const signupUser = (userData, switchTabs) => dispatch => {
  axios
    .post('/api/users/signup', userData)
    .then(() => {
      dispatch(setMessage(messages.signupSuccess));
      switchTabs();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      console.log('loginUser successful');
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(setMessage(messages.loginSuccess));
      console.log('login user dispatching concluded');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};

export const getErrors = errors => {
  return {
    type: GET_ERRORS,
    payload: errors,
  };
};

export const clearErrors = () => dispatch => {
  console.log('clearErrors called');
  dispatch(getErrors({}));
};

export const clearAllMessages = () => dispatch => {
  dispatch(getErrors({}));
  dispatch(setMessage({}));
};
