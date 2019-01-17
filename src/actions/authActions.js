import axios from 'axios';
import setAuthToken from '../utils/utils-client';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';

export const signupUser = (userData) => dispatch => {
  console.log('signupUser called, userData', userData);

  axios
    .post('/api/users/signup', userData)
    .then((res) => {
      console.log('signupUser res: ', res);
    })
    .catch((err) => {
      console.log('signupUser err: ', err);
    })
}

