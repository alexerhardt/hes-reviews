import axios from 'axios';
import setAuthToken from '../utils/utils-client';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './types';

export const signupUser = (userData) => dispatch => {
  console.log('signupUser called, userData', userData);

  axios
    .post('/api/users/signup', userData)
    .then((res) => {
      console.log('signupUser res: ', res);
      // dispatch({
      //   type: SET_CURRENT_USER,
      //   payload: { hello: 'world' }
      // });
    })
    .catch((err) => {
      console.log('signupUser err: ', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

