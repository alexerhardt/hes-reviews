import { SET_CURRENT_USER } from '../actions/types';
import { isEmpty } from '../utils/utils-client';

const initialState = {
  isAuthenticated: !isEmpty(localStorage.jwtToken),
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      }
      
    default:
      return state;
  }
};
